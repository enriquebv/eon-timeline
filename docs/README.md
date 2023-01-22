# eon-timeline

> A flexible events timeline library.

## What it is

**eon-timeline** is a tool designed to give you the flexibility you need to create your own timeline. eon-timeline focuses on determining which events should be visible within a given time range, and positioning them accordingly. The basic design is there to give you a starting point, but the final look and feel is entirely up to you. It's all about giving you the freedom to make it your own.

If you're also looking for a prebuilt implementation, I got you. By default, provides a React (`>= v15`) component. Vue and Svelte are in the roadmap, you can contribute with other implementations.

See the [Quick start](quickstart.md) guide for more details.

## Features

- Flexibly by default.
- Simple API to fit your needs.
- DOM layer is responsive and support touch events.
- Unopinionated styling.

## Motivation

The motivation behind it is to create a tool that is agnostic to advanced behaviors and features, allowing developers to focus on custom features that provides value to the users.

This is achieved through a two-layer architecture:

- The Logic Layer ([Timeline](./timeline-api.md)): This layer is responsible for computing time state.
- The DOM Adaptation Layer ([TimelineDOM](./timeline-dom-api.md)): This layer handles DOM sizes, responsive support and user gestures.

## Donate

Please consider donating if you think eon-timeline is helpful to you or that my work is valuable. I am happy if you can help me [buy a cup of coffee](https://www.buymeacoffee.com/enriquebv). :heart:
