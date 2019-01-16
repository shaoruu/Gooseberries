import React from 'react'
import classes from './Error.module.css'

export default props => (
	<div className={classes.Error_container}>
		<div>{props.message}</div>
	</div>
)
