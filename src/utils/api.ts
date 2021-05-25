import store from '../store'
import { showLoader } from '../store/state/common'
import { toCamelCaseKeys, toSnakeCaseKeys } from './common'

declare interface IMetaConfig {
	showLoader?: boolean
}

const constructUrl = (url: string) => {
	if (process.env.REACT_APP_API_BASE) {
		return `${process.env.REACT_APP_API_BASE}${url}`
	}
	return url
}

export const get = async <K>(
	url: string,
	headers?: Record<string, any>,
	metaConfig: IMetaConfig = { showLoader: true }
) => {
	try {
		if (metaConfig.showLoader) {
			store.dispatch(showLoader(''))
		}
		const response = await fetch(constructUrl(url), {
			headers: headers
		})
		const data = toSnakeCaseKeys(response)
		return data as K
	} catch (e) {
		// global error handling
		throw new Error(e)
	}
}

export const post = async <K>(
	url: string,
	postData: Record<string, any>,
	headers?: Record<string, any>
) => {
	try {
		const response = await fetch(constructUrl(url), {
			method: 'POST',
			headers: headers,
			body: JSON.stringify(toSnakeCaseKeys(postData))
		})
		const data = toCamelCaseKeys(response.json())
		return data as K
	} catch (e) {
		throw new Error(e)
	}
}

export const remove = async <K>(url: string, headers?: Record<string, any>) => {
	try {
		const response = await fetch(constructUrl(url), {
			method: 'DELETE',
			headers: headers
		})
		const data = toCamelCaseKeys(response.json())
		return data as K
	} catch (e) {
		throw new Error(e)
	}
}

export const patch = async <K>(
	url: string,
	patchData: Record<string, any>,
	headers?: Record<string, any>
) => {
	try {
		const response = await fetch(constructUrl(url), {
			method: 'PATCH',
			headers: headers,
			body: JSON.stringify(patchData)
		})
		const data = toCamelCaseKeys(response.json())
		return data as K
	} catch (e) {
		throw new Error(e)
	}
}

export const formPost = async <K>(
	url: string,
	formPostData: Record<string, any>,
	headers?: Record<string, any>
) => {
	try {
		const bodyFormData = new FormData()
		const formData = toSnakeCaseKeys(formPostData)
		Object.keys(formPostData).forEach((key: string) => {
			//@ts-ignore
			bodyFormData.set(key, formData[key])
		})
		let defaultHeaders = {
			'Content-Type': 'multipart/form-data'
		}
		if (headers) {
			defaultHeaders = {
				...defaultHeaders,
				...headers
			}
		}
		const response = await fetch(constructUrl(url), {
			method: 'POST',
			headers: defaultHeaders,
			body: JSON.stringify(bodyFormData)
		})
		const data = toCamelCaseKeys(response.json())
		return data as K
	} catch (e) {
		throw new Error(e)
	}
}
