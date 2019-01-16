import React from 'react'
import { Mutation, Query } from 'react-apollo'
import { Redirect, NavLink } from 'react-router-dom'
import { Formik } from 'formik'

import classes from './LoginForm.module.css'
import Loading from '../../Others/Loading/Loading'
import Error from '../../Others/Error/Error'
import { ME_QUERY } from '../../../graphql/queries'
import { LOGIN_MUTATION, LOGIN_SCHEMA } from '../../../graphql/mutations'

export default props => {
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
					if (error) return <Error message={'error'} />

					if (data) {
						props.confirmAndHandle(data)
						return <Redirect to="/home" />
					}

					return (
						<div>
							<Formik
								initialValues={{ username: '', password: '' }}
								validationSchema={LOGIN_SCHEMA}
								onSubmit={(values, { resetForm, setErrors }) => {
									loginUser({
										variables: {
											username: values.username,
											password: values.password
										}
									})
								}}
								render={({
									values,
									errors,
									touched,
									handleChange,
									handleBlur,
									handleSubmit
								}) => {
									return (
										<form onSubmit={handleSubmit} className={classes.Form}>
											<div className={classes.LoginForm_title}>LOG IN</div>
											<div className={classes.LoginForm_inputfield}>
												<span className={classes.label}>Username</span>
												<input
													type="Text"
													id="username"
													name="username"
													placeholder="username..."
													onChange={handleChange}
													// TODO Implement onBlur
													onBlur={handleBlur}
													value={values.username}
												/>
												{touched.username && errors && errors.username && (
													<p>{errors.username}</p>
												)}
											</div>

											<div className={classes.LoginForm_inputfield}>
												<span className={classes.label}>Password</span>
												<input
													type="Password"
													id="password"
													name="password"
													placeholder="password..."
													onChange={handleChange}
													// TODO Implement onBlur
													onBlur={handleBlur}
													value={values.password}
												/>
												{touched.password && errors && errors.password && (
													<p>{errors.password}</p>
												)}
											</div>

											<div className={classes.LoginForm_submission_container}>
												<NavLink to="/register">
													<small>Don't have an account?</small>
												</NavLink>
												<button
													type="Submit"
													className={classes.LoginForm_submit_btn}
												>
													Login
												</button>
											</div>
										</form>
									)
								}}
							/>
						</div>
					)
				}}
			</Mutation>
		</div>
	)
}
