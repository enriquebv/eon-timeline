# Timeline API

The `Timeline` class is a utility class that helps manage a collection of occurrences, called `Ocurrence`. It allows you to add, update, remove, and calculate occurrences within a given range.

## Properties

- `ocurrences`: Map of ocurrences on the timeline.
- `range`: Start and end date of the timeline.
- `timespan`: The difference between the end and start date of the timeline.
- `ocurrencesRange`: Start and end date of the ocurrences on the timeline.

## Methods

- `addOcurrence(ocurrence: Ocurrence)`: Add an ocurrence to the timeline.
- `updateOcurrence(ocurrence: Ocurrence)`: Update an ocurrence on the timeline.
- `getTimelineOcurrence(id: string | number)`: Get an ocurrence from the timeline.
- `removeOcurrence(id: string | number)`: Remove an ocurrence from the timeline.
- `calculate()`: method that can be used to perform any calculations related to the timeline.
- `setRange(range: Range)`: set the range of the timeline.

## Errors

- `MissingRange`: Error thrown when a range is not provided when creating a new instance of the Timeline class.
- `OcurrenceNotFoundWithId`: Error thrown when trying to update or remove an ocurrence that doesn't exist on the timeline.
