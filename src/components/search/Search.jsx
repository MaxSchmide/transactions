import React from "react"
import { DebounceInput } from "react-debounce-input"
import { useDispatch } from "react-redux"
import { searching } from "../../redux/dataSlice"
import "./_search.scss"

const Search = () => {
	const dispatch = useDispatch()
	const inputHandler = (e) => {
		dispatch(searching(e.target.value))
	}
	return (
		<div className="search">
			<DebounceInput
				minLength={3}
				debounceTimeout={500}
				onChange={inputHandler}
				placeholder="Write a client name..."
			/>
		</div>
	)
}

export default Search
