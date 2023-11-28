This is a guide file for the backend calls:

post http://localhost:3000/signup:
it takes three values: username(string), password(String), email(string).

post http://localhost:3000/login:
it takes two values: username(string), password(String).

delete http://localhost:3000/deleteUser:
it takes one value: username(string).

post http://localhost:3000/createGroup:
it takes one value: groupname(string).

post http://localhost:3000/addUserToGroup:
it takes two values: username(string), groupname(string).

post http://localhost:3000/addMovieToUser:
it takes two values: username(string), movie(int).

get http://localhost:3000/topUserGenre:
it takes one value: username(string).
it returns a number(int) of the genre.

post http://localhost:3000/topGroupGenre:
it takes one value: groupname(string).
it returns a number(int) of the genre.