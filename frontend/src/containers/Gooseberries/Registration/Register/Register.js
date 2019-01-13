import React, { Component } from 'react'
import { Formik } from 'formik'
import gql from 'graphql-tag'
import * as Yup from 'yup'
import NoneLogin from '../../../../hoc/NoneLogin/NoneLogin'
import { Redirect } from 'react-router-dom'
import { Mutation } from 'react-apollo'

const REGISTER_SCHEMA = Yup.object().shape({
	username: Yup.string().required('Username is required.'),
	password: Yup.string()
		.min(9, 'Password must be longer than 8 characters.')
		.required('Password is required.'),
	email: Yup.string().required('Email is required.'),
	dateOfBirth: Yup.date().required('Date of birth is required.')
})

const REGISTER_MUTATION = gql`
	mutation Register(
		$username: String!
		$password: String!
		$email: String!
		$dateOfBirth: Date!
	) {
		register(
			input: {
				username: $username
				password: $password
				email: $email
				dateOfBirth: $dateOfBirth
			}
		) {
			user {
				username
			}
		}
	}
`

export default class Register extends Component {
	render() {
		return (
			<NoneLogin elseRedirect="/home">
				<h1>Sign Up</h1>
				<Mutation mutation={REGISTER_MUTATION}>
					{(registerUser, { loading, error, data }) => {
						if (loading) return <p>Loading...</p>
						if (error) return <p>Error</p>
						if (data) {
							return (
								<Redirect
									to={{
										pathname: '/register/moreinfo',
										state: { username: data.register.user.username }
									}}
								/>
							)
						}
						return (
							<div>
								<Formik
									initialValues={{
										username: '',
										password: '',
										email: '',
										dateOfBirth: ''
									}}
									validationSchema={REGISTER_SCHEMA}
									onSubmit={values => {
										registerUser({
											variables: {
												username: values.username,
												password: values.password,
												email: values.email,
												dateOfBirth: values.dateOfBirth
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
									}) => (
										<form onSubmit={handleSubmit}>
											<input
												type="Text"
												name="username"
												onChange={handleChange}
												onBlur={handleBlur}
												value={values.username}
											/>
											{touched.username && errors && errors.username && (
												<h1>{errors.username}</h1>
											)}
											<input
												type="Email"
												name="email"
												onChange={handleChange}
												onBlur={handleBlur}
												value={values.email}
											/>
											{touched.email && errors && errors.email && (
												<h1>{errors.email}</h1>
											)}
											<input
												type="Password"
												name="password"
												onChange={handleChange}
												onBlur={handleBlur}
												value={values.password}
											/>
											{touched.password && errors && errors.password && (
												<h1>{errors.password}</h1>
											)}
											<input
												type="Date"
												name="dateOfBirth"
												onChange={handleChange}
												onBlur={handleBlur}
												value={values.dateOfBirth}
											/>
											{touched.dateOfBirth && errors && errors.dateOfBirth && (
												<h1>{errors.dateOfBirth}</h1>
											)}
											<div>
												<button type="Submit">Continue</button>
											</div>
										</form>
									)}
								/>
							</div>
						)
					}}
				</Mutation>
			</NoneLogin>
		)
	}
}
