import { mkdir, readdir, copyFile, rename, rm } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import path from 'node:path';

/** Publish staged files individually by atomic rename. Existing URLs never disappear
 * during a rebuild; old assets remain available to pages already open in the browser. */
export async function publishDirectory(source, destination) {
  await mkdir(destination, { recursive: true });
  for (const entry of await readdir(source, { withFileTypes: true })) {
    const input = path.join(source, entry.name);
    const output = path.join(destination, entry.name);
    if (entry.isDirectory()) await publishDirectory(input, output);
    else if (entry.isFile()) {
      const temporary = `${output}.${randomUUID()}.tmp`;
      try {
        await copyFile(input, temporary);
        await rename(temporary, output);
      } finally { await rm(temporary, { force: true }); }
    }
  }
}
