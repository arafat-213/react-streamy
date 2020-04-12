import { combineReducers } from "redux"
import authReducer from "./authReducer"

export default combineReducers({
	// TODO: Add the reducers here
	auth: authReducer,
})
