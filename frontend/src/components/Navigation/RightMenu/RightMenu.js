import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { List, ListItem, ListItemText } from '@material-ui/core'
import { Query } from 'react-apollo'
import { withRouter } from 'react-router-dom'

import { SIMPLE_THREADS_QUERY, SIMPLE_ME_QUERY } from '../../../graphql/queries'

const styles = theme => ({
	root: {
		boxSizing: 'border-box',
		position: 'sticky',
		gridColumn: '12/15',
		padding: '2rem',
		top: '2rem',
		maxHeight: '20rem'
	}
})

class RightMenu extends Component {
	state = {}

	render() {
		const { classes } = this.props

		return (
			<Query query={SIMPLE_THREADS_QUERY} variables={{ isOpen: true }}>
				{({ client, loading, error, data }) => {
					if (loading) return null
					if (error) {
						console.error(error)
						return null
					}

					const { username: isLoggedIn } = client.readQuery({
						query: SIMPLE_ME_QUERY
					}).me
					if (!isLoggedIn) return null

					const { edges: nodes } = data.threads

					const threadList = nodes.map(ele => {
						const { id, name } = ele.node
						return (
							<ListItem
								key={id}
								button
								onClick={() => {
									this.props.history.push(`/thread/${name}`)
								}}
							>
								<ListItemText primary={name} />
							</ListItem>
						)
					})

					return (
						<div className={classes.root}>
							<List component="div">{threadList}</List>
						</div>
					)
				}}
			</Query>
		)
	}
}

export default withRouter(withStyles(styles)(RightMenu))
