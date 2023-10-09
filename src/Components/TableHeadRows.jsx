import React, { useMemo, memo } from 'react'
import { SENTRY_TIME } from '../constants/data'
import TableCell from '@mui/material/TableCell'

export const TableHeadRows = memo(() => {
	const tableHeadList = useMemo(() => Object.values(SENTRY_TIME), [])

	const tableHead = tableHeadList.map((item) => (
		<TableCell key={item} align="center">
			{item}
		</TableCell>
	))

	return <>{tableHead}</>
})
