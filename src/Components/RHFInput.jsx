import React from 'react'
import { useFormContext, Controller } from 'react-hook-form'

export const RHFInput = ({ name, label, type = 'text' }) => {
	const { control } = useFormContext()

	return (
		<div>
			<label htmlFor={name}>{label}</label>
			<Controller
				name={name}
				control={control}
				defaultValue=""
				render={({ field }) => <input {...field} type={type} />}
			/>
		</div>
	)
}
