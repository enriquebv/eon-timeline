# @eon-timeline/react

**EonTimeline** is a React component for creating timelines. It accepts a set of timelines and a range, and renders them in a container. The component also allows for custom styling, event handling, and DOM manipulation through its API.

## Props

| Property       | Type                               | Description                                                                                         |
| -------------- | ---------------------------------- | --------------------------------------------------------------------------------------------------- |
| timelines      | Timeline[]                         | An array of `Timeline` objects representing the timelines to be rendered.                           |
| range          | Range                              | An object representing the range of the timeline, with properties `start` and `end` of type `Date`. |
| className      | string                             | Optional class name to add to the component's root element.                                         |
| onRangeChange  | (range: Range) => void             | Optional callback function to be called when the range of the timeline changes.                     |
| timelineDomRef | React.ForwardedRef<TimelineDOM>    | Optional ref object that will receive the `TimelineDOM` instance.                                   |
| containerRef   | React.ForwardedRef<HTMLDivElement> | Optional ref object that will receive the container element of the `EonTimeline`.                   |

### Children

`EonTimeline` only accepts children of type `EonTimelineLane`.

## Example

```jsx
import React from 'react'
import { EonTimeline } from '@eon-timeline/react'
import { Timeline } from '@eon-timeline/core'

const timelines = [
  new Timeline({
    id: 'timeline-1',
    name: 'Timeline 1',
    ocurrences: [
      {
        id: 'ocurrence-1',
        start: new Date(),
        end: new Date(),
        name: 'Ocurrence 1',
      },
    ],
  }),
]

const App = () => {
  const [range, setRange] = useState({
    start: new Date('2022-01-01'),
    end: new Date('2023-01-01'),
  })

  return (
    <EonTimeline timelines={timelines} range={range} onRangeChange={setRange}>
      <EonTimelineLane timeline={timelines[0]} />
    </EonTimeline>
  )
}
```

> ℹ️ Use this example as base for the next examples.

### Children

`EonTimeline` only accepts children of type `EonTimelineLane`.

`EonTimelineLane` is used to customize the behavior of each lane of the timeline, by adding a class or using custom components for the ocurrences. The custom component that can be passed to `EonTimelineLane` can make use of the following props defined in the typescript:

| Property  | Type                         | Description                                                                                         |
| --------- | ---------------------------- | --------------------------------------------------------------------------------------------------- |
| timeline  | Timeline                     | The timeline to which the ocurrence belongs                                                         |
| ocurrence | Ocurrence                    | The ocurrence object, which has properties `start`, `end`, `name`, and an optional `data` property. |
| sizes     | EonTimelineDOMOcurrenceSizes | DOM sizes of the ocurrence                                                                          |

```jsx
// Import component:
import { EonTimelineLane } from '@eon-timeline/react'

// Use as child:
return (
  <EonTimeline timelines={timelines} range={range}>
    <EonTimelineLane
      timeline={timelines[0]}
      OcurrenceComponent={MyCustomOcurrenceComponent}
      className='custom-lane-class'
    />
  </EonTimeline>
)
```

### Ref

`EonTimeline` has two ref props:

- `timelineDomRef`: ref object that will receive the `TimelineDOM` instance.
- `containerRef`: ref object that will receive the container element of the `EonTimeline`.

You can use them like this:

```jsx
const timelineDomRef = React.createRef()
const containerRef = React.createRef()

return (
  <EonTimeline timelines={timelines} range={range} timelineDomRef={timelineDomRef} containerRef={containerRef}>
    <EonTimelineLane timeline={timelines[0]} />
  </EonTimeline>
)

timelineDomRef.current?.setRange(newRange)
containerRef.current?.getBoundingClientRect()
```

Note that you can use both refs together or only one of them.
