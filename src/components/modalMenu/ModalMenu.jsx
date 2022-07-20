import React, { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { changeStatus } from "../../redux/dataSlice"
import { refreshSelected } from "../../redux/selectedTransactionSlice"
import { toggleModal } from "../../redux/stylesSlice"
import "./_modalMenu.scss"

const ModalMenu = () => {
	const { isModal } = useSelector((state) => state.style)
	const { transaction } = useSelector((state) => state.selectedTransaction)
	const dispatch = useDispatch()
	const statusRef = useRef()
	const saveNewStatus = () => {
		dispatch(
			changeStatus({
				status: statusRef.current.value,
				id: transaction?.transactionid,
			})
		)
		alert("Successfully!")
		dispatch(refreshSelected(statusRef.current.value))
	}
	const hideModalMenu = () => {
		const body = document.querySelector("body")
		dispatch(toggleModal())
		body.style.overflow = "auto"
	}
	return (
		<div className={`modal ${isModal && "active"}`}>
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">
					<div className="modal-header">
						<h3 className="modal-title">
							Transaction Status: {transaction?.status}
						</h3>

						<button onClick={hideModalMenu} className="btn btn-danger btn-sm">
							&times;
						</button>
					</div>
					<div className="modal-body">
						<h5>Change status to: </h5>
						<select ref={statusRef} name="status" id="status">
							<option value="Pending">Pending</option>
							<option value="Completed">Completed</option>
							<option value="Cancelled">Cancelled</option>
						</select>
					</div>
					<div className="modal-footer">
						<button
							className="btn btn-primary"
							data-dismiss="modal"
							onClick={saveNewStatus}
						>
							Save
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ModalMenu
