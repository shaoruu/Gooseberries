import React from 'react'
import NavOpt from './NavOpt/NavOpt'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classes from './NavOpts.module.css'

export default props => (
	<nav className={classes.NavOpts_container}>
		<ul>
			<NavOpt link="/home">
				<FontAwesomeIcon icon="home" style={{ color: '#eeeeee' }} size="2x" />
			</NavOpt>
			<NavOpt link={'/profile/'}>
				<FontAwesomeIcon icon="user" style={{ color: '#eeeeee' }} size="2x" />
			</NavOpt>
			<NavOpt link="/home">
				<FontAwesomeIcon icon="cog" style={{ color: '#eeeeee' }} size="2x" />
			</NavOpt>
		</ul>
	</nav>
)
