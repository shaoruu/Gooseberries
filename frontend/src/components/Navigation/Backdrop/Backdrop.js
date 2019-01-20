import React from 'react'

import classes from './Backdrop.module.css'

export default props => {
	let backdropStyles = [classes.Backdrop]
	if (props.show) backdropStyles.push(classes.show)
	return <div className={backdropStyles.join(' ')} onClick={props.onClick} />
}
