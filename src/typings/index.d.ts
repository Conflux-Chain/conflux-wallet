/**
 * @type P: Type of payload
 * @type C: Type of callback
 */
export type Dispatch = <P = any, C = (payload: P) => void>(action: {
  type: string
  payload?: P
  callback?: C
  [key: string]: any
}) => any

export interface IDispatch {
  dispatch?: Dispatch
}
