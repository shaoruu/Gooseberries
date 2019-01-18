import React from 'react'
import { Redirect, NavLink } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import { Formik } from 'formik'
import {
	withStyles,
	Grid,
	FormControl,
	TextField,
	Button,
	FormHelperText
} from '@material-ui/core'

import { REGISTER_SCHEMA, REGISTER_MUTATION } from '../../../graphql/mutations'
import classes from './RegisterForm.module.css'
import Loading from '../../Others/Loading/Loading'

const styles = theme => ({
	registerButton: {
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
	notchedOutline: {},
	cssOutlinedInput: {
		'&$cssFocused $notchedOutline': {
			borderColor: '#00adb5'
		}
	},
	cssLabel: {
		'&$cssFocused': {
			color: '#00adb5'
		}
	}
})

const registerForm = props => {
	const styles = props.classes

	return (
		<div className={classes.RegisterForm_container}>
			<Mutation mutation={REGISTER_MUTATION}>
				{(registerUser, { loading, error, data }) => {
					if (loading) return <Loading />
					if (data) return <Redirect push to="/login" />
					if (error) console.log(error.message)

					return (
						<Formik
							initialValues={{
								username: '',
								password: '',
								email: '',
								dateOfBirth: ''
							}}
							validationSchema={REGISTER_SCHEMA}
							onSubmit={(values, { setSubmitting }) => {
								delete values.passwordConfirm

								// TODO Create a sessioned user confirmation link for email confirmation
								let temp = 'https://www.youtube.com/watch?v=1N8zRJpfnMM'

								registerUser({
									variables: { ...values, confirmationLink: temp }
								})
								// console.log(values)
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
									<form
										onSubmit={e => {
											e.preventDefault()
											handleSubmit(e)
										}}
									>
										<div className={classes.RegisterForm_title}>
											Register an Account
										</div>
										<div className={classes.RegisterForm_inputfield_container}>
											<Grid
												container
												spacing={16}
												alignItems="center"
												justify="center"
											>
												{/* <Grid item xs={6}>
													<FormControl aria-describedby="error-text">
														<TextField
															required
															id="firstName"
															name="firstName"
															value={values.firstName}
															label="First Name"
															onChange={handleChange}
															onBlur={handleBlur}
															variant="outlined"
														/>
													</FormControl>
												</Grid>
												<Grid item xs={6}>
													<FormControl aria-describedby="error-text">
														<TextField
															required
															id="lastName"
															name="lastName"
															value={values.lastName}
															label="Last Name"
															onChange={handleChange}
															onBlur={handleBlur}
															variant="outlined"
														/>
													</FormControl>
												</Grid> */}
												<Grid item xs={12}>
													<FormControl
														aria-describedby="error-text"
														fullWidth
													>
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
																	notchedOutline: styles.notchedOutline
																}
															}}
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
																error.message.includes('Username') && (
																	<FormHelperText id="error-text" error>
																		Username already taken.
																	</FormHelperText>
																))}
													</FormControl>
												</Grid>
												<Grid item xs={12}>
													<FormControl
														aria-describedby="error-text"
														fullWidth
													>
														<TextField
															required
															id="email"
															name="email"
															value={values.email}
															label="Email"
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
																	notchedOutline: styles.notchedOutline
																}
															}}
															variant="outlined"
														/>
														{(touched.email && errors && errors.email && (
															<FormHelperText id="error-text" error>
																{errors.email}
															</FormHelperText>
														)) ||
															(error && error.message.includes('Email') && (
																<FormHelperText id="error-text" error>
																	Email already taken.
																</FormHelperText>
															))}
													</FormControl>
												</Grid>
												<Grid item xs={6}>
													<FormControl
														aria-describedby="error-text"
														fullWidth
													>
														<TextField
															required
															id="password"
															name="password"
															type="password"
															value={values.password}
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
																	notchedOutline: styles.notchedOutline
																}
															}}
															variant="outlined"
														/>
														{touched.password && errors && errors.password && (
															<FormHelperText id="error-text" error>
																{errors.password}
															</FormHelperText>
														)}
													</FormControl>
												</Grid>
												<Grid item xs={6}>
													<FormControl
														aria-describedby="error-text"
														fullWidth
													>
														<TextField
															required
															id="passwordConfirm"
															name="passwordConfirm"
															type="password"
															label="Confirm Password"
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
																	notchedOutline: styles.notchedOutline
																}
															}}
															variant="outlined"
														/>
														{touched.passwordConfirm &&
															errors &&
															errors.passwordConfirm && (
																<FormHelperText id="error-text" error>
																	{errors.passwordConfirm}
																</FormHelperText>
															)}
													</FormControl>
												</Grid>
												<Grid item xs={12}>
													<FormControl
														aria-describedby="error-text"
														fullWidth
														margin="normal"
													>
														<TextField
															required
															id="date"
															label="Birthday"
															type="date"
															name="dateOfBirth"
															value={values.dateOfBirth}
															onChange={handleChange}
															onBlur={handleBlur}
															InputLabelProps={{
																classes: {
																	root: styles.cssLabel,
																	focused: styles.cssFocused
																},
																shrink: true
															}}
															InputProps={{
																classes: {
																	root: styles.cssOutlinedInput,
																	focused: styles.cssFocused
																}
															}}
														/>
														{touched.dateOfBirth &&
															errors &&
															errors.dateOfBirth && (
																<FormHelperText id="error-text" error>
																	{errors.dateOfBirth}
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
											<Grid item xs={7}>
												<div className={classes.register}>
													<NavLink to="/login">
														<small>Already have an account?</small>
													</NavLink>
												</div>
											</Grid>
											<Grid item xs={4}>
												<Button
													type="submit"
													variant="contained"
													color="primary"
													className={styles.registerButton}
													disabled={
														isSubmitting ||
														!!(errors.username && touched.username) ||
														!!(errors.password && touched.password)
													}
												>
													Continue
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

export default withStyles(styles)(registerForm)
