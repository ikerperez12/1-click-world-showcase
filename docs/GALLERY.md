# Gallery

All artwork is original SVG created for this repository. Scene labels and
profile details are invented. The illustrations are not photographs and
do not correspond to real locations.

| Asset | Purpose |
| --- | --- |
| public/places/coast.svg | Hero scene and first offline demo |
| public/places/highlands.svg | Second fictional scene |
| public/places/market.svg | Third fictional scene |
| public/gallery/map-panel.svg | Conceptual pin and crowd visualization |
| public/gallery/passport.svg | Fictional profile and progress preview |
| public/gallery/social-preview.svg | Editable source for the repository social card |
| public/gallery/social-preview.png | 1280 × 640 social card rendered from the SVG source |
| public/gallery/gameplay.gif | Short local capture of the place → pin → reveal flow |

No image is hotlinked. No map or place data is downloaded at runtime.

The PNG and GIF can be regenerated with <code>npm run build</code>,
<code>npx playwright install chromium</code> and
<code>npm run capture:gallery</code>. The GIF capture also needs FFmpeg.
