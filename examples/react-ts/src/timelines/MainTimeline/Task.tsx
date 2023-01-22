import { EonTimelineOcurrenceProps } from '@eon-timeline/react'
import { PropsWithChildren } from 'react'
import { Tooltip as TippyTooltip, TooltipProps } from 'react-tippy'

const Tooltip = TippyTooltip as unknown as React.FunctionComponent<PropsWithChildren<TooltipProps>>

import 'react-tippy/dist/tippy.css'

interface Data {
  title: string
  status: 'TODO' | 'CANCELLED' | 'POSTPONED' | 'APPROVED'
}

const formatNumber = (date: number) => [new Date(date).toDateString(), new Date(date).toLocaleTimeString()].join(' ')

export default function Task(props: EonTimelineOcurrenceProps<Data>) {
  return (
    <Tooltip
      trigger='click'
      arrow
      html={
        <table className='tooltip-table'>
          <tr>
            <td>
              <b>Status</b>
            </td>
            <td className='status'>{props.ocurrence.data?.status}</td>
          </tr>
          <tr>
            <td>
              <b>Starts at</b>
            </td>
            <td>{formatNumber(props.ocurrence.range.start)}</td>
          </tr>
          <tr>
            <td>
              <b>Ends at</b>
            </td>
            <td>{formatNumber(props.ocurrence.range.end)}</td>
          </tr>
        </table>
      }
    >
      <div className={props.ocurrence.data?.status.toLowerCase()}>{props.ocurrence.data?.title}</div>
    </Tooltip>
  )
}
