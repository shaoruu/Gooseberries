import React from 'react'

import classes from './Logo.module.css'
import Logo from '../../../../assets/logo.png'

export default () => (
	<div className={classes.Logo}>
		<img src={Logo} alt="Logo" />
		<p>Gooseberries</p>
	</div>
)
