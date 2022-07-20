import { configureStore } from "@reduxjs/toolkit"
import dataSlice from "./dataSlice"
import initialDataSlice from "./initialDataSlice"
import selectedTransactionSlice from "./selectedTransactionSlice"
import stylesSlice from "./stylesSlice"
const store = configureStore({
	reducer: {
		data: dataSlice,
		style: stylesSlice,
		selectedTransaction: selectedTransactionSlice,
		initialData: initialDataSlice,
	},
})

export default store
