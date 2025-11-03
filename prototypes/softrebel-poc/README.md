SoftRebel Prototype — AI Skin Scan (static PWA demo)

What this is
- A lightweight prototype demonstrating camera capture + mock AI inference + routine suggestions.
- No images are uploaded in this demo; inference is mocked locally for demo purposes.

Files added
- `index.html` — prototype landing + camera UI
- `css/style.css` — small style sheet with brand-like tokens
- `js/app.js` — camera logic + mock inference + routine storage

How to run locally
1. From the repository root run a static server (Python's http.server is fine):

```bash
# from C:/Users/HP/Downloads/spa
python -m http.server 8000
```

2. Open the prototype in your browser:

http://localhost:8000/prototypes/softrebel-poc/index.html

Notes & next steps
- Next: replace mock inference with a server endpoint or on-device model. Implement consent flow and secure uploads.
- I can also produce a Figma wireframe export or create an improved HTML/CSS prototype with product pages and checkout flows.
- Tell me if you want local payment widget mockups (Flutterwave/Stripe) or an admin CMS stub next.