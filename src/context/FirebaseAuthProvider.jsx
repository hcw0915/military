import { createContext, useEffect, useState } from 'react'
import { auth, googleProvider } from '../config/firebase.config'
import { signInWithPopup, signOut } from 'firebase/auth'

export const firebaseAuthContext = createContext()

export const FirebaseAuthProvider = ({ children }) => {
	const [user, setUser] = useState(auth.currentUser)
	const googleAuth = async (action) => {
		try {
			action === 'login' && (await signInWithPopup(auth, googleProvider))
			action === 'logout' && (await signOut(auth))
		} catch (err) {
			console.log(err)
		}
	}

	const googleLogin = () => googleAuth('login')
	const googleLogout = () => googleAuth('logout')

	const isAuthenticated = !!user

	// 使用useEffect來觀察身份驗證更改
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((authUser) => {
			authUser ? setUser(authUser) : setUser(null)
		})
		return () => unsubscribe()
	}, [])

	// 記得在組件卸載時取消訂閱

	return (
		<firebaseAuthContext.Provider
			value={{ user, isAuthenticated, googleLogin, googleLogout }}
		>
			{children}
		</firebaseAuthContext.Provider>
	)
}
