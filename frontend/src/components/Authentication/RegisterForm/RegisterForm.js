import React from 'react'
import { Redirect } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import { Formik } from 'formik'

import { REGISTER_SCHEMA, REGISTER_MUTATION } from '../../../graphql/mutations'
import Loading from '../../Others/Loading/Loading'

export default () => {
	return (
		<div>
			<Mutation mutation={REGISTER_MUTATION}>
				{(registerUser, { loading, error, data }) => {
					if (loading) return <Loading />
					if (data) return <Redirect to="/login" />

					return (
						<div>
							<Formik
								initialValues={{
									username: '',
									password: '',
									firstName: '',
									lastName: '',
									email: '',
									dateOfBirth: ''
								}}
								validationSchema={REGISTER_SCHEMA}
								onSubmit={(values, { setSubmitting }) => {
									registerUser({
										variables: { ...values }
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
										<form onSubmit={handleSubmit}>
											<div>REGISTER</div>
											<div>
												<span className={classes.label}>First Name</span>
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
