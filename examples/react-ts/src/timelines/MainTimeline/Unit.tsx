import { EonTimelineOcurrenceProps } from '@eon-timeline/react'

const formatTime = (timestamp: number) => new Date(timestamp).toTimeString().split(' ')[0]

export default function Unit(props: EonTimelineOcurrenceProps) {
  return (
    <div className='unit-ocurrence'>
      <span className='unit-label'>{formatTime(props.ocurrence.range.start)}</span>
    </div>
  )
}
