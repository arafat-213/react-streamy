import React from "react"
import { Link } from "react-router-dom"

const Header = () => {
	return (
		<div className="ui secondary pointing menu">
			<Link to="/" className="item">
				Streamer
			</Link>
			<div className="right menu">
				<Link to="/" className="item">
					All streams
				</Link>
				<Link to="/login" className="ui button">
					Log in with Google
				</Link>
			</div>
		</div>
	)
}

export default Header
