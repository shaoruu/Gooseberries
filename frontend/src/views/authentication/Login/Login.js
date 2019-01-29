import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import classes from './Login.module.css'
import LoginForm from '../../../components/Authentication/LoginForm/LoginForm'
import { AUTH_TOKEN } from '../../../constants'

export default withRouter(
	class Login extends Component {
		confirmAndHandleData = data => {
			// console.log(data)
			const { token } = data.login.user
			localStorage.setItem(AUTH_TOKEN, token)
		}

		render() {
			return (
				<>
					{localStorage.getItem(AUTH_TOKEN)
						? this.props.history.push('/home')
						: null}
					<div className={classes.Login_container}>
						<LoginForm confirmAndHandle={this.confirmAndHandleData} />
					</div>
				</>
			)
		}
	}
)
