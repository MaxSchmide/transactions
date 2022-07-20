import { createSlice } from "@reduxjs/toolkit"

const selectedTransactionSlice = createSlice({
	name: "selectedTransaction",
	initialState: {
		transaction: {},
	},
	reducers: {
		setSelected: (state, action) => {
			state.transaction = action.payload
		},
		refreshSelected: (state, action) => {
			state.transaction.status = action.payload
		},
	},
})

export default selectedTransactionSlice.reducer

export const { refreshSelected, setSelected } = selectedTransactionSlice.actions
