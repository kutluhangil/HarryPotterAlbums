<div align="center">

<img src="docs/media/hero.svg" alt="Wizarding Realm — a filmstrip of moody frames slides one step at a time as the slideshow advances, with series tabs above" width="100%">

<p>
  <img alt="React" src="https://img.shields.io/badge/React%2018-Vite-d4a54a?style=for-the-badge&labelColor=4a2a3a">
  <img alt="Motion" src="https://img.shields.io/badge/GSAP-Framer%20Motion-c24a4a?style=for-the-badge&labelColor=4a2a3a">
  <img alt="Languages" src="https://img.shields.io/badge/UI-TR%20%2F%20EN-4a7ec2?style=for-the-badge&labelColor=4a2a3a">
  <img alt="Fan project" src="https://img.shields.io/badge/fan%20archive-non--commercial-d4a54a?style=for-the-badge&labelColor=4a2a3a">
</p>

<p><em>A fan archive of the wizarding world: characters, spells, items and the four houses,<br>
presented as a smooth filmstrip gallery you can scroll, swipe, key through or leave on slideshow.</em></p>

</div>

<img src="docs/media/divider.svg" width="100%" alt="">

## The idea

Wizarding Realm borrows the layout of a photographer's portfolio and fills it with a fan's guide. Each series is a horizontal filmstrip: the frame in the middle is the one you are looking at, its caption sits under it, and the strip moves when you scroll, swipe, press an arrow key or let the slideshow run. The whole site is content-driven, so adding a series is adding a JSON file.

> **Content lives in JSON, not in components.** `public/data/series/*.json` holds each series (title, slug, description, images with localized captions), and `photographer.json` holds the About page. The React app only knows how to show them.

<img src="docs/media/divider.svg" width="100%" alt="">

## Features

| | |
|---|---|
| **Filmstrip gallery** | Horizontal scrolling with click-to-centre and automatic detection of the active frame. |
| **Keyboard** | <kbd>←</kbd> <kbd>→</kbd> to step, <kbd>Home</kbd> and <kbd>End</kbd> to jump to the ends. |
| **Slideshow** | Optional auto-advance every 4.5 seconds that pauses on hover or focus. |
| **Touch** | Native momentum scrolling on phones. |
| **Fast** | The first frames load eagerly, the rest lazily through an IntersectionObserver, with skeletons while they arrive. |
| **Four series** | Characters (8 frames), spells (6), items (6) and houses (4), each from its own JSON file. |
| **About page** | The archive's story, focus and contact, from `photographer.json`. |
| **TR / EN** | Every caption and page in Turkish and English. |
| **SEO** | Per-page meta tags, a sitemap and `robots.txt`. |

<img src="docs/media/divider.svg" width="100%" alt="">

## How it fits together

```mermaid
flowchart LR
  J[public/data/series/*.json] --> CTX[PortfolioContext · React Query]
  CTX --> G[FilmstripGallery<br/>GSAP · lazy images]
  K[Keyboard · touch · scroll] --> G
  A[useAutoAdvance · 4.5 s] --> G
  I18N[I18nContext · TR / EN] --> G
  P[photographer.json] --> AB[About page]
```

| Route | Page |
|---|---|
| `/` | Home with the featured series |
| `/series/:slug` | One series as a filmstrip |
| `/about` | About the archive |

<img src="docs/media/divider.svg" width="100%" alt="">

## Türkçe özet

**Wizarding Realm**, büyücülük dünyasına adanmış bir hayran arşivi: karakterler, büyüler, eşyalar ve dört Hogwarts binası, akıcı bir film şeridi galerisinde. Ortadaki kare etkin olan; şerit kaydırma, dokunma, ok tuşları ya da 4,5 saniyede bir ilerleyen slayt gösterisiyle hareket ediyor. İçerik JSON dosyalarından geliyor, görseller tembel yükleniyor, arayüz Türkçe ve İngilizce.

<img src="docs/media/divider.svg" width="100%" alt="">

## Development

```sh
npm install      # or bun install
npm run dev
npm run build
npm run lint
```

```
public/data/series/     characters, spells, items, houses (JSON)
public/data/            photographer.json for the About page
src/components/gallery/ FilmstripGallery, GalleryImage, GalleryControls, skeleton
src/hooks/              useGallery, useAutoAdvance, useKeyboardNavigation
src/context/            portfolio data and i18n
```

<div align="center">
<br>
<a href="https://github.com/kutluhangil"><img src="docs/media/signature.svg" width="100%" alt="Built by kutluhangil"></a>
<sub>A non-commercial fan project, not affiliated with J.K. Rowling, Warner Bros. or Wizarding World · photos from Unsplash · the frames in the banner are drawn moods.</sub>
</div>
