#!/usr/bin/env node
/* =========================================================================
   check.js: run this after you drop videos into the videos/ folder.

   Usage:   node check.js

   It reads the work list out of index.html and compares it to the files
   that are actually in videos/. It tells you:

     1. entries with no matching file
     2. files in the folder that aren't listed yet
     3. which entries have no poster image
     4. files in a format browsers can't play

   For anything new it finds, it prints a ready-made block you can paste
   into the work list in index.html.

   It never writes to index.html, so it cannot break your edits.
   ========================================================================= */

const fs = require("fs");
const path = require("path");

const HERE     = __dirname;
const VIDEODIR = path.join(HERE, "videos");
const POSTDIR  = path.join(HERE, "posters");
const PAGE     = path.join(HERE, "index.html");

const PLAYABLE = [".mp4", ".webm", ".m4v"];
const IGNORE   = [".txt", ".md", ".json", ".db"];

function listDir(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(f => !f.startsWith("."));
}

function loadData() {
  const html = fs.readFileSync(PAGE, "utf8");
  const m = html.match(/\/\* DATA-START \*\/([\s\S]*?)\/\* DATA-END \*\//);
  if (!m) throw new Error("Could not find the DATA-START block in index.html");
  return new Function(m[1] + "; return XEB;")();
}

/* the same spellings the page itself tries */
function candidates(raw) {
  const hasExt = /\.(mp4|mov|m4v|webm)$/i.test(raw);
  const list = hasExt
    ? [raw, raw + ".mp4", raw.replace(/\.[^.]+$/, "")]
    : [raw + ".mp4", raw, raw + ".MP4", raw + ".mov", raw + ".webm"];
  return [...new Set(list)];
}

function niceTitle(file) {
  return path.basename(file, path.extname(file))
    .replace(/[-_]+/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, c => c.toUpperCase());
}

/* ---- run ---- */

let data;
try {
  data = loadData();
} catch (err) {
  console.error("\nCould not read the settings block in index.html.");
  console.error("There is probably a typo in it. Usually a missing comma or quote mark.\n");
  console.error(err.message + "\n");
  process.exit(1);
}

const onDisk  = listDir(VIDEODIR);
const posters = listDir(POSTDIR);

const playable = onDisk.filter(f => PLAYABLE.includes(path.extname(f).toLowerCase()));
const badType  = onDisk.filter(f =>
  !PLAYABLE.includes(path.extname(f).toLowerCase()) &&
  !IGNORE.includes(path.extname(f).toLowerCase())
);

const matchedFiles = new Set();
const missing = [];

data.work.forEach(w => {
  const hit = candidates(w.file).find(n => onDisk.includes(n));
  if (hit) matchedFiles.add(hit);
  else missing.push(w);
});

const extra = playable.filter(f => !matchedFiles.has(f));

/* a file with no extension that a listed entry matched is fine, so don't
   scold the user about a file the page is already using */
const reallyBad = badType.filter(f => !matchedFiles.has(f));
const noPost = data.work.filter(w => !w.poster || !posters.includes(w.poster));

console.log("");
console.log(`Studio            : ${data.studio}`);
console.log(`Listed in the page: ${data.work.length}`);
console.log(`Playable in videos/: ${playable.length}`);
console.log(`Matched            : ${matchedFiles.size}`);
console.log("");

if (missing.length) {
  console.log("NO FILE FOUND. These are listed but nothing in videos/ matches.");
  console.log("Each line shows the spellings that were tried:");
  missing.forEach(w => {
    console.log(`   ${w.client}: "${w.file}"`);
    console.log(`      tried: ${candidates(w.file).join(", ")}`);
  });
  console.log("");
}

if (reallyBad.length) {
  console.log("WRONG FORMAT. Browsers may refuse these. Re-export as MP4 / H.264:");
  reallyBad.forEach(f => console.log("   " + f));
  console.log("");
}

if (noPost.length) {
  console.log(`NO POSTER (${noPost.length}). These show the first frame of the video instead.`);
  console.log("That's fine, unless a first frame happens to be black.");
  console.log("");
}

if (extra.length) {
  console.log("NOT LISTED YET. Paste these into the work list in index.html:");
  console.log("");
  extra.forEach(f => {
    const stem = path.basename(f, path.extname(f));
    console.log(`    { file: "${f}",`);
    console.log(`      title: "${niceTitle(f)}",`);
    console.log(`      client: "Add client name",`);
    console.log(`      industry: "food",`);
    console.log(`      did: "Add one line about this job." },`);
    console.log("");
  });
  const ids = data.industries.map(i => i.id).join(", ");
  console.log(`    (industry must be one of: ${ids})`);
  console.log("");
}

if (!missing.length && !extra.length && !reallyBad.length) {
  console.log("All good. Every listed film has a file, and every file is listed.");
  console.log("");
}
