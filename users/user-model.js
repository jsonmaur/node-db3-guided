const db = require("../data/config")

function getAll() {
	return db("users")
}

function getByID(userID) {
	return db("users").where("id", userID).first()
}

function create(data) {
	return db("users").insert(data)
}

function update(userID, data) {
	return db("users").where("id", userID).update(data)
}

function deleteByID(userID) {
	return db("users").where("id", userID).del()
}

function findPostsByUserID(userID) {
	return db("posts as p")
		.innerJoin("users as u", "u.id", "p.user_id")
		.where("p.user_id", userID)
		.select("p.id", "p.contents", "u.username")
}

module.exports = {
	getAll,
	getByID,
	create,
	update,
	deleteByID,
	findPostsByUserID,
}