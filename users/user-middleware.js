const db = require("../data/config")
const userModel = require("./user-model")

function validateUserId() {
	return async (req, res, next) => {
		try {
			const { id } = req.params
			const user = await userModel.getByID(id)

			if (!user) {
				return res.status(404).json({
					message: "User not found",
				})
			}

			req.user = user
			next()
		} catch(err) {
			next(err)
		}
	}
}

module.exports = {
	validateUserId,
}
