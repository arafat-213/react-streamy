import React, { Component } from "react"
import { GAPI_KEY } from "../env/GapiKey"

const SCOPE_EMAIL = "email"

class GoogleAuth extends Component {
	// State to track the user authentication
	state = { isSignedIn: null }

	componentDidMount() {
		// Loading only auth api for client from G-API suite
		window.gapi.load("client:auth2", () => {
			// This callback function is called when the library from gapi is loaded
			window.gapi.client
				.init({
					clientId: GAPI_KEY,
					scope: SCOPE_EMAIL,
				})
				.then(() => {
					// then() is called when the connection to gapi library is established with our client  id and scope
					// Getting an instance of auth
					this.auth = window.gapi.auth2.getAuthInstance()

					// Setting the initial value of user's authentication status in state
					this.setState({ isSignedIn: this.auth.isSignedIn.get() })

					//Setting a listener on auth state change
					this.auth.isSignedIn.listen(this.onAuthChange)
				})
		})
	}

	/**
	 * * This function listens to change in authentication status and updates the component state value accordingly
	 */
	onAuthChange = () => {
		this.setState({ isSignedIn: this.auth.isSignedIn.get() })
	}

	renderAuthButton() {
		if (this.state.isSignedIn === null) return null
		else if (this.state.isSignedIn)
			// User is signed in, showing sign out button
			return (
				<button className="ui red google button" onClick={this.onSignOutClick}>
					<i className="google icon" />
					Sign out
				</button>
			)
		// User is not signed in, showing sign in button
		return (
			<button className="ui green google button" onClick={this.onSignInClick}>
				<i className="google icon" />
				Sign in with Google
			</button>
		)
	}

	/*
	 * * Is triggered when user clicks on Sign in with Google button
		Signs in the user
	 */
	onSignInClick = () => {
		this.auth.signIn()
	}

	/*
	 * * Is triggered when user clicks on Sign out button
		Signs out the user
	 */
	onSignOutClick = () => {
		this.auth.signOut()
	}

	render() {
		return <div>{this.renderAuthButton()}</div>
	}
}

export default GoogleAuth
