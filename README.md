# Your Personal Academic Website

A warm, professional multi-page website for a PhD researcher. Plain HTML & CSS — no frameworks, no build tools. Dark/light mode toggle included.

---

## 🚀 Quick Start: Getting Live

### 1. Create GitHub repo named `yourusername.github.io`
### 2. Upload ALL files from this folder (drag & drop)
### 3. Settings → Pages → Deploy from branch → main → Save
### 4. Configure Namecheap DNS (see below)
### 5. Wait 5-10 min → visit your domain!

---

## 📁 File Structure

```
yourusername.github.io/
├── index.html          ← Main page (About, Research, Projects, CV, Interests, Contact)
├── reading.html        ← Reading interest sub-page (with clickable book covers)
├── music.html          ← Music sub-page (with Spotify embed)
├── travel.html         ← Travel sub-page (with photo gallery)
├── sports.html         ← Sports sub-page
├── cooking.html        ← Cooking sub-page
├── style.css           ← Shared styles (all pages use this)
├── script.js           ← Shared script (dark mode + mobile menu)
├── CNAME               ← Custom domain config
├── photo.jpg           ← Your profile photo
├── cv.pdf              ← Your CV
├── README.md           ← This file
└── images/             ← All images go here
    ├── reading.jpg     ← Interest tile image
    ├── travel.jpg      ← Interest tile image
    ├── sports.jpg      ← Interest tile image
    ├── music.jpg       ← Interest tile image
    ├── cooking.jpg     ← Interest tile image
    ├── book1.jpg       ← Book cover (links to Goodreads etc.)
    ├── book2.jpg ... book9.jpg
    ├── travel1.jpg ... travel6.jpg   ← Travel gallery
    ├── sports1.jpg ... sports3.jpg   ← Sports gallery
    ├── cooking1.jpg ... cooking3.jpg ← Cooking gallery
    └── eth.png         ← ETH logo for CV (optional)
```

### How the interests section works
The main page shows **5 clickable image tiles**.
Each tile links to a dedicated sub-page where you can elaborate with text,
photos, Spotify embeds, and clickable book covers.

---

## 🔗 Book Covers → Clickable Links

On `reading.html`, each book cover is wrapped in an `<a>` tag.
Replace `BOOK_ID` with the actual Goodreads or StoryGraph book ID:

```html
<a href="https://www.goodreads.com/book/show/12345" target="_blank" class="book-card">
    <img src="images/book1.jpg" alt="Book Title" class="book-cover">
    <div class="book-title">The Wealth of Nations</div>
    <div class="book-author">Adam Smith</div>
</a>
```

To find book cover images: search the book on Goodreads → right-click the cover → "Copy image address".

---

## 🎵 Spotify Embed

On `music.html`, replace the playlist embed URL:
1. Open Spotify → find your playlist
2. Click ··· → Share → Embed playlist
3. Copy the `src` URL from the embed code
4. Paste it into the `<iframe src="...">` in music.html

---

## 🌙 Dark Mode

Works across all pages. The toggle remembers your preference.

---

## ⚙️ Namecheap DNS Setup

Edit `CNAME` file: replace `yourdomain.com` with your actual domain.

In Namecheap → Advanced DNS:

| Type  | Host | Value                  |
|-------|------|------------------------|
| A     | @    | 185.199.108.153        |
| A     | @    | 185.199.109.153        |
| A     | @    | 185.199.110.153        |
| A     | @    | 185.199.111.153        |
| CNAME | www  | yourusername.github.io |

---

## ✏️ Editing Content

Click any `.html` file on GitHub → pencil icon → edit → Commit.

All placeholders are marked with `[brackets]` or `REPLACE` comments.
