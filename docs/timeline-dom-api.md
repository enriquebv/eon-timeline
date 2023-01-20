# Timeline DOM API

This module exports a `TimelineDOM` class that is used to render a set of timelines on a given container element. The `TimelineDOM` class accepts an options object with the following properties:

## Properties

- `range`: a `Range` object representing the start and end times for the timelines.
- `container`: the HTML element that will be used as the container for the timelines.
- `timelines`: an array of `Timeline` objects to be rendered on the container.
- `onRender`: a callback function that will be called when the timelines are rendered.
- `customResizeObserver`: an optional custom `ResizeObserver` class.

## Methods

- `setRange(range: Range)`: set the start and end times for the timelines.
- `addTimeline(timeline: Timeline)`: add a new `Timeline` object to be rendered on the container.
- `removeTimeline(index: number)`: remove the `Timeline` object at the given index from the container.
