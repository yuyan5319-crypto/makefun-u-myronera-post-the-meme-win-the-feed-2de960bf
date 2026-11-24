// Entry program for the make.fun "Post the Meme, Win the Feed" bounty
// (Node 22, standard library only).
//
// The entry itself is the X post: a meme picture about make.fun, posted from
// a public account with @_myronera and a play code in its text. This program
// only hands the grader the post's address: it copies POST.json from the
// repository root into the output directory, where the gate reads it.
// Nothing this program writes about the post is scored.
//
// Run it the way the grader does:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { chmodSync, copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

// In the grader's container these are /bot and /output; locally the env
// vars stand in for them. MAKEFUN_OUTPUT_DIR names a directory, never a file.
const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const SOURCE = join(BOT_DIR, 'POST.json');
const TARGET = join(OUTPUT_DIR, 'POST.json');

// Fail loudly on a POST.json that is not a JSON object naming a url, so a
// broken file never silently reaches the gate as a valid-looking copy.
const parsed: unknown = JSON.parse(readFileSync(SOURCE, 'utf8'));
if (
  typeof parsed !== 'object' ||
  parsed === null ||
  typeof (parsed as { url?: unknown }).url !== 'string'
) {
  console.error('POST.json must be a JSON object with a string "url" field');
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(SOURCE, TARGET);
} catch (err) {
  console.error(`POST.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}

// The grader reads the copy: make its mode explicit so both runs of this
// program write the same bytes under the same permissions.
chmodSync(TARGET, 0o644);
