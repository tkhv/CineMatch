const express = require('express')
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app')
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore')

const app = express()

const serviceAccount = require('./credentials/cinematch-7e963-firebase-adminsdk-zyvl3-fa0f5e1654.json')

initializeApp({
	credential: cert(serviceAccount),
})

const db = getFirestore()

//Body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Define routes
app.post('/createUser', async (req, res) => {
	const usersRef = db.collection('users')
	const userSnapshot = await usersRef.where('username', '==', req.body.username).get()
	if (!userSnapshot.empty) {
		res.status(409).send('username taken');
		return
	}

	const emailSnapshot = await usersRef.where('email', '==', req.body.email).get()
	if (!emailSnapshot.empty) {
		res.status(409).send('email taken');
		return
	}

	const newUserRef = usersRef.doc()
	
	await newUserRef.set({
		username: req.body.username,
		password: req.body.password,
		email: req.body.email,
	})

	res.json((await newUserRef.get()).data())
})

// Define routes
app.get('/getAllUsers', async (req, res) => {
	const snapshot = await db.collection('users').get()
	const allUsers = snapshot.docs.map((doc) => doc.data())
	res.json(allUsers)
})

// Start the server
app.listen(3000, () => {
	console.log('Server started on port 3000')
})
