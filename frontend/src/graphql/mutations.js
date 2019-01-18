import gql from 'graphql-tag'
import * as Yup from 'yup'

export const LOGIN_SCHEMA = Yup.object().shape({
	username: Yup.string().required('Username is required.'),
	password: Yup.string().required('Password is required.')
})

export const LOGIN_MUTATION = gql`
	mutation Login($username: String!, $password: String!) {
		login(input: { username: $username, password: $password }) {
			user {
				username
				email
				image
				firstName
				lastName
				isStaff
				dateJoined
				bio
				token
			}
		}
	}
`

export const REGISTER_SCHEMA = Yup.object().shape({
	username: Yup.string()
		.min(3, 'Username has to be at least three characters.')
		.required('Username is required.'),
	password: Yup.string()
		.min(8, 'Password must be at least 8 characters.')
		.required('Password is required.'),
	passwordConfirm: Yup.string()
		.oneOf([Yup.ref('password'), null], 'Password does not match.')
		.required('Password confirm is required'),
	email: Yup.string()
		.email('Please enter an valid email.')
		.required('Email is required.'),
	dateOfBirth: Yup.date()
		.min('1900-01-01', 'Invalid date.')
		.max(new Date(), 'Invalid date.')
		.required('Date of birth is required.')
})

export const REGISTER_MUTATION = gql`
	mutation Register(
		$username: String!
		$password: String!
		$email: String!
		$dateOfBirth: Date!
		$confirmationLink: String!
	) {
		register(
			input: {
				username: $username
				password: $password
				email: $email
				dateOfBirth: $dateOfBirth
				confirmationLink: $confirmationLink
			}
		) {
			user {
				username
			}
		}
	}
`
