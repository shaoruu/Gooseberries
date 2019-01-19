import React from 'react'

import DrawerOpt from './DrawerOpt/DrawerOpt'
import classes from './DrawerOpts.module.css'
import DrawerDropdown from './DrawerDropdown/DrawerDropdown'

export default props => (
	<ul className={classes.DrawerOpts_container}>
		<DrawerOpt to="/home" title="PROFILE" />
		<DrawerOpt to="/home" title="THREADS" />
		<DrawerDropdown
			items={[
				{
					to: '/createpost',
					title: 'CREATE POST'
				},
				{
					to: '/login',
					title: 'LOGIN'
				}
			]}
		/>
		<DrawerOpt to="/home" title="THREADS" last />
	</ul>
)
