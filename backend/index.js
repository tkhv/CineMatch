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

app.post('/signup', async (req, res) => {
	if (await getUser(req.body.username)) {
		res.status(409).send('username taken')
		return
	}
	const newUser = await createUser(req.body.username, req.body.password, req.body.email)

	res.json(newUser)
})

app.post('/login', async (req, res) => {
	if (!req.body.username) {
		res.status(401).send('no username given')
		return
	}

	const user = await getUser(req.body.username)
	if (!user || user.password != req.body.password) {
		res.status(401).send('invalid username or password')
		return
	}

	res.json(user)
})

// Creates and returns a user
const createUser = async (username, password, email) => {
	const usersCollection = db.collection('users')
  const newUserDoc = usersCollection.doc()
	await newUserDoc.set({
		username: username,
		password: password,
		email: email
	})
	
	return (await usersCollection.where('username', '==', username).limit(1).get()).docs[0].data()
}

// Get user with given username, returns null if user DNE
const getUser = async (username) => {
	const usersCollection = db.collection('users')
	const query = await usersCollection.where('username', '==', username).limit(1).get()

	if (query.empty) {
		return null
	}
	return query.docs[0].data()
}

const validLoginCredentials = async (username, password) => {
	const usersRef = db.collection('users')
	const snapshot = await usersRef.where('username', '==', username).where('password', '==', password).get()

	if (snapshot.empty) {
		return false
	}

	return true
}




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
