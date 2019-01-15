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
					{({ loading, error, data }) => {
						if (loading) return <h1>LOADING...</h1>
						if (error) return <h1>AN ERROR OCCURRED!</h1>
						console.log(data)
						return <Feed posts={data.posts.edges} />
					}}
				</Query>
			</div>
		)
	}
}
