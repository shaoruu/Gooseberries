import React from 'react'
import SearchIcon from '@material-ui/icons/Search'

import classes from './SearchBar.module.css'

const SearchBar = props => {
	return (
		<div className={classes.SearchBar_container}>
			<div>
				<SearchIcon style={{ color: '#eeeeee' }} />
			</div>
			<input placeholder="Search..." className={classes.SearchBar_input} />
		</div>
	)
}

export default SearchBar
