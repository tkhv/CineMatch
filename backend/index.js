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

	const user = (await getUser(req.body.username)).data()
	if (!user || user.password != req.body.password) {
		res.status(401).send('invalid username or password')
		return
	}

	res.json(user)
})

app.delete('/deleteUser', async (req, res) => {
	console.log(req.query.username)
	if (!req.query.username) {
		res.status(401).send('no username given')
		return
	}

	const deleteResult = await deleteUser(req.query.username)
	if (!deleteResult) {
		return res.status(404).send('user does not exist')
	}

	return res.json('user deleted')
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
	return query.docs[0]
}

// Delete user if user exists
const deleteUser = async (username) => {
	const user = await getUser(username)
	if (!user) {
		return null
	}

	const groupnames = Array.from(user.data().groups)
	for (let groupname of groupnames) {
		await removeUserFromGroup(username, groupname)
	}


	const userRef = user.ref.delete()
	return 1
}

const removeUserFromGroup = async(username, groupname) => {
	const group = await getGroup(groupname)
	if (!group) {
		return null
	}

	const user = await getUser(username)
	if (!user) {
		return null
	}

	group.ref.update({
		users: FieldValue.arrayRemove(username)
	})
}

app.post('/createGroup', async (req, res) => {
	const group = await createGroup(req.body.groupname)
	
	if (!group) {
		return res.status(409).send('group with this name exists')
	}
	return res.json(group.data())
})

app.post('/addUserToGroup', async (req, res) => {
	const group = await addUserToGroup(req.body.username, req.body.groupname)
	if (!group) {
		return res.status(404).send('group or user dont exist')
	}


	return res.json(group.data())
})


// Creates and returns group, returns null if group exists
const createGroup = async (groupname) => {
	if (await getGroup(groupname)) {
		return null
	}

	const groupCollection = db.collection('groups')
  const newGroupDoc = groupCollection.doc()
	await newGroupDoc.set({
		groupname: groupname,
		users: []
	})

	return (await groupCollection.where('groupname', '==', groupname).limit(1).get()).docs[0]
}

const getGroup = async (groupname) => {
	const groupCollection = db.collection('groups')
	const query = await groupCollection.where('groupname', '==', groupname).limit(1).get()

	if (query.empty) {
		return null
	}
	return query.docs[0]
}

const addUserToGroup = async (username, groupname) => {
	const group = await getGroup(groupname)
	if (!group) {
		return null
	}

	const user = await getUser(username)
	if (!user) {
		return null
	}

	group.ref.update({
		users: FieldValue.arrayUnion(username)
	})

	user.ref.update({
		groups: FieldValue.arrayUnion(groupname)
	})

	return await getGroup(groupname)
}

app.get('/getAllUsers', async (req, res) => {
	const snapshot = await db.collection('users').get()
	const allUsers = snapshot.docs.map((doc) => doc.data())
	res.json(allUsers)
})

app.get('/getAllGroups', async (req, res) => {
	const snapshot = await db.collection('groups').get()
	const allGroups = snapshot.docs.map((doc) => doc.data())
	res.json(allGroups)
})

// Start the server
app.listen(3000, () => {
	console.log('Server started on port 3000')
})
