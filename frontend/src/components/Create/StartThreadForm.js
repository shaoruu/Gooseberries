import React, { Component } from 'react'
import { withStyles } from '@material-ui/core'
import { Mutation } from 'react-apollo'
import { Formik } from 'formik'
import { withRouter, NavLink } from 'react-router-dom'
import { TextField, FormControl, FormHelperText, Button } from '@material-ui/core'
import Dropzone from 'react-dropzone'

import { CREATE_THREAD_MUTATION, CREATE_THREAD_SCHEMA } from '../../graphql/mutations'
import Loading from '../Others/Loading/Loading'
import classes from './StartThreadForm.module.css'
import image from '../../assets/defaultThread.jpeg'

const styles = theme => ({
	button: {
		color: theme.palette.getContrastText('#009f9d'),
		backgroundColor: '#009f9d',
		'&:hover': {
			backgroundColor: '#3fbac2'
		},
		'&:active': {
			backgroundColor: '#3fbac2'
		},
		minWidth: '5.5rem'
	},
	formTitle: {
		margin: 'auto',
		width: '18rem',
		textAlign: 'center',
		fontSize: '3rem',
		borderBottom: '1px #1f3a52 solid'
	},
	formWrapper: {
		padding: '1rem',
		display: 'flex',
		marginTop: '1rem',
		flexDirection: 'column',
		justifyContent: 'center',
		paddingBottom: 0
	},
	nameField: {
		width: '30rem'
	},
	formImagenName: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'flex-end'
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
	},
	formImageWrapper: {
		position: 'relative',
		maxHeight: '8rem',
		border: '2px #0f1021 solid',
		cursor: 'pointer',
		'&:focus': {
			outline: 'none'
		},
		overflow: 'hidden'
	},
	imageWrapper: {
		width: '8rem',
		objectFit: 'cover'
		// borderRadius: '50%',
	},
	imageChangeText: {
		userSelect: 'none',
		position: 'absolute',
		textAlign: 'center',
		bottom: 0,
		width: '100%',
		background: '#eeeeeeec',
		fontSize: '1rem'
	},
	descriptionField: {
		margin: '2rem 0'
	},
	buttons: {
		display: 'flex',
		flexDirection: 'row',
		padding: '1rem',
		justifyContent: 'space-evenly'
	}
})

class StartThreadForm extends Component {
	state = {
		isImageHover: false,
		imageRaw: image,
		imageFull: null
	}

	handleImageChange = files => {
		this.setState({
			imageRaw: URL.createObjectURL(files[0]),
			imageFull: files[0]
		})
		console.log(this.state.imageFull)
	}

	componentWillUnmount() {
		URL.revokeObjectURL(this.state.imageRaw)
	}

	render() {
		const styles = this.props.classes
		return (
			<div className={classes.StartThreadForm_container}>
				<Mutation mutation={CREATE_THREAD_MUTATION}>
					{(createThread, { cache, loading, error, data }) => {
						if (loading) return <Loading />
						if (data) {
							this.props.history.push('/home')
						}
						return (
							<Formik
								initialValues={{ name: '', description: '' }}
								validationSchema={CREATE_THREAD_SCHEMA}
								onSubmit={(values, { setSubmitting, setValues }) => {
									let variables = {
										name: values.name.toLowerCase(),
										description: values.description
									}
									if (this.state.imageFull)
										variables.threadImage = this.state.imageFull
									createThread({
										variables
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
											<div className={styles.formTitle}>Start Thread</div>
											<div className={styles.formWrapper}>
												<div className={styles.formImagenName}>
													<Dropzone
														onDrop={this.handleImageChange}
														multiple={false}
														accept="image/jpeg, image/png, image/jpg"
													>
														{({ getRootProps, getInputProps }) => {
															return (
																<div
																	{...getRootProps()}
																	className={styles.formImageWrapper}
																	onMouseEnter={() => {
																		this.setState({
																			isImageHover: true
																		})
																	}}
																	onMouseLeave={() => {
																		this.setState({
																			isImageHover: false
																		})
																	}}
																>
																	<input {...getInputProps()} />
																	<img
																		src={this.state.imageRaw}
																		alt="Thread Default"
																		className={styles.imageWrapper}
																	/>
																	{this.state.isImageHover ? (
																		<div
																			className={
																				styles.imageChangeText
																			}
																		>
																			Change
																		</div>
																	) : null}
																</div>
															)
														}}
													</Dropzone>

													<FormControl
														aria-describedby="error-text"
														className={styles.nameField}
													>
														<TextField
															required
															id="name"
															name="name"
															value={values.name}
															label="Name"
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
														{(touched.name && errors && errors.name && (
															<FormHelperText id="error-text" error>
																{errors.name}
															</FormHelperText>
														)) ||
															(error &&
																((error.message.includes('taken') && (
																	<FormHelperText id="error-text" error>
																		Thread name already taken.
																	</FormHelperText>
																)) ||
																	(error.message.includes('spaces') && (
																		<FormHelperText
																			id="error-text"
																			error
																		>
																			Thread name should not contain
																			any spaces.
																		</FormHelperText>
																	))))}
													</FormControl>
												</div>
												<FormControl
													aria-describedby="error-text"
													className={styles.descriptionField}
												>
													<TextField
														required
														id="description"
														name="description"
														value={values.description}
														label="Description"
														onChange={handleChange}
														onBlur={handleBlur}
														multiline
														rows="7"
														rowsMax="7"
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
													{(touched.description &&
														errors &&
														errors.description && (
															<FormHelperText id="error-text" error>
																{errors.description}
															</FormHelperText>
														)) ||
														(error &&
															error.message.includes('Description') && (
																<FormHelperText id="error-text" error>
																	Invalid Description
																</FormHelperText>
															))}
												</FormControl>
											</div>
											<div className={styles.buttons}>
												<Button
													type="submit"
													variant="contained"
													color="primary"
													className={styles.button}
													disabled={
														isSubmitting ||
														!!(errors.name && touched.name) ||
														!!(errors.description && touched.description)
													}
												>
													Start
												</Button>
												<Button
													variant="contained"
													color="primary"
													className={styles.button}
													disabled={isSubmitting}
													component={NavLink}
													to="/home"
												>
													Cancel
												</Button>
											</div>
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

export default withRouter(withStyles(styles)(StartThreadForm))
