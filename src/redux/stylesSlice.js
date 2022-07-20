import { createSlice } from "@reduxjs/toolkit"

const stylesSlice = createSlice({
	name: "style",
	initialState: {
		isModal: false,
	},
	reducers: {
		toggleModal: (state) => {
			state.isModal = !state.isModal
		},
	},
})
export default stylesSlice.reducer
export const { toggleModal } = stylesSlice.actions
