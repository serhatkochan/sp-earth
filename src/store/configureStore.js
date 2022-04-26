import { legacy_createStore as createStore} from 'redux'
import rootReducer from "./rootReducer";
import { devToolsEnhancer } from "redux-devtools-extension"

export default function configureStore() {
    return createStore(rootReducer, devToolsEnhancer())
}