import { SET_PENDING } from '../actions/pendingActions';
import { pending } from '../initialValues/pending';

export default function pendingReducer(state = pending, { type, payload }) {
  switch (type) {
    case SET_PENDING:
      return payload;
    default:
      return state;
  }
}
