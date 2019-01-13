import React from 'react'
import { Redirect } from 'react-router-dom'
import { AUTH_TOKEN } from '../../constants'

export default props => {
	let isLoggedIn = localStorage.getItem(AUTH_TOKEN)

	if (!isLoggedIn) return <div>{props.children}</div>
	else return <Redirect to={props.elseRedirect} />
}
