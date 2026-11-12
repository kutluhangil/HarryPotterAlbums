<div align="center">

<img src="docs/media/hero.svg" alt="Wizarding Realm — a filmstrip fan archive of the wizarding world" width="100%">

<p>
  <img alt="React" src="https://img.shields.io/badge/React-TypeScript-d4a54a?style=for-the-badge&labelColor=0b0710">
  <img alt="GSAP" src="https://img.shields.io/badge/GSAP-motion-c24a4a?style=for-the-badge&labelColor=0b0710">
  <img alt="Tailwind" src="https://img.shields.io/badge/Tailwind-shadcn%2Fui-4a7ec2?style=for-the-badge&labelColor=0b0710">
  <img alt="Fan project" src="https://img.shields.io/badge/fan%20project-unofficial-d4a54a?style=for-the-badge&labelColor=0b0710">
</p>

<p><em>A fan archive of the wizarding world: characters, spells, wands, brooms and the four Hogwarts houses,<br>
presented as a smooth, keyboard-friendly filmstrip gallery.</em></p>

</div>

<img src="docs/media/divider.svg" width="100%" alt="">

## What it is

Wizarding Realm collects the universe's characters, spells, items and houses into four series. Each one opens as a horizontal filmstrip: click an image to centre it, use the arrow keys, or let it play as a slideshow. It is built to feel the same for someone reading the books for the first time and for a long-time fan.

| | |
|---|---|
| **Filmstrip gallery** | Horizontal scrolling with click-to-centre and automatic active-image detection. |
| **Keyboard navigation** | Arrow keys, <kbd>Home</kbd> and <kbd>End</kbd>. |
| **Slideshow** | Optional auto-advance every 4.5 s that pauses on hover or focus. |
| **Touch** | Native momentum scrolling on phones. |
| **Fast** | The first three images load eagerly, the rest lazily. |
| **Series** | Characters, spells, items and houses, each from its own JSON file. |
| **SEO** | Meta tags, a sitemap and `robots.txt`. |

```mermaid
flowchart LR
  J[public/data/series/*.json] --> S[Series page]
  S --> F[Filmstrip gallery]
  F --> K[Keyboard · touch · slideshow]
  F --> IO[IntersectionObserver<br/>active image · lazy load]
```

<img src="docs/media/divider.svg" width="100%" alt="">

## Türkçe özet

**Wizarding Realm**, Harry Potter evrenine adanmış bir hayran arşivi. Karakterler, büyüler, asalar, süpürgeler ve dört Hogwarts binası dört seri halinde, yatay kayan bir film şeridi galerisiyle sunuluyor. Klavyeyle gezinme, dokunmatik kaydırma, otomatik slayt gösterisi ve hızlı yükleme var.

<img src="docs/media/divider.svg" width="100%" alt="">

## Development

```sh
npm install
npm run dev      # http://localhost:8080
npm run build
```

<div align="center">
<br>
<a href="https://github.com/kutluhangil"><img src="docs/media/signature.svg" width="100%" alt="Built by kutluhangil"></a>
<sub>Unofficial fan project · Harry Potter and all related names belong to their respective owners.</sub>
</div>
