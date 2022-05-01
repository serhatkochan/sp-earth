import { SET_CURRENT_USER } from "../actions/currentUserActions";
import { currentUser } from "../initialValues/currentUser";

export default function currentUserReducer(state = currentUser, { type, payload }) {
  switch (type) {
    case SET_CURRENT_USER:
      return payload;
    default:
      return state;
  }
}
