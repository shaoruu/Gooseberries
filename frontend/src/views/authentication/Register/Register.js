import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import classes from './Register.module.css'
import RegisterForm from '../../../components/Authentication/RegisterForm/RegisterForm'
import { AUTH_TOKEN } from '../../../constants'

export default class Login extends Component {
	render() {
		return (
			<div className={classes.Register_container}>
				{localStorage.getItem(AUTH_TOKEN) ? <Redirect push to="/home" /> : null}
				<RegisterForm />
			</div>
		)
	}
}
