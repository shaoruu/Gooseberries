import React from 'react'
import { withRouter } from 'react-router-dom'

import logo from '../../../assets/logo.png'
import classes from './Logo.module.css'

export default withRouter(({ history }) => (
	<div
		className={classes.Logo_container}
		onClick={() => {
			history.push('/home')
		}}
	>
		<img src={logo} alt="LOGO" />
		<h1>GB</h1>
	</div>
))
