XEB STUDIOS PORTFOLIO
=======================

OPENING IT
----------
Double-click index.html. It opens in your browser. No internet needed.
Keep index.html and the videos folder together in the same place.


THE FOLDER
----------
index.html    the whole site AND your settings, in one file.
              Open it in a text editor and edit the block at the top,
              between DATA-START and DATA-END.
check.js      optional helper. See below.
videos/       put your video files here.
posters/      optional cover images.
README.txt    this file.


ABOUT FILE NAMES (READ THIS ONCE)
---------------------------------
Windows usually hides file extensions, which is why some of your files
looked like "ShootDayVlog.mp4" and others looked like "QSasked".

You do NOT need to rename anything. The page tries several spellings for
each video and uses whichever one actually opens:

   QSasked          -> QSasked.mp4, then QSasked, then QSasked.MP4
   ShootDayVlog.mp4 -> ShootDayVlog.mp4, then ShootDayVlog.mp4.mp4

So just drop the files in as they are.

If you want to see the real names, turn extensions on:
File Explorer -> View -> Show -> File name extensions.


ADDING A NEW CLIENT
-------------------
1. Export the video as MP4 / H.264. Keep it under about 25 MB.
2. Put the file in the videos/ folder.
3. Open index.html in a text editor. Find the "work:" list near the top.
   Copy one of the existing blocks and change it:

     { file: "newclient.mp4",
       title: "Menu launch",
       client: "Client Name",
       industry: "food",
       did: "One line about the job.",
       link: "https://www.instagram.com/reel/..." },

4. Save, then refresh the browser.

industry must be one of the ids in the "industries:" list above it:
food, retail, education, tech, studios.
To add a new industry section, add it to that list first.


THINGS TO FILL IN
-----------------
Every film currently says "Add one line about this job." Replace those.
That line is what a client actually reads. Say what you did, not what
the video is. "Menu launch reel, shot and cut in one day" beats
"a nice video for their page".

None of the films have Instagram links yet. Add them with the "link:"
line and a "Watch on Instagram" button appears in the pop-up player.


CHANGING THE FONT
-----------------
Four heading fonts are built into index.html. They work offline, no
internet needed. Switch with one line in the settings block:

    font: "impact",

The choices:

    "impact"     Anton headline, Space Grotesk headings   (current)
    "grotesk"    Space Grotesk throughout, cleaner
    "archivo"    Archivo throughout, the quietest
    "editorial"  Instrument Serif headline, more elegant

Save and refresh to see each one. All four are free to use and share
(SIL Open Font License 1.1).


THE HEADLINE AND THE CLAIMS
---------------------------
The big line at the top is the "headline" setting. A few alternatives
are written as comments just below it. Swap any of them in.

Under the buttons is a row of three short claims:

    claims: ["40+ clients", "14 industries", "Shoot, edit, deliver"],

These are plain text, not counted from anything, so write whatever is
true. Set it to [] to hide the row.


THE INDUSTRIES ROW
------------------
Every industry in the "industries" list shows as a chip near the top.
The ones that have films on the page are brighter; the rest are dimmer
but still show the range you cover.

Add a film to any industry and a full section for it appears further
down automatically. Delete any industry you don't actually work in.


IF A VIDEO DOESN'T SHOW
-----------------------
The page tells you. Instead of the video you get a dashed box with the
file name it looked for. Usually one of these:

- the file isn't in the videos/ folder
- the name in index.html is different from the real name
- the file is MOV or ProRes. Browsers need MP4 / H.264.

If the whole page is blank, there's a typo in the settings block.
It is almost always a missing comma or an unclosed quote mark.


THE HELPER SCRIPT
-----------------
If Node is installed, open a terminal in this folder and run:

    node check.js

It compares the videos/ folder against the list in index.html and tells
you what's missing, what's new, what has no poster, and what's in the
wrong format. For new files it prints a ready-made block to paste in.
It never writes to index.html, so it can't break your edits.


POSTERS (OPTIONAL)
------------------
A poster is the still shown before a video plays. Without one the
browser uses the first frame, which is sometimes black.

Export a JPG, name it after the video (menuprob.jpg), put it in
posters/, and add a poster line to that film's block:

       poster: "menuprob.jpg",


SENDING IT TO SOMEONE
---------------------
Zip the whole folder and send it. They unzip and double-click index.html.
The zip gets big with videos inside, so this suits people you've already
spoken to.


PUTTING IT ONLINE LATER
-----------------------
It's a static site. Upload the whole folder to any web server, or to
Cloudflare Pages / Netlify / Vercel. Nothing to install.

If you later move the videos to S3, Cloudflare R2 or a CDN, change ONE
line in the settings block:

    videoBase:  "videos/",

becomes

    videoBase:  "https://your-cdn-address/reels/",

Everything else keeps working.


STILL TO DECIDE
---------------
- The two xebstudios.com email addresses are placeholders and are not
  live. Set showStudioEmails to false to hide them, or set the domain up.
- The "Made for" row lists only the 7 clients that have films on the
  page, while the claims row says 40+ clients. Add more client names,
  or soften the claim, so the two agree.
- No logo is used. If you make one, it can go beside the name in the
  top bar.
