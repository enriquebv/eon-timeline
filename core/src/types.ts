export interface Range {
  start: number
  end: number
}

export interface Ocurrence<Data = unknown> {
  id: number | string
  range: Range
  data?: Data
}
