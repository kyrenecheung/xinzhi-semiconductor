"""Optional maintainer tool; learners do not need Python or a build step."""
from pathlib import Path
import json
import re

ROOT = Path(__file__).resolve().parents[1]
lessons = json.loads((ROOT / 'content/lessons.json').read_text(encoding='utf-8'))
books = json.loads((ROOT / 'content/books.json').read_text(encoding='utf-8'))
data = 'const LESSONS=' + json.dumps(lessons, ensure_ascii=False) + ';\nconst BOOKS=' + json.dumps(books, ensure_ascii=False) + ';\n'
(ROOT / 'data.js').write_text(data, encoding='utf-8')
html = (ROOT / 'index.html').read_text(encoding='utf-8')

def stylesheet(match):
    return '<style>\n' + (ROOT / match[1]).read_text(encoding='utf-8') + '\n</style>'

def script(match):
    body = (ROOT / match[1]).read_text(encoding='utf-8')
    body = re.sub(r'</script', r'<\\/script', body, flags=re.I)
    return '<script>\n' + body + '\n</script>'

html = re.sub(r'<link rel="stylesheet" href="([^"]+)">', stylesheet, html)
html = re.sub(r'<script src="([^"]+)"></script>', script, html)
(ROOT / 'standalone.html').write_text(html, encoding='utf-8')
print(f'Built data.js and standalone.html: {len(lessons)} lessons, {sum(len(x["questions"]) for x in lessons)} questions')
