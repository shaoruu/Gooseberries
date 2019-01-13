import React, { Component } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import gql from 'graphql-tag'
import { Redirect } from 'react-router-dom'
import { Mutation } from 'react-apollo'

import classes from './MoreInfo.module.css'
import NoneLogin from '../../../../hoc/NoneLogin/NoneLogin'
import RegristrationSuccess from '../RegristrationSuccess/RegristrationSuccess'

const MOREINFO_SCHEMA = Yup.object().shape({
	firstName: Yup.string(),
	lastName: Yup.string()
})

const MOREINFO_MUTATION = gql`
	mutation UpdateProfile($username: String!, $firstName: String, $lastName: String) {
		updateProfile(
			input: { username: $username, firstName: $firstName, lastName: $lastName }
		) {
			user {
				username
				firstName
				lastName
			}
		}
	}
`

export default class Register extends Component {
	render() {
		if (!this.props.location.state) return <Redirect to="/home" />
		return (
			<NoneLogin elseRedirect="/home" className={classes.MoreInfo}>
				<h1>More Info for user {this.props.location.state.username}</h1>
				<Mutation mutation={MOREINFO_MUTATION}>
					{(updateUser, { loading, error, data }) => {
						if (loading) return <p>Loading...</p>
						if (error) return <p>Error</p>
						if (data) {
							return <RegristrationSuccess user={data.updateProfile.user} />
						}
						return (
							<div>
								<Formik
									initialValues={{
										firstName: '',
										lastName: ''
									}}
									validationSchema={MOREINFO_SCHEMA}
									onSubmit={values => {
										updateUser({
											variables: {
												username: this.props.location.state.username,
												firstName: values.firstName,
												lastName: values.lastName
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
												name="firstName"
												onChange={handleChange}
												onBlur={handleBlur}
												value={values.firstName}
											/>
											{touched.firstName && errors && errors.firstName && (
												<h1>{errors.firstName}</h1>
											)}
											<input
												type="Text"
												name="lastName"
												onChange={handleChange}
												onBlur={handleBlur}
												value={values.lastName}
											/>
											{touched.lastName && errors && errors.lastName && (
												<h1>{errors.lastName}</h1>
											)}
											<div>
												<button type="Submit">Register</button>
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
