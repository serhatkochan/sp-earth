import { combineReducers  } from 'redux'
import languageReducer from "./reducers/languageReducer";
const rootReducer = combineReducers ({
    language:languageReducer
})
export default rootReducer;