import camelCase from 'lodash/camelCase'
import snakeCase from 'lodash/snakeCase'

export function toCamelCaseKeys(o: any) {
	let origKey, newKey, value
	let newO: any
	if (o instanceof Array) {
		return o.map(function (value) {
			if (typeof value === 'object') {
				value = toCamelCaseKeys(value)
			}
			return value
		})
	} else {
		newO = {}
		for (origKey in o) {
			if (Object.prototype.hasOwnProperty.call(o, origKey)) {
				newKey = camelCase(origKey)
				value = o[origKey]
				if (
					value instanceof Array ||
					(value !== null && value.constructor === Object)
				) {
					value = toCamelCaseKeys(value)
				}
				newO[newKey] = value
			}
		}
	}
	return newO
}

export function toSnakeCaseKeys(o: any) {
	let origKey, newKey, value
	let newO: any
	if (o instanceof Array) {
		return o.map(function (value) {
			if (typeof value === 'object') {
				value = toSnakeCaseKeys(value)
			}
			return value
		})
	} else {
		newO = {}
		for (origKey in o) {
			if (Object.prototype.hasOwnProperty.call(o, origKey)) {
				newKey = snakeCase(origKey)
				value = o[origKey]
				if (
					value instanceof Array ||
					(!!value && value.constructor === Object)
				) {
					value = toSnakeCaseKeys(value)
				}
				newO[newKey] = value
			}
		}
	}
	return newO
}
