import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import classes from './Login.module.css'
import LoginForm from '../../../components/Authentication/LoginForm/LoginForm'
import { AUTH_TOKEN } from '../../../constants'

export default class Login extends Component {
	confirmAndHandleData = data => {
		console.log(data)
		const { token } = data.login.user
		localStorage.setItem(AUTH_TOKEN, token)
	}

	render() {
		return (
			<div className={classes.Login_container}>
				{localStorage.getItem(AUTH_TOKEN) ? <Redirect to="/home" /> : null}
				<LoginForm confirmAndHandle={this.confirmAndHandleData} />
			</div>
		)
	}
}
