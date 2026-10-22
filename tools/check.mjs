import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = name => fs.readFileSync(path.join(root, name), 'utf8').replace(/\r\n/g, '\n');
const lessons = JSON.parse(read('content/lessons.json'));
const books = JSON.parse(read('content/books.json'));
const box = {};
vm.runInNewContext(read('data.js') + '\nthis.result = {lessons: LESSONS, books: BOOKS};', box);
assert.deepEqual(JSON.parse(JSON.stringify(box.result)), {lessons, books}, 'Generated data.js is stale');
const ids = new Set();
for (const l of lessons) {
  assert(!ids.has(l.id), `Duplicate lesson ${l.id}`);
  ids.add(l.id);
  assert(l.deepSections.length && l.workedExamples.length >= 2);
  for (const q of l.questions) {
    assert(q.options.length >= 2 && q.correct.length && q.explanation);
    assert(new Set(q.correct).size === q.correct.length);
    assert(q.correct.every(i => Number.isInteger(i) && i >= 0 && i < q.options.length));
  }
  for (const r of l.readings) {
    const book = books[r.book === 'A' ? 0 : 1];
    assert(book.toc.some(e => e.level === 1 && e.title.startsWith(`第${r.chapter}章`) && e.pdf_page === r.page));
  }
}
const html = read('index.html');
for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
  const ref = match[1];
  if (ref.startsWith('#')) continue;
  assert(!/^(?:https?:)?\/\//.test(ref), `External runtime dependency: ${ref}`);
  assert(fs.existsSync(path.join(root, ref)), `Missing asset: ${ref}`);
}
for (const name of ['app.js', 'study-v2.js', 'diagrams.js', 'data.js']) new vm.Script(read(name), {filename: name});
const single = read('standalone.html');
assert(!/<script\b[^>]*\bsrc=|<link\b[^>]*rel="stylesheet"/i.test(single), 'Single file has external assets');
const embedded = [...single.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
assert.equal(embedded.length, 4);
embedded.forEach((s, i) => new vm.Script(s, {filename: `standalone-script-${i}`}));
const expected = html.replace(/<link rel="stylesheet" href="([^"]+)">/g, (_, f) => `<style>\n${read(f)}\n</style>`)
  .replace(/<script src="([^"]+)"><\/script>/g, (_, f) => `<script>\n${read(f).replace(/<\/script/gi, '<\\/script')}\n</script>`);
assert(single === expected, 'Single-file build is stale; run python tools/build.py');
console.log(JSON.stringify({lessons: lessons.length, questions: lessons.reduce((n, l) => n + l.questions.length, 0), checks: 'data, question schema, references, local assets, JS syntax, single-file build'}, null, 2));
