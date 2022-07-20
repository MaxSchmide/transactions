import React from "react"
import "./_tableRow.scss"
import { useDispatch } from "react-redux"
import { deleteTransaction } from "../../redux/dataSlice"
import { setSelected } from "../../redux/selectedTransactionSlice"
import { toggleModal } from "../../redux/stylesSlice"

const TableRow = ({ data }) => {
	const dispatch = useDispatch()
	const showModalMenu = () => {
		dispatch(setSelected(data))
		const body = document.querySelector("body")
		dispatch(toggleModal())
		body.style.overflow = "hidden"
	}
	const deleteHandler = () => {
		let conf = window.confirm("You want delete this transaction. Are you sure?")
		if (conf) {
			dispatch(deleteTransaction(data.TransactionId))
		}
	}
	return (
		<>
			<tr>
				<td>{data.transactionid}</td>
				<td>{data.status}</td>
				<td>{data.type}</td>
				<td>{data.clientname}</td>
				<td>{data.amount}</td>
				<td style={{ width: "fit-content" }}>
					<button onClick={showModalMenu} className="edit">
						Edit
					</button>
					<button onClick={deleteHandler} className="delete">
						Delete
					</button>
				</td>
			</tr>
		</>
	)
}

export default TableRow
