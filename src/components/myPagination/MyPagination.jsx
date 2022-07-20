import React from "react"
import Pagination from "react-bootstrap/Pagination"

const MyPagination = ({ total, current, onPageChange }) => {
	let items = []

	if (current > 1)
		items.push(
			<Pagination.Prev key="prev" onClick={() => onPageChange(current - 1)} />
		)

	for (let page = 1; page <= total; page++) {
		items.push(
			<Pagination.Item
				key={page}
				data-page={page}
				active={page === current + 1}
				onClick={() => onPageChange(page)}
			>
				{page}
			</Pagination.Item>
		)
	}
	if (current < total)
		items.push(
			<Pagination.Next key="next" onClick={() => onPageChange(current + 1)} />
		)

	return <Pagination style={{ justifyContent: "center" }}>{items}</Pagination>
}

export default MyPagination
