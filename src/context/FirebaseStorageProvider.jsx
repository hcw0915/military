import { createContext, useEffect, useState } from 'react'
import { db } from '../config/firebase.config'
import {
	getDocs,
	collection,
	addDoc,
	updateDoc,
	deleteDoc,
	doc,
	setDoc,
	onSnapshot
} from 'firebase/firestore'

export const firebaseStorageContext = createContext()

export const FirebaseStorageProvider = ({ children, collectionName = '' }) => {
	const [state, setState] = useState()

	// CRUD Generator
	const handleCrud = async (action, docId, data) => {
		const collectionRef = collection(db, collectionName)
		try {
			if (action === 'create' && docId) {
				const docRef = doc(collectionRef, docId)
				await setDoc(docRef, data)
			} else if (action === 'read') {
				return await getDocs(collectionRef)
			} else if (action === 'update') {
				const docRef = doc(db, collectionName, docId)
				await updateDoc(docRef, data)
			} else if (action === 'delete') {
				const docRef = doc(db, collectionName, docId)
				await deleteDoc(docRef)
			}
		} catch (err) {
			console.error(`執行${action}操作時發生錯誤：`, err)
		}
	}

	const createDoc = (docId, newDoc) => handleCrud('create', docId, newDoc)
	const readDoc = () => handleCrud('read', null, null)
	// ed 與 updateDoc 區分
	const updatedDoc = (docId, newDoc) => handleCrud('update', docId, newDoc)
	const deletedDoc = (docId) => handleCrud('delete', docId)

	useEffect(() => {
		;(async () => {
			const data = await readDoc()
			const filteredData = data.docs.map((doc) => ({
				...doc.data(),
				id: doc.id
			}))
			setState(filteredData)
		})()
	}, [])

	useEffect(() => {
		const docRef = doc(db, collectionName, 'formList') // 替换为您的集合名称和文档ID
		const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
			if (docSnapshot.exists()) {
				const data = docSnapshot.data()
				console.log('文档已更新：', data)
				setState(data) // 更新组件状态以反映文档的最新数据
			} else {
				console.log('文档不存在')
			}
		})
		return () => {
			unsubscribe()
		}
	}, [])

	return (
		<firebaseStorageContext.Provider
			value={{
				state,
				setState,
				createDoc,
				readDoc,
				updatedDoc,
				deletedDoc
			}}
		>
			{children}
		</firebaseStorageContext.Provider>
	)
}
