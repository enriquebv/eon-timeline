# Common types

## Range

This interface defines a `Range` object which contains the following properties:

### Properties

- `start`: a number representing the start time of the range.
- `end`: a number representing the end time of the range.

```js
const range = { start: 1577836800000, end: 1577840400000 } // timestamp in ms
```

It's important to note that only timestamps represented in milliseconds are supported. Other formats will not be supported now or in the future.

## Ocurrence

Describes an event in the time.

### Properties

- `id`: a number or string representing the id of the ocurrence.
- `range`: a `Range` object representing the start and end times for the ocurrence.
- `data`: an optional property that can be used to store additional data related to the ocurrence.

```js
const ocurrence = {
  id: 1,
  range: { start: 1577836800000, end: 1577840400000 },
  data: {
    title: 'Meeting with team',
    location: 'Conference Room A',
  },
}
```
