import React from 'react'
import { FallbackProps } from 'react-error-boundary'

const ErrorFallback: React.FC<FallbackProps> = ({ error }) => {
	if (error) {
		return (
			<div>
				There was an error: <pre> {error.message}</pre>
			</div>
		)
	}

	return null
}

export default ErrorFallback
