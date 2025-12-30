type Success<T> = { type: 'ok'; data: T };
type Error<E> = { type: 'error'; error: E };
export type Result<T, E> = Success<T> | Error<E>;
