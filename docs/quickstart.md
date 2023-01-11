# Quick start

## Install

<!-- tabs:start -->

#### **Yarn**

```
yarn add @eon-timeline/core
```

#### **NPM**

```
npm i @eon-timeline/core
```

<!-- tabs:end -->

> ℹ️ @eon-timeline packages contains built-in TypeScript declarations.

## Create timeline with an ocurrence

Create an `Ocurrence`, represents an item in the timeline lane:

<!-- tabs:start -->

#### **TypeScript**

```typescript
import { Ocurrence } from '@eon-timeline/core'

const ocurrence: Ocurrence = {
  id: 1, // Must be unique per timeline, or will be ignored. Can be used to update ocurrence if needed.
  range: {
    // Defines when ocurrence starts and end.
    start: new Date('2023-01-01T07:30:00.000Z').valueOf(),
    end: new Date('2023-01-01T10:00:00.000Z').valueOf(),
  },
}
```

#### **JavaScript**

```javascript
const ocurrence = {
  id: 1, // Must be unique per timeline, or will be ignored. Can be used to update ocurrence if needed.
  range: {
    // Defines when ocurrence starts and end.
    start: new Date('2023-01-01T07:30:00.000Z').valueOf(),
    end: new Date('2023-01-01T10:00:00.000Z').valueOf(),
  },
}
```

<!-- tabs:end -->

> ❗ eon-timeline only supports timestamps in milliseconds. Don't use `Date` or `string`.

Creates a `Timeline`, represents one timeline lane:

<!-- tabs:start -->

#### **TypeScript**

```js
import { Timeline } from '@eon-timeline/core'

const timeline = new Timeline({ ocurrences: [ocurrence] })
```

#### **JavaScript**

```js
import { Timeline } from '@eon-timeline/core'

const timeline = new Timeline({ ocurrences: [ocurrence] })
```

<!-- tabs:end -->

## Render using React

Install pre-built React component:

<!-- tabs:start -->

#### **Yarn**

```
yarn add @eon-timeline/react hammerjs@2.0.8
```

#### **NPM**

```
npm i @eon-timeline/react hammerjs@2.0.8
```

<!-- tabs:end -->

Import `EonTimeline` component and use it with this props:

- `range`: A `Range` object, defines timeline visible time range.
- `timelines`: An array of `Timeline` objects.

<!-- tabs:start -->

#### **TypeScript**

```tsx
import { EonTimeline } from '@eon-timeline/react'

import '@eon-timeline/core/dist/styles.css'

const range: Range = {
  start: new Date('2023-01-01T00:00:00.000Z').valueOf(),
  end: new Date('2023-01-02T00:00:00.000Z').valueOf(),
}

export default function SingleTimeline() {
  return <EonTimeline range={range} timelines={[timeline]} />
}
```

#### **JavaScript**

```jsx
import { EonTimeline } from '@eon-timeline/react'

import '@eon-timeline/core/dist/styles.css'

const range = {
  start: new Date('2023-01-01T00:00:00.000Z').valueOf(),
  end: new Date('2023-01-02T00:00:00.000Z').valueOf(),
}

export default function SingleTimeline() {
  return <EonTimeline range={range} timelines={[timeline]} />
}
```

<!-- tabs:end -->

- [🧑🏻‍💻 Play with this example in CodeSandbox.](https://codesandbox.io/s/eon-timeline-react-typescript-forked-58ncfs?file=/src/App.tsx)
- [🧑🏻‍💻 Play with and advanced example in CodeSandbox.](https://codesandbox.io/s/eon-timeline-react-typescript-3ogq9z?file=/src/App.tsx)

## Render using TimelineDOM
