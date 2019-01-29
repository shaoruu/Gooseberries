import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import StartThreadForm from '../../../components/Create/StartThreadForm'
import classes from './StartThread.module.css'
import { AUTH_TOKEN } from '../../../constants'

class StartThread extends Component {
	render() {
		return (
			<>
				{!localStorage.getItem(AUTH_TOKEN) ? this.props.history.push('/home') : null}
				<div className={classes.StartThread_container}>
					<StartThreadForm />
				</div>
			</>
		)
	}
}

export default withRouter(StartThread)
