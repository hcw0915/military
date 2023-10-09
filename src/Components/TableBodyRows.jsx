import React, { useContext, useMemo, useState } from 'react'
import MenuItem from '@mui/material/MenuItem'
import ListSubheader from '@mui/material/ListSubheader'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { SENTRY_TIME, PERSON_INFO } from '../constants/data'
import { useFormContext, Controller } from 'react-hook-form'
import { firebaseStorageContext } from '../context/FirebaseStorageProvider'

export const TableBodyRows = ({ rowsData, date }) => {
	const { control } = useFormContext()
	const tableHead = useMemo(() => Object.values(SENTRY_TIME), [])

	const { state, setState, createDoc, readDoc, updateDoc, deleteDoc } =
		useContext(firebaseStorageContext)

	const btn = () => deleteDoc('test')

	// 篩選後的月份每列資料 -> 每列資料渲染
	const rowsDataFiltered = useMemo(() => {
		return rowsData.filter((item) => {
			return item.date.slice(0, 6) === `${date.year}${date.month}`
		})
	}, [date.month])

	// 軍階分級 -> 選項分區用
	const militaryRanks = useMemo(() => {
		return PERSON_INFO.reduce((acc, cur) => {
			if (!acc.includes(cur.level)) acc = [...acc, cur.level]
			return acc
		}, [])
	}, [])

	const tableRows = rowsDataFiltered.map((row) => {
		return (
			<TableRow
				key={row.date}
				sx={{ bgcolor: row.isHoliday ? 'rgb(211, 234, 251)' : '' }}
			>
				<TableCell align="center" sx={{ minWidth: 100 }}>
					{`${row.date.split('2023')[1]} (${row.week})`}
					<br />
					<span> {row.description}</span>
				</TableCell>
				{tableHead.map((head, index) => {
					const fieldName = `${row.date}.${head}`
					return (
						<TableCell
							align="center"
							key={index}
							sx={{ fontFamily: 'sans-serif' }}
						>
							<FormControl sx={{ minWidth: 140 }}>
								<button onClick={btn}>aaa</button>

								<Controller
									name={fieldName}
									control={control}
									defaultValue=""
									render={({ field }) => {
										return (
											<Select
												id={`grouped-select-${fieldName}`}
												size="small"
												{...field}
											>
												{PERSON_INFO.map(({ id, name, level }) => {
													return (
														<MenuItem value={name} key={id}>
															{level}-{name}
														</MenuItem>
													)
												})}
											</Select>
										)
									}}
								/>
							</FormControl>
						</TableCell>
					)
				})}
			</TableRow>
		)
	})

	return <>{tableRows}</>
}
