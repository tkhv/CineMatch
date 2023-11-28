const express = require('express')
const cors = require('cors')
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app')
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore')
const serviceAccount = require('./credentials/cinematch-7e963-firebase-adminsdk-zyvl3-fa0f5e1654.json')

const app = express()



initializeApp({
	credential: cert(serviceAccount),
})

const db = getFirestore()

app.use(cors({origin: '*'}))

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

const addMovie = async (username,movie) => {
	const user = await getUser(username)
	if (!user) {
		return null
	}
	user.ref.update({
		movies: FieldValue.arrayUnion(movie)
	})
	if(user.data().groups!=null){
		const groupnames = Array.from(user.data().groups)
		for (let groupname of groupnames) {
			await addMovieToGroup(groupname,movie)
		}
	}
	return await getUser(username)
}

const addMovieToGroup = async (groupname,movie) => {
	const group = await getGroup(groupname)
	if (!group) {
		return null
	}
	group.ref.update({
		movies: FieldValue.arrayUnion(movie)
	})
	return await getGroup(groupname)
}

app.post('/addMovieToUser', async (req, res) => {
	const user = await addMovie(req.body.username,req.body.movie)
	
	if (!user) {
		return res.status(409).send('Movie couldnt be added')
	}
	return res.json(user.data())
})


const topUserGenre = async (username) => {
	const user = await getUser(username)
	if (!user) {
		return null
	}
	const movieNums = Array.from(user.data().movies)
	if(movieNums.length == 0)
        return null;
    var modeMap = {};
    var maxEl = movieNums[0], maxCount = 1;
    for(var i = 0; i < movieNums.length; i++)
    {
        var el = movieNums[i];
        if(modeMap[el] == null)
            modeMap[el] = 1;
        else
            modeMap[el]++;  
        if(modeMap[el] > maxCount)
        {
            maxEl = el;
            maxCount = modeMap[el];
        }
    }
	var maxEl2 = movieNums[0], maxCount2 = 0;
    for(var i = 0; i < movieNums.length; i++)
    {
        var el = movieNums[i];
		if(el==maxEl)continue;  
        if(modeMap[el] > maxCount2)
        {
            maxEl2 = el;
            maxCount2 = modeMap[el];
        }
    }
	var maxEl3 = movieNums[0], maxCount3 = 0;
    for(var i = 0; i < movieNums.length; i++)
    {
        var el = movieNums[i];
		if(el==maxEl)continue; 
		if(el==maxEl2)continue;  
        if(modeMap[el] > maxCount3)
        {
            maxEl3 = el;
            maxCount3 = modeMap[el];
        }
    }
	const sol = [maxEl,maxEl2,maxEl3];
    return sol;
}

app.get('/topUserGenre', async (req, res) => {
	const val = await topUserGenre(req.body.username)
	if (!val) {
		return res.status(409).send('No favorite genre')
	}
	return res.json(val)
})

const topGroupGenre = async (groupname) => {
	const group = await getGroup(groupname)
	if (!group) {
		return null
	}
	const movieNums = Array.from(group.data().movies)
	if(movieNums.length == 0)
        return null;
    var modeMap = {};
    var maxEl = movieNums[0], maxCount = 0;
    for(var i = 0; i < movieNums.length; i++)
    {
        var el = movieNums[i];
        if(modeMap[el] == null)
            modeMap[el] = 1;
        else
            modeMap[el]++;  
        if(modeMap[el] > maxCount)
        {
            maxEl = el;
            maxCount = modeMap[el];
        }
    }
	var maxEl2 = movieNums[0], maxCount2 = 0;
    for(var i = 0; i < movieNums.length; i++)
    {
        var el = movieNums[i];
		if(el==maxEl)continue;  
        if(modeMap[el] > maxCount2)
        {
            maxEl2 = el;
            maxCount2 = modeMap[el];
        }
    }
	var maxEl3 = movieNums[0], maxCount3 = 1;
    for(var i = 0; i < movieNums.length; i++)
    {
        var el = movieNums[i];
		if(el==maxEl)continue; 
		if(el==maxEl2)continue;  
        if(modeMap[el] > maxCount3)
        {
            maxEl3 = el;
            maxCount3 = modeMap[el];
        }
    }
	const sol = [maxEl,maxEl2,maxEl3];
    return sol;
}

app.get('/topGroupGenre', async (req, res) => {
	const val = await topGroupGenre(req.body.groupname)
	if (!val) {
		return res.status(409).send('No favorite genre')
	}
	return res.json(val)
})

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

const PORT = process.env.PORT || 8080;

// Start the server
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`)
})