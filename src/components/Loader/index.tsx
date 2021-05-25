import React from 'react'
import Spinner from 'react-bootstrap/Spinner'

import classes from './loader.module.scss'

const Loader: React.FC = () => (
	<div className={classes.loader}>
		<Spinner animation='grow' />
	</div>
)

export default Loader
