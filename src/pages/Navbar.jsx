import React, { memo, useContext } from 'react'
import TextField from '@mui/material/TextField'
import { soldier } from '@/assets'
import { Box, Button, Link, Paper, Typography } from '@mui/material'
import { firebaseAuthContext } from '../context/FirebaseAuthProvider'
import GoogleIcon from '@mui/icons-material/Google'

export const Navbar = () => {
	const { user, isAuthenticated, googleLogin, googleLogout } =
		useContext(firebaseAuthContext)

	// console.log('isAuthenticated', isAuthenticated)
	// console.log('user', user)

	const isLogin = false
	return (
		<Paper component={'nav'} position={'relative'}>
			<Box
				justifyContent={'center'}
				alignItems={'center'}
				display={'flex'}
				flexDirection={'column'}
				bgcolor={'#98b8db'}
				padding={3}
				position={'static'}
			>
				<Box display={'flex'} alignItems={'center'}>
					<img src={soldier} alt="military" width={80} height={64} />
					<Typography variant="h2" marginY={3}>
						排哨神器
					</Typography>
				</Box>
				<Box>
					<Link>圖表統計</Link>
					{/* <Link>123</Link>
					<Link>123</Link> */}
					{!isAuthenticated ? (
						<Button
							onClick={googleLogin}
							variant="contained"
							color="error"
							startIcon={<GoogleIcon />}
						>
							Google 登入
						</Button>
					) : (
						<Button onClick={googleLogout} variant="contained" color="error">
							登出
						</Button>
					)}
				</Box>
			</Box>
		</Paper>
	)
}
