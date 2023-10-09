export function getMonthData(year, month) {
	const startDate = new Date(year, month, 1)
	const endDate = new Date(year, month + 1, 0) // 最後一天

	const weekDays = ['日', '一', '二', '三', '四', '五', '六'] // 星期幾的對應數組

	const monthData = []
	const currentDate = new Date(startDate)

	while (currentDate <= endDate) {
		const date = currentDate.getDate()
		const dayOfWeek = weekDays[currentDate.getDay()] // 使用對應數組

		// 使用 padStart 將日期填充為兩位數
		const formattedDate = `${month + 1}.${date.toString().padStart(2, '0')}`

		monthData.push({
			date: formattedDate,
			dayOfWeek: dayOfWeek
		})

		currentDate.setDate(date + 1)
	}

	return monthData
}
