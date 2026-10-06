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

## Optional capture tools

The committed assets are made with the local Playwright + FFmpeg workflow.
The screenshots contain only the offline synthetic demo. No external capture
tool was used to create the committed assets. License status was checked on
2026-10-06; use each tool locally and review its bundled assets and dependencies
separately. None is a runtime dependency, and no tool source is copied here:

- [OpenScreen](https://github.com/getopenscreen/openscreen) — [MIT license](https://github.com/getopenscreen/openscreen/blob/main/LICENSE);
  suitable for local screen recording, including commercial use under its license.
- [Brag](https://github.com/latent-spaces/brag) — [MIT repository license](https://github.com/latent-spaces/brag/blob/main/LICENSE). Its
  README also promotes a hosted video-generation service; do not submit private
  production screens, source, account data or unpublished launch material to it.
- [OneTake](https://github.com/feitangyuan/onetake) — [PolyForm Noncommercial
  1.0.0](https://github.com/feitangyuan/onetake/blob/main/LICENSE); use is limited to permitted noncommercial purposes.
- [Recordly](https://github.com/webadderallorg/Recordly) — [AGPL-3.0](https://github.com/webadderallorg/Recordly/blob/main/LICENSE.md); keep it a
  separate local recording application and do not copy its source into this
  repository.

Capture only the offline synthetic demo. Do not upload production screens,
private data or footage to hosted generation services. Tool licenses do not
change this repository's restrictive license or grant rights to its assets.
