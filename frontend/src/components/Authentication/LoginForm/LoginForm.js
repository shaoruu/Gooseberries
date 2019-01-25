import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { Redirect, NavLink, withRouter } from 'react-router-dom'
import { Formik } from 'formik'
import {
	Grid,
	TextField,
	FormControl,
	FormHelperText,
	Button,
	withStyles
} from '@material-ui/core'

import classes from './LoginForm.module.css'
import Loading from '../../Others/Loading/Loading'
import { ME_QUERY } from '../../../graphql/queries'
import { LOGIN_MUTATION, LOGIN_SCHEMA } from '../../../graphql/mutations'
import PrevPathContext from '../../../contexts/RouterContext'

const styles = theme => ({
	loginButton: {
		color: theme.palette.getContrastText('#009f9d'),
		backgroundColor: '#009f9d',
		'&:hover': {
			backgroundColor: '#3fbac2'
		},
		'&:active': {
			backgroundColor: '#3fbac2'
		}
	},
	cssFocused: {},
	cssOutlinedInput: {
		'&$cssFocused $notchedOutline': {
			borderColor: '#00adb5'
		}
	},
	cssLabel: {
		'&$cssFocused': {
			color: '#00adb5'
		}
	},
	notchedOutline: {}
})

class LoginForm extends Component {
	render() {
		const styles = this.props.classes

		const { props } = this

		return (
			<div className={classes.LoginForm_container}>
				<Mutation
					mutation={LOGIN_MUTATION}
					update={(cache, { data: { login } }) => {
						cache.writeQuery({
							query: ME_QUERY,
							data: {
								me: {
									...login.user
								}
							}
						})
					}}
				>
					{(loginUser, { loading, error, data }) => {
						if (loading) return <Loading />

						if (data) {
							props.confirmAndHandle(data)
							console.log(this.context)
							if (!this.context) props.history.push('/home')
							else if (this.context === '/logout' || this.context === '/login')
								props.history.go(-2)
							else props.history.goBack()
						}

						return (
							<Formik
								initialValues={{ username: '', password: '' }}
								validationSchema={LOGIN_SCHEMA}
								onSubmit={(values, { setSubmitting }) => {
									loginUser({
										variables: {
											username: values.username.toLowerCase(),
											password: values.password
										}
									})
									setSubmitting(false)
								}}
								render={({
									values,
									errors,
									touched,
									handleChange,
									handleBlur,
									handleSubmit,
									isSubmitting
								}) => {
									return (
										<form onSubmit={handleSubmit} className={classes.Form}>
											<div className={classes.LoginForm_title}>
												Log In to Your Account
											</div>
											<div className={classes.LoginForm_inputfield_container}>
												<Grid
													container
													spacing={16}
													alignItems="center"
													justify="center"
												>
													<Grid item xs="auto">
														<FormControl aria-describedby="error-text">
															<TextField
																required
																id="username"
																name="username"
																value={values.username}
																label="Username"
																onChange={handleChange}
																onBlur={handleBlur}
																InputLabelProps={{
																	classes: {
																		root: styles.cssLabel,
																		focused: styles.cssFocused
																	}
																}}
																InputProps={{
																	classes: {
																		root: styles.cssOutlinedInput,
																		focused: styles.cssFocused,
																		notchedOutline:
																			styles.notchedOutline
																	}
																}}
																className={classes.LoginForm_textfield}
																variant="outlined"
															/>
															{(touched.username &&
																errors &&
																errors.username && (
																	<FormHelperText id="error-text" error>
																		{errors.username}
																	</FormHelperText>
																)) ||
																(error &&
																	error.message.includes(
																		'credentials'
																	) && (
																		<FormHelperText
																			id="error-text"
																			error
																		>
																			Invalid username or password.
																		</FormHelperText>
																	))}
														</FormControl>
													</Grid>
													<Grid item xs="auto">
														<FormControl aria-describedby="error-text">
															<TextField
																required
																id="password"
																name="password"
																value={values.password}
																type="password"
																autoComplete="current-password"
																label="Password"
																onChange={handleChange}
																onBlur={handleBlur}
																InputLabelProps={{
																	classes: {
																		root: styles.cssLabel,
																		focused: styles.cssFocused
																	}
																}}
																InputProps={{
																	classes: {
																		root: styles.cssOutlinedInput,
																		focused: styles.cssFocused,
																		notchedOutline:
																			styles.notchedOutline
																	}
																}}
																className={classes.LoginForm_textfield}
																variant="outlined"
															/>
															{touched.password &&
																errors &&
																errors.password && (
																	<FormHelperText id="error-text" error>
																		{errors.password}
																	</FormHelperText>
																)}
														</FormControl>
													</Grid>
												</Grid>
											</div>

											<Grid
												container
												spacing={16}
												alignItems="center"
												justify="center"
											>
												<Grid item xs={5}>
													<div className={classes.register}>
														<NavLink to="/register">
															<small>Don't have an account?</small>
														</NavLink>
													</div>
												</Grid>
												<Grid item xs={2}>
													<Button
														type="submit"
														variant="contained"
														color="primary"
														className={styles.loginButton}
														disabled={
															isSubmitting ||
															!!(errors.username && touched.username) ||
															!!(errors.password && touched.password)
														}
													>
														Login
													</Button>
												</Grid>
											</Grid>
										</form>
									)
								}}
							/>
						)
					}}
				</Mutation>
			</div>
		)
	}
}

LoginForm.contextType = PrevPathContext

export default withRouter(withStyles(styles)(LoginForm))
