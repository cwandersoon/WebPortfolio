# Personal Portfolio – William Andersson

A personal developer portfolio built for a Frontend course. Single-page site with sections for About, Projects, Testimonials and Contact.

**Live demo:** [paste-your-github-pages-url-here]

---

## Tech stack

- HTML5, CSS3, vanilla JavaScript
- Bootstrap 5 (grid + utilities) and Bootstrap Icons
- Formspree (contact form) and OpenWeatherMap API (weather widget)

--- 

## Methods and principles

**Separation of concerns** – Bootstrap handles layout (grid, flex utilities), my own CSS handles design (colors, typography, components). All custom classes use a `pf-` prefix to avoid conflicts.

**CSS custom properties** – colors and key dimensions live as variables in `:root` so the design can be changed from one place (DRY).

**Mobile-first responsive** – tested down to 320px, using Bootstrap's breakpoints and `clamp()` for fluid typography without extra media queries.

**Accessibility** – semantic HTML, `aria-label` on icon links, `aria-hidden` on decorative icons, `aria-expanded` for toggleable elements, skip link for keyboard users, `:focus-visible` for focus states, hidden form labels for screen readers.

**Form validation** – HTML5 attributes (`required`, `type="email"`, `minlength`) handle validation natively before JavaScript runs. CSS uses `:invalid:not(:placeholder-shown)` so errors only appear after typing.

**Async/await with error handling** – both API calls (weather and Formspree) use `try/catch` and check `response.ok` to handle network and HTTP errors. Users see a friendly fallback instead of broken UI.

**Sticky navbar with scroll detection** – hides on scroll down, reappears on scroll up using JavaScript.


## Git workflow

Each section was built on its own feature branch (`feature/navbar`, `feature/hero`, `feature/about`, etc.) and merged into `main` when complete.

---

## Author

**William Andersson** – fullstack developer in training.
[GitHub](https://github.com/cwandersoon) · [LinkedIn](https://www.linkedin.com/in/cw-andersson/)