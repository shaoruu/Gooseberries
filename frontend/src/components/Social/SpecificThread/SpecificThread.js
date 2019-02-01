import React, { Component } from 'react'
import Avatar from '@material-ui/core/Avatar'
import {
	withStyles,
	Button,
	GridList,
	GridListTile,
	GridListTileBar,
	IconButton
} from '@material-ui/core'
import { Stars } from '@material-ui/icons'
import { withRouter } from 'react-router-dom'

import classes from './SpecificThread.module.css'
import { Mutation, Query } from 'react-apollo'
import { JOIN_THREAD_MUTATION, LEAVE_THREAD_MUTATION } from '../../../graphql/mutations'
import { ME_QUERY, THREAD_QUERY } from '../../../graphql/queries'
import Feed from '../../Feed/Feed'

const styles = {
	avatar: {
		margin: 10
	},
	bigAvatar: {
		background: '#eeeeee',
		width: '100%',
		height: '100%'
	},
	button: {
		color: '#eeeeee',
		backgroundColor: '#222831',
		'&:hover': {
			backgroundColor: '#01ACB5'
		},
		'&:active': {
			backgroundColor: '#01ACB5'
		}
	},
	gridList: {
		width: 500,
		height: 450
	},
	icon: {
		color: '#eeeeee'
	},
	tile: {
		height: '1rem'
	}
}

class SpecificThread extends Component {
	state = { selectedIndex: 0, bannerHovered: false, avatarHover: false }

	// TODO: HANDLE THREAD CHANGES

	handleClick = index => {
		this.setState({ selectedIndex: index })
	}

	handleBannerHover = () => {
		this.setState({ bannerHovered: true })
	}

	handleBannerLeave = () => {
		this.setState({ bannerHovered: false })
	}

	handleAvatarHover = () => {
		this.setState({ avatarHover: true })
	}

	handleAvatarLeave = () => {
		this.setState({ avatarHover: false })
	}

	handleCreatePost = threadName => {
		this.props.history.push({
			pathname: '/create-post',
			state: { threadName }
		})
	}

	render() {
		const styles = this.props.classes

		return (
			<Query query={THREAD_QUERY} variables={{ name: this.props.threadName }}>
				{({ loading, error, data }) => {
					if (loading) return <h1>LOADING</h1>
					if (error) {
						console.error(error)
						return null
					}

					let {
						name,
						description,
						threadImage,
						threadBanner,
						memberships: { edges: members },
						posts: { edges: posts },
						admins
					} = data.thread

					return (
						<Query query={ME_QUERY} fetchPolicy="network-only">
							{({ loading, error, data }) => {
								if (loading) return null

								let me = {},
									isJoined = false,
									isAdmin = false

								if (error) {
									if (!error.message.includes('Not Logged in!')) return null
								} else {
									console.log('lol')
									me = data.me
									console.log(me)

									isJoined =
										me.threadMemberships &&
										me.threadMemberships.edges.some(
											ele => ele.node.thread.name === name
										)

									isAdmin = admins.some(ele => ele.user.username === me.username)
								}

								let nameStyle = [classes.SpecificThread_name],
									activesStyle = [classes.SpecificThread_actives],
									mainContext = null

								switch (this.state.selectedIndex) {
									case 0:
										mainContext = (
											<div className={classes.ThreadContent_container}>
												<div className={classes.BasicInfo_container}>
													<h1>What is "{name}"</h1>
													<div
														className={classes.SpecificThread_description}
													>
														{description}
													</div>
												</div>
												<Feed posts={posts} />
											</div>
										)
										nameStyle.push(classes.selected)
										break
									case 1:
										mainContext = (
											<div className={classes.MemberList_container}>
												<GridList
													cellHeight={180}
													className={styles.gridList}
												>
													{members.map(tile => (
														<GridListTile
															key={tile.node.user.username}
															onClick={() =>
																this.props.history.push(
																	`/profile/${tile.node.user.username}`
																)
															}
															style={{ cursor: 'pointer' }}
														>
															<img
																src={tile.node.user.image}
																alt={tile.node.user.username}
															/>
															<GridListTileBar
																title={tile.node.user.username}
																subtitle={
																	tile.node.nickname ? (
																		<span>
																			AKA {tile.node.nickname}
																		</span>
																	) : null
																}
																actionIcon={
																	tile.node.isAdmin ? (
																		<IconButton className={styles.icon}>
																			<Stars />
																		</IconButton>
																	) : null
																}
															/>
														</GridListTile>
													))}
												</GridList>
											</div>
										)
										activesStyle.push(classes.selected)
										break
									default:
										break
								}

								return (
									<div className={classes.SpecificThread_container}>
										<div
											className={classes.ThreadBanner}
											style={{
												backgroundImage: `url(${threadBanner})`,
												cursor: isAdmin ? 'pointer' : 'auto'
											}}
										>
											<div
												className={classes.Avatar_container}
												// onMouseEnter={this.handleAvatarHover}
												// onMouseLeave={this.handleAvatarLeave}
											>
												<Avatar
													src={threadImage}
													alt="Thread Profile"
													className={styles.bigAvatar}
												/>
												{/* <div
													className={classes.AvatarChangeText}
													style={
														this.state.avatarHover && isAdmin
															? null
															: { display: 'none' }
													}
												>
													Edit
												</div> */}
											</div>
											{/* <div
												onMouseEnter={this.handleBannerHover}
												onMouseLeave={this.handleBannerLeave}
												style={{
													gridColumn: '1/-1',
													width: '100%',
													height: '100%',
													position: 'relative'
												}}
											>
												{this.state.bannerHovered && isAdmin ? (
													<>
														<Dropzone
															onDrop={this.handleBannerDrop}
															multiple={false}
															accept="image/jpeg, image/png, image/jpg"
														>
															{({ getRootProps, getInputProps }) => {
																return (
																	<div
																		{...getRootProps()}
																		style={{
																			width: '100%',
																			height: '100%'
																		}}
																	>
																		<input {...getInputProps()} />
																	</div>
																)
															}}
														</Dropzone>
														<div className={classes.EditThread_container}>
															<div className={classes.EditThreadTitle}>
																Click to edit thread
															</div>
															<div>
																<Edit />
															</div>
														</div>
														{this.state.isBannerDropped ? (
															<div>DROPPED</div>
														) : null}
													</>
												) : null}
											</div> */}
										</div>

										<div className={classes.CurrentInfo_container}>
											<div
												className={nameStyle.join(' ')}
												onClick={() => this.handleClick(0)}
											>
												{name}
											</div>
											<div
												className={activesStyle.join(' ')}
												onClick={() => this.handleClick(1)}
											>
												<h1>Members</h1>
												<p>{members.length}</p>
											</div>
											{me.username && isJoined ? (
												<div className={classes.CreatePostButton}>
													<Button
														variant="outlined"
														onClick={() => this.handleCreatePost(name)}
													>
														Create Post
													</Button>
												</div>
											) : null}
											{me.username ? (
												isJoined ? (
													<Mutation
														mutation={LEAVE_THREAD_MUTATION}
														update={cache => {
															const { me: tempMe } = cache.readQuery({
																query: ME_QUERY
															})
															tempMe.threadMemberships.edges.splice(
																tempMe.threadMemberships.edges.findIndex(
																	ele => ele.node.thread.name === name
																),
																1
															)
															members.splice(
																members.findIndex(
																	ele => ele.username === tempMe.username
																)
															)
															cache.writeQuery({
																query: ME_QUERY,
																data: {
																	me: {
																		...tempMe
																	}
																}
															})
														}}
													>
														{(leaveThread, { loading, error, data }) => {
															if (error) {
																console.error(error)
																return
															}

															return (
																!loading && (
																	<div className={classes.Button}>
																		<Button
																			variant="contained"
																			color="primary"
																			className={styles.button}
																			onClick={() =>
																				leaveThread({
																					variables: {
																						threadName: name
																					}
																				})
																			}
																		>
																			Leave Thread
																		</Button>
																	</div>
																)
															)
														}}
													</Mutation>
												) : (
													<Mutation
														mutation={JOIN_THREAD_MUTATION}
														update={(
															cache,
															{
																data: {
																	joinThread: { membership }
																}
															}
														) => {
															const { me: tempMe } = cache.readQuery({
																query: ME_QUERY
															})
															tempMe.threadMemberships.edges.push({
																__typename: 'ThreadMemberNodeEdge',
																node: {
																	thread: {
																		name: membership.thread.name,
																		__typename: 'ThreadNode'
																	},
																	__typename: 'ThreadMemberNode'
																}
															})
															console.log(membership)
															members.push({ node: membership })
															cache.writeQuery({
																query: ME_QUERY,
																data: {
																	__typename: 'UserNode',
																	me: {
																		...tempMe
																	}
																}
															})
														}}
													>
														{(joinThread, { loading, error, data }) => {
															if (error) {
																console.error(error)
																return
															}

															return (
																!loading && (
																	<div className={classes.Button}>
																		<Button
																			variant="contained"
																			color="primary"
																			className={styles.button}
																			onClick={() =>
																				joinThread({
																					variables: {
																						threadName: name
																					}
																				})
																			}
																		>
																			Join Thread
																		</Button>
																	</div>
																)
															)
														}}
													</Mutation>
												)
											) : null}
										</div>

										{mainContext}
									</div>
								)
							}}
						</Query>
					)
				}}
			</Query>
		)
	}
}

export default withRouter(withStyles(styles)(SpecificThread))
