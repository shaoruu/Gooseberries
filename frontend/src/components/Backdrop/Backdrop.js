import React from 'react'

import classes from './Backdrop.module.css'

export default props => {
	let backdropStyles = [classes.Backdrop]
	backdropStyles.push(props.show ? classes.show : classes.close)
	return <div className={backdropStyles.join(' ')} onClick={props.onClick} />
}
