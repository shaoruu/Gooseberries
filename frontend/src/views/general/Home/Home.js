import React, { Component } from 'react'
import { Query } from 'react-apollo'

import { POSTS_QUERY } from '../../../graphql/queries'
import Feed from '../../../components/Feed/Feed'
import classes from './Home.module.css'
import LeftMenu from '../../../components/Navigation/LeftMenu/LeftMenu'
import RightMenu from '../../../components/Navigation/RightMenu/RightMenu'

export default class Home extends Component {
	render() {
		return (
			<div className={classes.Home_container}>
				<Query query={POSTS_QUERY}>
					{({ loading, data }) => {
						if (!data) return null
						return !loading ? (
							<>
								<LeftMenu />
								<Feed posts={data.posts.edges} />
								<RightMenu />
							</>
						) : null
					}}
				</Query>
			</div>
		)
	}
}
