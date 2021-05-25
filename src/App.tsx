import 'bootstrap/dist/css/bootstrap.min.css'

import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Provider } from 'react-redux'

import ErrorFallback from './components/ErrorFallback'
import Layout from './containers/Layout'
import Routes from './containers/Routes'
import store from './store'

function App() {
	return (
		<Provider store={store}>
			<ErrorBoundary FallbackComponent={ErrorFallback}>
				<Layout>
					<Routes />
				</Layout>
			</ErrorBoundary>
		</Provider>
	)
}

export default App
