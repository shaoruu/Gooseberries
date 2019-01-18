import React, { Component } from 'react'
import { Query } from 'react-apollo'

import { POSTS_QUERY } from '../../../graphql/queries'
import Feed from '../../../components/Feed/Feed'
import classes from './Home.module.css'

export default class Home extends Component {
	render() {
		return (
			<div className={classes.Home_container}>
				<Query query={POSTS_QUERY}>
					{({ loading, data }) => {
						if (!data) return null
						return !loading ? <Feed posts={data.posts.edges} /> : null
					}}
				</Query>
			</div>
		)
	}
}
