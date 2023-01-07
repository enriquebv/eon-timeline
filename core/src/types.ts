export interface Range {
  start: number
  end: number
}

export interface Ocurrence<Data = unknown> {
  id: number
  range: Range
  data?: Data
}
