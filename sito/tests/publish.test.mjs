import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { publishDirectory } from '../scripts/lib/publish.mjs';

test('Le risorse già servite non spariscono e non diventano parziali durante la pubblicazione', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'church-build-test-'));
  try {
    const source = path.join(root, 'staged');
    const destination = path.join(root, 'served');
    await mkdir(source); await mkdir(destination);
    const old = 'old'.repeat(300000), updated = 'new'.repeat(300000);
    await writeFile(path.join(source, 'app.js'), updated);
    await writeFile(path.join(destination, 'app.js'), old);
    await writeFile(path.join(destination, 'previous-module.js'), 'still used by an open page');
    let finished = false;
    const publishing = publishDirectory(source, destination).finally(() => { finished = true; });
    do {
      const contents = await readFile(path.join(destination, 'app.js'), 'utf8');
      assert(contents === old || contents === updated);
    } while (!finished);
    await publishing;
    assert.equal(await readFile(path.join(destination, 'app.js'), 'utf8'), updated);
    assert.equal(await readFile(path.join(destination, 'previous-module.js'), 'utf8'), 'still used by an open page');
  } finally { await rm(root, { recursive: true, force: true }); }
});
