import React from 'react'

import logo from '../../../assets/logo.png'
import classes from './Logo.module.css'

export default () => (
	<div className={classes.Logo_container}>
		<img src={logo} alt="LOGO" />
		<h1>GB</h1>
	</div>
)
