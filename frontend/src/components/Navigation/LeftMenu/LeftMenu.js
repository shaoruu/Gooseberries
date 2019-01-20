import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Avatar from '@material-ui/core/Avatar'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import ListSubheader from '@material-ui/core/ListSubheader'
import Divider from '@material-ui/core/Divider'
import {
	Message,
	Group,
	Whatshot,
	AddCircle,
	ExpandLess,
	ExpandMore,
	GroupAdd,
	Create
} from '@material-ui/icons'
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
	},
	nested: {
		paddingLeft: theme.spacing.unit * 4
	}
})

class LeftMenu extends Component {
	state = {
		selectedIndex: 1,
		open: false
	}

	toggleCollapse = () => {
		this.setState(prevState => {
			prevState.open = !prevState.open
			return prevState
		})
	}

	render() {
		const { classes } = this.props
		return (
			<Query query={ME_QUERY}>
				{({ loading, error, data }) => {
					if (loading) return null
					if (error) {
						console.error(error)
						return null
					}

					const { image, username } = data.me

					if (!username) return null

					return (
						<div className={classes.root}>
							<List component="div">
								<ListItem
									button
									onClick={() => {
										this.props.history.push(`/profile/${username}`)
									}}
								>
									<ListItemAvatar>
										<Avatar src={image} alt="PROFILE" />
									</ListItemAvatar>
									<ListItemText primary={username} />
								</ListItem>
							</List>
							<Divider />
							<List component="nav">
								<ListItem
									button
									onClick={() => {
										this.props.history.push('/home')
									}}
									selected={this.state.selectedIndex === 1}
								>
									<ListItemIcon>
										<Whatshot />
									</ListItemIcon>
									<ListItemText primary="Feed" />
								</ListItem>
								<ListItem
									button
									onClick={() => {
										this.props.history.push('/messages')
									}}
								>
									<ListItemIcon>
										<Message />
									</ListItemIcon>
									<ListItemText primary="Messages" />
								</ListItem>
								<ListItem
									button
									onClick={() => {
										this.props.history.push('/threads')
									}}
								>
									<ListItemIcon>
										<Group />
									</ListItemIcon>
									<ListItemText primary="Threads" />
								</ListItem>
							</List>
							<Divider />
							<List
								component="nav"
								subheader={<ListSubheader component="div">mAgiC</ListSubheader>}
							>
								<ListItem button onClick={this.toggleCollapse}>
									<ListItemIcon>
										<AddCircle />
									</ListItemIcon>
									<ListItemText inset primary="Create" />
									{this.state.open ? <ExpandLess /> : <ExpandMore />}
								</ListItem>
								<Collapse in={this.state.open} timeout="auto" unmountOnExit>
									<List component="div" disablePadding>
										<ListItem
											button
											className={classes.nested}
											onClick={() => this.props.history.push('/create-post')}
										>
											<ListItemIcon>
												<Create />
											</ListItemIcon>
											<ListItemText inset primary="Create Post" />
										</ListItem>
										<ListItem
											button
											className={classes.nested}
											onClick={() => this.props.history.push('start-thread')}
										>
											<ListItemIcon>
												<GroupAdd />
											</ListItemIcon>
											<ListItemText inset primary="Start Thread" />
										</ListItem>
									</List>
								</Collapse>
							</List>
						</div>
					)
				}}
			</Query>
		)
	}
}

LeftMenu.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles)(LeftMenu))
