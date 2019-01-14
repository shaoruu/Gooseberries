import React, { Component } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faHome, faCog } from '@fortawesome/free-solid-svg-icons'

import Gooseberries from './containers/Gooseberries/Goooseberries'

library.add(faUser, faHome, faCog)

class App extends Component {
	render() {
		return (
			<div className="App">
				<Gooseberries />
			</div>
		)
	}
}

export default App
