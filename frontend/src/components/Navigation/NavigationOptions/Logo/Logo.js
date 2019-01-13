import React from 'react'
import { NavLink } from 'react-router-dom'

import classes from './Logo.module.css'
import Logo from '../../../../assets/logo.png'

export default props => (
	<NavLink to="/home" className={classes.Logo}>
		<img src={Logo} alt="Logo" />
		<p>Gooseberries</p>
	</NavLink>
)
