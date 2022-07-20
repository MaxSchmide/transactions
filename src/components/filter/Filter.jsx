import React, { useRef, useState } from "react"
import "./_filter.scss"
import { Row, Col } from "react-bootstrap"
import Papa from "papaparse"
import { useDispatch, useSelector } from "react-redux"
import {
	clearFilter,
	dataRequest,
	dataSuccess,
	filtering,
} from "../../redux/dataSlice"
import { CSVLink } from "react-csv"
import { toLowerKeys } from "../../utils"

const Filter = () => {
	const dispatch = useDispatch()
	const { transactions } = useSelector((state) => state.data)
	const importRef = useRef()
	const statusRef = useRef("")
	const typeRef = useRef()
	const [exportData, setExportData] = useState([])
	const isFiltered =
		statusRef.current.value !== "status" || typeRef.current.value !== "type"

	const importHandler = () => {
		const REGEX = new RegExp("(.*?).(csv)$", "i")
		dispatch(dataRequest())
		const file = importRef.current.files[0]
		if (file && REGEX.test(file.name)) {
			Papa.parse(file, {
				header: true,
				complete: function (results) {
					const res = results.data.map((item) => toLowerKeys(item))
					dispatch(dataSuccess(res))
					importRef.current.value = ""
				},
			})
		} else {
			alert("File not selected or wrong format")
			importRef.current.value = ""
		}
	}

	const exportHandler = () => {
		const csv = Papa.unparse(transactions)
		setExportData(csv)
	}

	const filtersHandler = (e) => {
		dispatch(filtering(e.target.value))
	}

	const clearFilters = () => {
		statusRef.current.value = "status"
		typeRef.current.value = "type"
		dispatch(clearFilter())
	}
	return (
		<div className="filter">
			<Row>
				<Col>
					<div className="selects">
						<select
							onChange={filtersHandler}
							ref={statusRef}
							name="status"
							id="status"
							defaultValue="status"
						>
							<option value="status" disabled>
								Status
							</option>
							<option value="pending">Pending</option>
							<option value="completed">Completed</option>
							<option value="cancelled">Cancelled</option>
						</select>

						<select
							onChange={filtersHandler}
							ref={typeRef}
							name="type"
							id="type"
							defaultValue="type"
						>
							<option value="type" disabled>
								Type
							</option>
							<option value="refill">Refill</option>
							<option value="withdrawal">Withdrawal</option>
						</select>
						{isFiltered && (
							<button
								onClick={clearFilters}
								style={{
									padding: "0 5px",
									backgroundColor: "red",
								}}
							>
								&times;
							</button>
						)}
					</div>
				</Col>

				<Col>
					<div className="buttons">
						<div className="buttons__import">
							<input
								onChange={importHandler}
								ref={importRef}
								type="file"
								id="import"
								hidden
							/>
							<label htmlFor="import">Import</label>
						</div>
						<div className="buttons__export">
							<CSVLink
								onClick={exportHandler}
								data={exportData}
								filename="file.csv"
							>
								Export
							</CSVLink>
						</div>
					</div>
				</Col>
			</Row>
		</div>
	)
}

export default Filter
