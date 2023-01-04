<h1 align="center">
  <br>
  eon-timeline
  <br>
</h1>

<h4 align="center">A flexible timeline solution.</h4>

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

- **Flexibility**: The main target of this library, allow you to create your own timeline experience.
- **Headless**: Core package contains logic to compute event status, and a DOM adapter to transform that status to valid CSS position.
- **Pre-built components**: Even the core being headless, you can use pre-built [components](./components/) to save time.
  - Currently only React (`@eon-timeline/react`) is supported, Vue and Svelte are in the roadmap.
- **Update timelines in real-time**: Add, remove and update items from timelines.
- **Virtualized time navigation**: Pans timeline left and right to view past or future (respectively). DOM adapter will just take care of visible items, so you can store thousands of events.

### Coming soon features:

- SSR support.
- Pre-built components to most used UI libraries/frameworks:
  - Svelte
- Pre-built canvas implementation.

## How To Use

- How to use [@eon-timeline/core](./core/README.md).
- How to use [@eon-timeline/react](./components/react/README.md).

## Roadmap

### v1.0.0

- Timeline manager:
  - Basic range and event status computation.
  - Add, update and remove events.
- Timeline DOM adapter:
  - Sync range between multiple timelines.
  - Transform timeline events status to DOM position.
  - Virtualize events.
  - Support responsible.
  - Support gestures; navigate through times using pan gesture.
  - Dynamic add/remove timelines.

### v1.1.0

- Svelte pre-built component.
- Vue pre-built component.
- Enhance events support:
  - On item add/update/remove.
  - On timeline add/remove.
  - On range change/changed.

## Support

If you think eon-timeline is helpful, or my work is valuable, [consider buying me a cup of coffee](https://www.buymeacoffee.com/enriquebv). :heart:

## License

[MIT](./LICENSE)

---

> GitHub [@enriquebv](https://github.com/enriquebv) &nbsp;&middot;&nbsp;
> Twitter [@enriquedev\_](https://twitter.com/enriquedev_)
