export const toLowerKeys = (data) => {
	const entries = Object.entries(data)
	return Object.fromEntries(
		entries.map(([key, value]) => {
			return [key.toLowerCase(), value]
		})
	)
}
