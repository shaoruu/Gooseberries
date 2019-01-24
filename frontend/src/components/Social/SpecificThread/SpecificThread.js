import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import { withStyles } from '@material-ui/core'

import classes from './SpecificThread.module.css'

const styles = {
	avatar: {
		margin: 10
	},
	bigAvatar: {
		width: '100%',
		height: '100%'
	}
}

const specificThread = props => {
	const styles = props.classes
	const {
		name,
		description,
		threadImage,
		threadBanner,
		memberships: { edges: members },
		posts: { edges: posts },
		admins
	} = props.thread
	console.log(threadBanner)
	return (
		<div className={classes.SpecificThread_container}>
			<div
				className={classes.ThreadBanner}
				style={{ backgroundImage: `url(${threadBanner})` }}
			>
				<div className={classes.Avatar_container}>
					<Avatar
						src={threadImage}
						alt="Thread Profile"
						className={styles.bigAvatar}
					/>
				</div>
			</div>
			<div className={classes.ThreadInfo_container}>
				<div className={classes.CurrentInfo_container} />
				<div className={classes.BasicInfo_container}>
					<div className={classes.SpecificThread_name}>{name}</div>
					<div className={classes.SpecificThread_description}>{description}</div>
				</div>
			</div>
		</div>
	)
}

export default withStyles(styles)(specificThread)
