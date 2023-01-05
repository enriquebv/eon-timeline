import React, { PropsWithChildren } from 'react'

import { Timeline, TimelineDOM, TimelineDOMItem, Range } from '@eon-timeline/core'

import { EonTimelineLane, EonTimelineLaneProps } from './EonTimelineLane'
import { EonTimelineDOMItemSizes } from './types'

export interface EonTimelineProps extends PropsWithChildren {
  timelines: Timeline[]
  range: Range
  className?: string
  onRangeChange(range: Range): void
  timelineDomRef?: React.ForwardedRef<TimelineDOM>
  containerRef?: React.ForwardedRef<HTMLDivElement>
}

export class InvalidChildren extends Error {
  constructor() {
    super(
      `Unknown children provided to EonTimeline, only children accepted are ${EonTimelineLane.displayName} components.`
    )
  }
}

interface EonTimelineState {
  timelinesDomItems: TimelineDOMItem[][]
}

function assignRef<RefType = any>(ref: React.ForwardedRef<RefType>, value: RefType) {
  const refIsFunction = typeof ref === 'function'

  refIsFunction ? ref(value) : ((ref as any).current = value)
}

export default class EonTimeline extends React.Component<EonTimelineProps, EonTimelineState> {
  containerRef: HTMLDivElement | null = null
  timelineDom: TimelineDOM | null = null

  constructor(props: Readonly<EonTimelineProps>) {
    console.log('contruct eon timeline')
    super(props)

    this.state = {
      timelinesDomItems: [],
    }

    this.checkChildren()
  }

  componentDidMount() {
    this.setupTimelineDom()
  }

  componentDidUpdate(prevProps: Readonly<EonTimelineProps>): void {
    const rangeHasChanged =
      prevProps.range.start !== this.props.range.start || prevProps.range.end !== this.props.range.end

    if (rangeHasChanged) {
      this.syncRangeWithProps()
    }
  }

  syncRangeWithProps() {
    this.timelineDom?.setRange(this.props.range)
  }

  checkChildren() {
    const childs = React.Children.toArray(this.props.children).filter((child) => child !== null)

    childs.forEach((child: any) => {
      const childName = child.type.displayName || child.type.name

      if (childName !== EonTimelineLane.displayName) {
        throw new InvalidChildren()
      }
    })
  }

  setupTimelineDom() {
    const container = this.containerRef as HTMLDivElement
    const timelineDom = new TimelineDOM({
      container,
      range: this.props.range,
      timelines: this.props.timelines,
      onRender: (timelinesDomItems: TimelineDOMItem[][]) => {
        this.setState({ timelinesDomItems })
      },
    })

    timelineDom.on('range-change', this.props.onRangeChange)

    if (this.props.timelineDomRef) {
      assignRef(this.props.timelineDomRef, timelineDom)
    }

    if (this.props.containerRef) {
      assignRef(this.props.containerRef, container)
    }

    this.timelineDom = timelineDom
  }

  findChildLane(timeline: Timeline) {
    const childLanes = React.Children.toArray(this.props.children).filter(
      (child) => child !== null
    ) as React.ReactElement<EonTimelineLaneProps>[]

    return childLanes.find((childLane) => childLane.props.timeline === timeline)
  }

  render() {
    const { props } = this
    const { timelinesDomItems } = this.state

    return (
      <>
        <div ref={(ref) => (this.containerRef = ref)} className={this.props.className}>
          {timelinesDomItems.map((timelineDomItems, index) => {
            const timeline = props.timelines[index]
            const childLane = this.findChildLane(timeline)

            if (childLane) {
              const { EventComponent, className } = childLane.props

              return (
                <div className={['eon-timeline', className || ''].join(' ')} key={index}>
                  {timelineDomItems.map((timelineDomItem) => (
                    <div
                      className='eon-timeline-item'
                      key={timelineDomItem.item.id}
                      style={TimelineDOM.getItemStyleFromDomItem(timelineDomItem)}
                    >
                      {EventComponent ? (
                        <EventComponent
                          item={timelineDomItem.item as any}
                          timeline={timelineDomItem.timeline}
                          sizes={
                            {
                              width: timelineDomItem.width,
                              startOffset: timelineDomItem.startOffset,
                            } satisfies EonTimelineDOMItemSizes
                          }
                        />
                      ) : null}
                    </div>
                  ))}
                </div>
              )
            }

            return (
              <div className='eon-timeline' key={index}>
                {timelineDomItems.map((timelineDomItem) => (
                  <div
                    className='eon-timeline-item'
                    key={timelineDomItem.item.id}
                    style={TimelineDOM.getItemStyleFromDomItem(timelineDomItem)}
                  />
                ))}
              </div>
            )
          })}
        </div>
      </>
    )
  }
}
