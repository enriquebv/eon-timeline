import { buildUnitsTimeline, Timeline, Ocurrence } from '@eon-timeline/core'
import { makeOcurrencesCollection, RANGES_PER_UNIT } from '../shared'

const TASK_STATUS = ['TODO', 'CANCELLED', 'POSTPONED', 'APPROVED']

const appendData = (baseTitle: string) => (ocurrence: Ocurrence, index: number) => ({
  ...ocurrence,
  data: {
    title: `${baseTitle} #${index + 1}`,
    status: TASK_STATUS[Math.floor(Math.random() * TASK_STATUS.length)],
  },
})

const timelines = [
  new Timeline({
    ocurrences: buildUnitsTimeline({ range: RANGES_PER_UNIT.hour, unit: 'minute', unitScale: 15 }),
  }),
  new Timeline({ ocurrences: makeOcurrencesCollection().map(appendData('Pairing')) }),
  new Timeline({ ocurrences: makeOcurrencesCollection().map(appendData('Meeting')) }),
  new Timeline({ ocurrences: makeOcurrencesCollection().map(appendData('Analisys')) }),
  new Timeline({ ocurrences: makeOcurrencesCollection().map(appendData('Demo')) }),
  new Timeline({ ocurrences: makeOcurrencesCollection().map(appendData('Retro')) }),
]

export default timelines
