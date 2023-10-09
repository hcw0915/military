import React, { useContext } from 'react'
import { CalendarTable } from './pages/CalendarTable'
import { Navbar } from './pages/Navbar'
import { FormProvider, useForm } from 'react-hook-form'
import { ThemeProvider, createTheme } from '@mui/material'
import { FirebaseStorageProvider } from './context/FirebaseStorageProvider'
import {
	FirebaseAuthProvider,
	firebaseAuthContext
} from './context/FirebaseAuthProvider'

import './App.css'
import { ScheduleProvider } from './context/ScheduleProvider'

function App() {
	// React-hook-form
	const methods = useForm()
	// Mui styles
	const theme = createTheme({ typography: { fontFamily: 'SanafonKaku' } })

	// Firebase operations

	return (
		<FormProvider {...methods}>
			<ThemeProvider theme={theme}>
				<FirebaseAuthProvider>
					<FirebaseStorageProvider collectionName="schedule">
						<ScheduleProvider>
							{/* <Auth /> */}
							<Navbar />
							<CalendarTable />
						</ScheduleProvider>
					</FirebaseStorageProvider>
				</FirebaseAuthProvider>
			</ThemeProvider>
		</FormProvider>
	)
}

export default App
