import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Avatar from '@material-ui/core/Avatar'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import InboxIcon from '@material-ui/icons/Inbox'
import DraftsIcon from '@material-ui/icons/Drafts'
import { Query } from 'react-apollo'
import { withRouter } from 'react-router-dom'

import { ME_QUERY } from '../../../graphql/queries'

const styles = theme => ({
	root: {
		// width: '100%',
		boxSizing: 'border-box',
		position: 'sticky',
		gridColumn: '1/4',
		padding: '2rem',
		top: '2rem',
		maxHeight: '20rem'
		// maxWidth: 360,
	}
})

function ListItemLink(props) {
	return <ListItem button component="a" {...props} />
}

const leftMenu = props => {
	const { classes } = props
	return (
		<Query query={ME_QUERY}>
			{({ loading, error, data }) => {
				if (loading) return null

				const { image, username } = data.me

				if (!username) return null

				return (
					<div className={classes.root}>
						<List component="nav">
							<ListItem
								button
								onClick={() => {
									props.history.push(`/profile/${username}`)
								}}
							>
								<ListItemAvatar>
									<Avatar src={image} alt="PROFILE" />
								</ListItemAvatar>
								<ListItemText primary={username} />
							</ListItem>
							<ListItem button>
								<ListItemIcon>
									<InboxIcon />
								</ListItemIcon>
								<ListItemText primary="Inbox" />
							</ListItem>
							<ListItem button>
								<ListItemIcon>
									<DraftsIcon />
								</ListItemIcon>
								<ListItemText primary="Drafts" />
							</ListItem>
						</List>
						<Divider />
						<List component="nav">
							<ListItem button>
								<ListItemText primary="Trash" />
							</ListItem>
							<ListItemLink href="#simple-list">
								<ListItemText primary="Spam" />
							</ListItemLink>
						</List>
					</div>
				)
			}}
		</Query>
	)
}

leftMenu.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles)(leftMenu))
