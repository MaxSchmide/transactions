/* eslint-disable array-callback-return */
import { createSlice } from "@reduxjs/toolkit"

const dataSlice = createSlice({
	name: "data",
	initialState: {
		transactions: [],
		transactionsContainer: [],
		loading: false,
		totalPages: null,
		rowsPerPage: 10,
	},
	reducers: {
		dataRequest: (state) => {
			state.loading = true
		},
		dataSuccess: (state, action) => {
			state.loading = false
			state.transactions = action.payload
			state.transactionsContainer = action.payload
			state.totalPages = Math.ceil(
				state.transactions?.length / state.rowsPerPage
			)
		},
		searching: (state, action) => {
			state.transactions = state.transactionsContainer.filter((transaction) => {
				if (action.payload === "") {
					return transaction
				} else if (
					transaction.clientname
						.toLowerCase()
						.includes(action.payload.toLowerCase())
				)
					return transaction
			})
		},
		filtering: (state, action) => {
			state.transactions = state.transactionsContainer.filter((transaction) => {
				if (
					transaction.status.toLowerCase() === action.payload.toLowerCase() ||
					transaction.type.toLowerCase() === action.payload.toLowerCase()
				) {
					return transaction
				}
			})
		},
		clearFilter: (state) => {
			state.transactions = state.transactionsContainer
		},
		changeStatus: (state, action) => {
			state.transactions.map((transaction) => {
				if (transaction.transactionid === action.payload.id) {
					transaction.status = action.payload.status
				}
			})
			state.transactionsContainer.map((transaction) => {
				if (transaction.transactionid === action.payload.id) {
					transaction.status = action.payload.status
				}
			})
		},
		deleteTransaction: (state, action) => {
			state.transactions = state.transactionsContainer =
				state.transactionsContainer.filter((transaction) => {
					if (transaction.transactionid !== action.payload) return transaction
				})
			state.totalPages = Math.ceil(
				state.transactions?.length / state.rowsPerPage
			)
		},
	},
})

export default dataSlice.reducer

export const {
	deleteTransaction,
	changeStatus,
	clearFilter,
	filtering,
	searching,
	dataRequest,
	dataSuccess,
} = dataSlice.actions
