import React from 'react'
import { withRouter } from 'react-router-dom'

import classes from './Post.module.css'

export default withRouter(({ history, ...props }) => {
	return (
		<div className={classes.Post_container}>
			<div className={classes.Post_header}>
				<img
					src={props.user.image}
					alt="Profile"
					className={classes.Post_image}
					onClick={() => history.push(`/profile/${props.user.username}`)}
				/>
				<h1>
					<i className={classes.Post_tag}>
						<span
							onClick={() => history.push(`/profile/${props.user.username}`)}
							className={classes.Post_infos}
						>
							{props.user.username}
						</span>{' '}
						>{' '}
						<span
							onClick={() => history.push(`/thread/${props.thread.name}`)}
							className={classes.Post_infos}
						>
							{props.thread.name}
						</span>
					</i>
				</h1>
			</div>

			<div className={classes.Post_body}>
				{props.content.length >= 300 ? <div className={classes.shadow} /> : null}
				<h1 className={classes.Post_title}>{props.title}</h1>
				<div className={classes.Post_content}>{props.content}</div>
			</div>

			<small className={classes.Post_timestamp}>{props.dateCreated}</small>
		</div>
	)
})
