import streams from '../apis/streams'
import history from '../history'
import {
	SIGN_IN,
	SIGN_OUT,
	CREATE_STREAM,
	FETCH_STREAM,
	FETCH_STREAMS,
	EDIT_STREAM,
	DELETE_STREAM
} from './types'

export const signIn = userId => {
	return {
		type: SIGN_IN,
		payload: userId
	}
}

export const signOut = () => {
	return {
		type: SIGN_OUT
	}
}

/* AC for creating a stream */
export const createStream = formValues => async (dispatch, getState) => {
	const { userId } = getState().auth
	const response = await streams.post('/streams', { ...formValues, userId })
	dispatch({
		type: CREATE_STREAM,
		payload: response.data
	})
	//Sending the user back to home page once a stream is created
	history.push('/')
}

/* AC for listing the streams */
export const fetchStreams = () => async dispatch => {
	const response = await streams.get('/streams')
	dispatch({
		type: FETCH_STREAMS,
		payload: response.data
	})
}

/* AC for fetching a single stream by ID */
export const fetchStream = id => async dispatch => {
	const response = await streams.get(`/streams/${id}`)
	dispatch({
		type: FETCH_STREAM,
		payload: response.data
	})
}

/* AC for editing a stream */
export const editStream = (id, updatedValues) => async dispatch => {
	const response = await streams.patch(`/streams/${id}`, updatedValues)

	dispatch({
		type: EDIT_STREAM,
		payload: response.data
	})

	//Sending the user back to home page once a stream is edited
	history.push('/')
}

/*AC for deleting a stream */
export const deleteStream = id => async dispatch => {
	await streams.delete(`/streams/${id}`)

	dispatch({
		type: DELETE_STREAM,
		payload: id
	})

	//Sending the user back to home page once a stream is edited
	history.push('/')
}
