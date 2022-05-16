export const SET_PENDING = 'SET_PENDING';

export function setPending(pending) {
  return {
    type: SET_PENDING,
    payload: pending,
  };
}
