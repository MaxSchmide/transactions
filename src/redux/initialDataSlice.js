import { createSlice } from "@reduxjs/toolkit"
const initialDataSlice = createSlice({
	name: "initialData",
	initialState: {
		transactions: [],
	},
	reducers: {
		setInitialData: (state, action) => {
			state.transactions = action.payload
		},
	},
})

export default initialDataSlice.reducer

export const { setInitialData } = initialDataSlice.actions
