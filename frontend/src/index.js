import React from 'react'
import ReactDOM from 'react-dom'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'

import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { BrowserRouter } from 'react-router-dom'
import { withClientState } from 'apollo-link-state'
import { createUploadLink } from 'apollo-upload-client'

import './index.css'
import Gooseberries from './Gooseberries'
import * as serviceWorker from './serviceWorker'
import { AUTH_TOKEN } from './constants'
import defaults from './graphql/defaults'
import resolvers from './graphql/resolvers'

const cache = new InMemoryCache()

const stateLink = withClientState({
	resolvers,
	cache,
	defaults
})

const httpLink = createUploadLink({
	uri: 'http://localhost:8000/graphql'
})

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem(AUTH_TOKEN)
	return {
		headers: {
			...headers,
			authorization: token ? `JWT ${token}` : ''
		}
	}
})

const client = new ApolloClient({
	link: ApolloLink.from([stateLink, authLink.concat(httpLink)]),
	cache: cache
})

const THEME = createMuiTheme({
	typography: {
		fontFamily: '"Bitter", sans-serif'
	}
})

const app = (
	<MuiThemeProvider theme={THEME}>
		<BrowserRouter>
			<ApolloProvider client={client}>
				<Gooseberries />
			</ApolloProvider>
		</BrowserRouter>
	</MuiThemeProvider>
)

ReactDOM.render(app, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
