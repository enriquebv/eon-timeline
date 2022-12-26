> 👷🏼‍♂️ **Work in progres, in a very alpha version. Use it in your own terms or contribute [here](https://github.com/enriquebv/virtual-headless-timeline).**

<h1 align="center">
  <br>
  eon-timeline
  <br>
</h1>

<h4 align="center">A headless timeline renderer.</h4>

<p align="center">
  <a href="https://badge.fury.io/js/virtual-headless-timeline">
    <img src="https://badge.fury.io/js/virtual-headless-timeline.svg" alt="npm">
  </a>
</p>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#roadmap">Roadmap</a> •
  <a href="#credits">Credits</a> •
  <a href="#license">License</a>
</p>

## Key Features

- Headless timeline renderer.
  - Library only provides positions to create your own timeline.
  - You can use React, Vue, Svelte, or others libraries/frameworks to create timeline components.
- Performant.
  - You can create timelines with a large quantity of items, only those which are in current timeline will be provided to be rendered.
- Update timelines in real-time:
  - Remove items.
  - Add new items.
  - Update items.
- Responsive by default.
- Scrollable.
- Simple API built with TypeScript.
- Pre-built components to most used UI libraries/frameworks:
  - React
  - Vue
- Cluster mode.

### Coming soon features:

- Nested timelines.
- SSR support.
- Pre-built components to most used UI libraries/frameworks:
  - Svelte
- Pre-built canvas timeline render.

## Philosophy

> // TODO: Explain why library
>
> - Only accepts timestamps in milliseconds format.
> - Layer implementation to allow fine-grain control over the timeline.

## How To Use

1. Install library:

   ```bash
   # With yarn
   yarn add eon-timeline

   # or with npm
   npm i eon-timeline
   ```

> // TODO: When library have version 1.0.0, create basic example.

## Roadmap

### v1.0.0

- [x] Implement timeline manager:
  - [x] Basic range and calc orchestration.
  - [x] Add unit tests.
  - [x] Update item.
  - [x] Add item.
  - [x] Remove item.
- [x] Create timeline item entity
  - [x] Added basic range offets calculation
  - [x] Added unit tests
- [x] Implement DOM layer:
  - [x] `ResizeObserver` to support responsive.
  - [x] Pan gesture support; will move to future or past using current timeline range.
  - [x] Add unit tests to DOM layer.
- [ ] Events
  - [ ] On scroll event
  - [ ] On scroll end event
- [ ] Refactor code to simplify API.
- [ ] Create pre-built React component.
- [ ] Create pre-built Vue component.
- [ ] Create pre-built Svelte component.
- [ ] Create demo pages.
- [ ] Enhance current README with basic examples.
- [ ] Create `API.md` file with explained library API.

### v1.1.0

- [ ] Scroll gesture support; will modify current timeline range.
- [ ] Create canvas implementation.
- [ ] SSR support.

## Credits

This library uses the following open source modules:

- [Hammer.JS](https://github.com/hammerjs/hammer.js): Allows to control gestures in timeline (pan, scroll, etc).

## Support

> // TODO: Add buymeacoffe link.

## License

MIT

---

> GitHub [@enriquebv](https://github.com/enriquebv) &nbsp;&middot;&nbsp;
> Twitter [@enriquedev\_](https://twitter.com/enriquedev_)
