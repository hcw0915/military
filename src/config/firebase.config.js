// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// import { getAnalytics } from 'firebase/analytics'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: import.meta.env.VITE_API_KEY,
	authDomain: import.meta.env.VITE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_MESSAGE_SENDER_ID,
	appId: import.meta.env.VITE_APP_ID,
	measurementId: import.meta.env.VITE_MEASUREMENT_ID
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)

// CRUD

// firebaseOperations.js

export const createDocument = async (collectionName, docId, data) => {
	const docRef = db.collection(collectionName).doc(docId)
	await docRef.set(data)
}

export const readDocuments = async (collectionName) => {
	const collectionRef = db.collection(collectionName)
	const querySnapshot = await collectionRef.get()
	return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
}

export const updateDocument = async (collectionName, docId, data) => {
	const docRef = db.collection(collectionName).doc(docId)
	await docRef.update(data)
}

export const deleteDocument = async (collectionName, docId) => {
	const docRef = db.collection(collectionName).doc(docId)
	await docRef.delete()
}
