/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios"
import React, { useCallback, useEffect, useState } from "react"
import Table from "react-bootstrap/Table"
import { useDispatch, useSelector } from "react-redux"
import Filter from "../components/filter/Filter"
import ModalMenu from "../components/modalMenu/ModalMenu"
import MyPagination from "../components/myPagination/MyPagination"
import Search from "../components/search/Search"
import TableRow from "../components/tableRow/TableRow"
import { dataRequest, dataSuccess } from "../redux/dataSlice"
import { setInitialData } from "../redux/initialDataSlice"

const HomePage = () => {
	const dispatch = useDispatch()
	const { loading, transactions, totalPages, rowsPerPage } = useSelector(
		(state) => state.data
	)
	const [page, setPage] = useState(0)
	const pageChangeHandler = useCallback((page) => {
		setPage(page - 1)
	}, [])
	const fetchData = async () => {
		try {
			dispatch(dataRequest())
			await axios.get("data.json").then((res) => {
				dispatch(dataSuccess(res.data))
				dispatch(setInitialData(res.data))
			})
		} catch (error) {
			alert(error.message)
		}
	}
	useEffect(() => {
		fetchData()
	}, [])

	return (
		<div>
			<ModalMenu />
			<Search />
			<Filter />
			<Table striped bordered hover>
				<thead>
					<tr>
						<td>Id</td>
						<td>Status</td>
						<td>Type</td>
						<td>Client Name</td>
						<td>Amount</td>
						<td>Actions</td>
					</tr>
				</thead>
				<tbody>
					{!loading &&
						transactions
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((transacion) => (
								<TableRow data={transacion} key={transacion.transactionid} />
							))}
				</tbody>
			</Table>
			{totalPages > 1 && (
				<MyPagination
					total={totalPages}
					current={page}
					onPageChange={pageChangeHandler}
				></MyPagination>
			)}
		</div>
	)
}

export default HomePage
