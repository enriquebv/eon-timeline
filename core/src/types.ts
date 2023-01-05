export interface Range {
  start: number
  end: number
}

export interface Item<Data = unknown> {
  id: number
  ocurrence: Range
  data?: Data
}

export type ItemWithData<Data> = {
  id: number
  ocurrence: Range
  data: Data
}

export type TickScale = 'seconds' | 'minutes' | 'hours' | 'days'
