export interface Range {
  start: number
  end: number
}

export interface Item {
  id: number
  ocurrence: Range
}

export type TickScale = 'seconds' | 'minutes' | 'hours' | 'days'
