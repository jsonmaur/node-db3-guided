const db = require("../data/config")

function findPostsByUserID(id) {
	// translates to `SELECT * FROM posts WHERE user_id = ?;`
	return db("posts")
		// left join if we want to see posts of deleted users, inner join if not
		.leftJoin("users", "users.id", "posts.user_id")
		.where("user_id", id)
		.select("posts.id", "posts.contents", "users.username")
}

module.exports = {
	findPostsByUserID,
}
