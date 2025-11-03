## Quick orientation

- This is a static demo website (Canvas "Spa" demo). It's plain HTML/CSS/JS — no build steps or package manager are present. The site is served directly from files under the repository root (open `index.html` or run a simple static server).
- Major areas:
  - `index.html` — primary demo page (hero slider, content sections, contact form).
  - `js/functions.js` — project-specific initialization and the global SEMICOLON namespace; most interactive behavior lives here.
  - `js/plugins.js` — bundled third-party jQuery plugins and extensions used by the demo.
  - `include/rs-plugin/` — Revolution Slider assets (CSS, JS, extensions). Editing sliders usually requires touching `index.html` slide markup.
  - `demos/spa/` — demo-specific styles, fonts and images (theme-level overrides).

## Big picture / architecture

- Static front-end only. There is no server-side code in this repo. Interactions are implemented via jQuery + a large theme script (`js/functions.js`) that exposes a global `SEMICOLON` object with submodules (initialize, header, slider, widget, portfolio, etc.).
- Data & behavior are driven by HTML attributes (data-attributes). Example patterns:
  - Slider configuration and slides are defined in `index.html` (the `<ul>` inside `#rev_slider_10_1`).
  - Widgets/components read `data-` attributes directly (e.g. `data-lazyload`, `data-animation`, `data-filter`).
- Many third-party integrations are initialized from `functions.js` (YouTube background player, Instafeed, RevSlider, MagnificPopup, Owl/Swiper, Isotope). Keep plugin code (in `js/plugins.js` and `include/`) mostly untouched.

## Developer workflows (how to run / debug locally)

- No npm / build. To view the site, open `index.html` in your browser or run a small static server (recommended so XHR/asset paths behave):
  - Python: `python -m http.server 8000` (run from repo root) then open `http://localhost:8000`.
  - VS Code: use Live Server or the built-in static server extension.
- Debugging: use Chrome/Edge devtools. Console errors often point to missing plugin files in `include/` or mis-configured data-attributes.
- After DOM changes that affect dynamic widgets, call the relevant SEMICOLON initializer in the console to re-run setup (examples below).

## Project-specific conventions & patterns

- Global API: `SEMICOLON` (see `js/functions.js`). Use `SEMICOLON.initialize.*`, `SEMICOLON.widget.*`, `SEMICOLON.slider.*` to re-init specific subsystems.
  - Example: after adding new `.fslider` HTML, call `SEMICOLON.widget.loadFlexSlider()` then `SEMICOLON.initialize.verticalMiddle()` to align content.
- Data-attribute driven config: components expect `data-` attributes on elements rather than separate JS config files. Look for attributes such as `data-lazyload`, `data-lightbox`, `data-animation`, `data-filter`, `data-height-*`, etc.
- Styling overrides for this demo live in `demos/spa/spa.css` and `demos/spa/css/fonts.css`. Global theme variables use files in `css/` (e.g. `colors3dda.css?color=78c9d1`).

## Integration points & external dependencies

- Revolution Slider: `include/rs-plugin/` (CSS/JS/extensions). Slider instances are created in `index.html` and activated in embedded scripts (see bottom of `index.html`).
- Contact form action posts to an external URL by default (`include/sendemail.php` already pointed at `themes.semicolonweb.com` in the demo). For local testing either replace the action or mock the endpoint.
- Social/gallery feeds: `SEMICOLON.widget.instagramPhotos(...)` and `dribbble` calls may require API tokens; search `functions.js` for hardcoded sample tokens before changing.

## Safe editing rules for AI agents

- Never modify third-party plugin code unless strictly necessary. Plugins live in `js/plugins.js` and `include/`. Prefer configuration changes in `index.html` or small wrappers in `js/functions.js`.
- Preserve data-attributes and the `SEMICOLON` init order. If you add dynamic content, re-run the matching initializer:
  - DOM -> sliders: `SEMICOLON.slider.init()` or `SEMICOLON.slider.sliderRun()`
  - DOM -> widgets: `SEMICOLON.widget.init()` or component-specific like `SEMICOLON.widget.loadFlexSlider()`
  - After layout changes: `SEMICOLON.documentOnResize.init()` and `SEMICOLON.documentOnLoad.init()` may help.
- When changing markup, update only the demo files under `demos/spa/` or top-level `index.html` slide sections; avoid global CSS rewrites without testing across breakpoints.

## Quick examples (do these when applicable)

- Add/modify a hero slide: edit the `<li>` entries inside the `<div id="rev_slider_10_1">` in `index.html` (image paths under `demos/spa/images/slider/`). Then refresh page.
- Change a widget's text or icon: edit `index.html` where the widget markup appears (e.g., services under `#section-about`). The JavaScript reads `data-` attributes at init time.
- Reinitialize sliders after DOM changes (console):
  - SEMICOLON.slider.sliderParallaxDimensions(); SEMICOLON.slider.sliderRun(); SEMICOLON.slider.sliderParallax();

## Contract (short)

- Inputs: edits will be to HTML/CSS/JS files in this repo (no build). Keep changes small and scoped to demo files.
- Output: working static pages rendered correctly in modern browsers. No server-side changes expected.

## Edge cases & gotchas

- Plugin ordering matters: `jquery.js` -> `plugins.js` -> `functions.js` -> plugin-specific script blocks in `index.html`. Changing order can break initialization.
- Many assets are referenced with relative paths and some use absolute references to the original theme site. When testing locally, use a static server to avoid CORS/XHR problems.
- Contact form POSTs and some feed widgets expect external endpoints or API keys — they will fail in local-only mode unless stubbed.

---

If you want, I can (A) merge additional text from an existing agent file if you provide one, (B) add a short task checklist for a specific change (e.g., "update hero slide images"), or (C) run a quick smoke-check in a browser-like environment. Which would you prefer next?
