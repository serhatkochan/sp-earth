import { SELECT_LANGUAGE } from "../actions/languageActions";
import { language } from "../initialValues/language";

export default function languageReducer(state = language, { type, payload }) {
  switch (type) {
    case SELECT_LANGUAGE:
      return payload;
    default:
      return state;
  }
}
