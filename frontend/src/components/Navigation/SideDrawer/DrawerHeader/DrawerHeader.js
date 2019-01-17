import React from 'react'

import classes from './DrawerHeader.module.css'

export default props => (
	<ApolloConsumer>
		{client => {
			let userInfo = null

			try {
				userInfo = client.cache.readQuery({ query: ME_QUERY })
			} catch (e) {
				return (
					<h1>
						<i>GOOSEBERRIES</i>
					</h1>
				)
			}

			const { image, username } = userInfo.me

			return (
				<div className={classes.DrawerHeader_container}>
					{image ? (
						<img src={image} alt="Profile" className={classes.DrawerProfile} />
					) : null}
					{username ? (
						<h1 style={{ textAlign: 'center' }}>{username}</h1>
					) : (
						<h1>
							<i>GOOSEBERRIES</i>
						</h1>
					)}
				</div>
			)
		}}
	</ApolloConsumer>
)
