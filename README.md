<p align="center">
  <b>As can be inferred from the <a target="_blank" href="https://semver.org/#how-should-i-deal-with-revisions-in-the-0yz-initial-development-phase">semantic versioning, <code>v1.0</code> has not yet arrived</a>, so do not treat the library yet as if it could be used in production.</b>
</p>

<h1 align="center">
  <br>
  eon-timeline
  <br>
</h1>

<h4 align="center">A flexible timeline solution.</h4>

<p align="center">
  <a href="https://badge.fury.io/js/@eon-timeline%2Fcore"><img src="https://badge.fury.io/js/@eon-timeline%2Fcore.svg" alt="npm version" height="18"></a>
</p>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#roadmap">Roadmap</a> •
  <a href="#license">License</a>
</p>

## Key Features

- **Simplicity**: This library will just render timeline lanes, and ocurrences. You can extend the library to create your own timeline experience.
- **Flexibility**: The main target of this library, allow you to create your own timeline experience.
- **Headless**: Core package contains logic to compute ocurrence status, and a DOM adapter to transform that status to valid CSS position.
- **Pre-built components**: Even the core being headless, you can use pre-built [components](./components/) to save time.
  - Currently only React (`@eon-timeline/react`) is supported, Vue and Svelte are in the roadmap.
- **Update timelines in real-time**: Add, remove and update ocurrences from timelines.
- **Virtualized time navigation**: Pans timeline left and right to view past or future (respectively). DOM adapter will just take care of visible ocurrences, so you can store thousands of ocurrences.

[Coming soon features.](#v110)

## How To Use

- How to use [@eon-timeline/core](./core/README.md).
- How to use [@eon-timeline/react](./components/react/README.md).

## Roadmap

### v1.0.0

- Timeline manager:
  - Basic range and ocurrence status computation.
  - Add, update and remove ocurrences.
- Timeline DOM adapter:
  - Sync range between multiple timelines.
  - Transform timeline ocurrences status to DOM position.
  - Virtualize ocurrences.
  - Support responsible.
  - Support gestures; navigate through times using pan gesture.
  - Dynamic add/remove timelines.

### v1.1.0

- Svelte pre-built component.
- Vue pre-built component.
- Enhance ocurrences support:
  - On ocurrence add/update/remove.
  - On timeline add/remove.
  - On range change/changed.

## Support

If you think eon-timeline is helpful, or my work is valuable, [consider buying me a cup of coffee](https://www.buymeacoffee.com/enriquebv). :heart:

## License

[MIT](./LICENSE)

---

> GitHub [@enriquebv](https://github.com/enriquebv) &nbsp;&middot;&nbsp;
> Twitter [@enriquedev\_](https://twitter.com/enriquedev_)
