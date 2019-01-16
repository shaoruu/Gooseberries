import React, { Component } from 'react'

import classes from './Login.module.css'
import LoginForm from '../../../components/Authentication/LoginForm/LoginForm'

export default class Login extends Component {
	render() {
		return (
			<div className={classes.Login_container}>
				<LoginForm />
			</div>
		)
	}
}
