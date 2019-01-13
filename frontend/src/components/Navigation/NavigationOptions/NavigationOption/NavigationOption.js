import React from 'react'
import { NavLink } from 'react-router-dom'

const navigationOption = props => (
	<li>
		<NavLink to={props.link} exact={props.exact}>
			{props.children}
		</NavLink>
	</li>
)

export default navigationOption
