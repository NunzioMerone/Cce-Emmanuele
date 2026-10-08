/**
 * @typedef {{id:string, offset:number}} NoteAnchor
 * @typedef {{id:string, text:string}} Footnote
 * @typedef {{type:'paragraph'|'quote'|'references', text:string, notes?:NoteAnchor[]}|
 * {type:'scripture', reference:string, text:string}|
 * {type:'list', items:string[]}} ReadingBlock
 * @typedef {{id:string, title:string, number?:string, separator?:string,
 * blocks:ReadingBlock[], topics?:ReadingTopic[], footnotes?:Footnote[]}} ReadingTopic
 * @typedef {ReadingTopic & {variant?:'community'}} ReadingGroup
 * @typedef {{title:string, groups:ReadingGroup[], pdf?:string, credits?:string[]}} ReadingDocument
 */
export {};
