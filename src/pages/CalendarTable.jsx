import React, { useEffect, useState, useContext } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import { Box, Typography, Button } from '@mui/material'

import { DEFAULT_DATA, CATEGROIES } from '../constants/data'
import { TableBodyRows } from '../Components/TableBodyRows'
import { TableHeadRows } from '../Components/TableHeadRows'
import { useFormContext } from 'react-hook-form'
import { firebaseStorageContext } from '../context/FirebaseStorageProvider'
import { firebaseAuthContext } from '../context/FirebaseAuthProvider'

// TW calendar schedule
const URL = 'https://cdn.jsdelivr.net/gh/ruyut/TaiwanCalendar/data/'

/**
 *
 * @createDoc 2 parameters
 */

export const CalendarTable = () => {
	const [rowsData, setRowsData] = useState(DEFAULT_DATA)
	const [date, setDate] = useState({ year: '2023', month: '10' })

	const { state, createDoc, updatedDoc } = useContext(firebaseStorageContext)
	const { user, isAuthenticated } = useContext(firebaseAuthContext)
	const { handleSubmit } = useFormContext()

	const [formList, setFormList] = useState([])

	const fetchCalendarData = async () => {
		try {
			const response = await fetch(`${URL}${date.year}.json`)
			const result = await response.json()
			const formattedData = result.map((item) => ({ ...item, ...CATEGROIES }))
			setRowsData(formattedData)
		} catch (error) {
			console.error('Error fetching calendar data:', error)
		}
	}

	const handleChange = (e) => {
		const [year, month] = e.target.value.split('-')
		setDate({ year, month })
	}

	const handleRHFSubmit = (data) => {
		const newData = { ...data, createTime: new Date() }
		if (state.list.length >= 4) {
			state.list.shift()
			createDoc('formList', { list: [...state.list, newData] })
		} else {
			createDoc('formList', { list: [...state.list, newData] })
		}
	}
	console.log('更新後', state)
	useEffect(() => {
		fetchCalendarData()
	}, [])

	return (
		<form onSubmit={handleSubmit(handleRHFSubmit)}>
			<Box
				display={'flex'}
				alignItems={'center'}
				justifyContent={'center'}
				marginY={3}
				gap={1}
			>
				<TextField
					label="月份"
					type="month"
					size="small"
					onChange={handleChange}
					value={`${date.year}-${date.month}`}
				/>
				<Box>
					<Button variant="contained" color="primary" type="submit">
						提交
					</Button>
				</Box>
			</Box>
			<Paper sx={{ width: '100%', overflow: 'hidden' }}>
				<TableContainer sx={{ maxHeight: '90%', minWidth: '90%' }}>
					<Table stickyHeader aria-label="sticky table">
						<TableHead>
							<TableRow>
								<TableCell align="center">項次</TableCell>
								<TableHeadRows />
							</TableRow>
						</TableHead>
						<TableBody>
							<TableBodyRows rowsData={rowsData} date={date} />
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
		</form>
	)
}
