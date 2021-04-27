const express = require("express")
const db = require("../data/config")
const userModel = require("./user-model")
const { validateUserId } = require("./user-middleware")

const router = express.Router()

router.get("/users", async (req, res, next) => {
	try {
		res.json(await db.getAll())
	} catch(err) {
		next(err)
	}
})

router.get("/users/:id", validateUserId(), async (req, res, next) => {
	try {
		res.json(req.user)
	} catch(err) {
		next(err)
	}
})

router.post("/users", async (req, res, next) => {
	try {
		const [id] = await userModel.create(req.body)
		const user = await userModel.getByID(id)

		res.status(201).json(user)
	} catch(err) {
		next(err)
	}
})

router.put("/users/:id", validateUserId(), async (req, res, next) => {
	try {
		const { id } = req.params
		await userModel.update(id, req.body)
		const user = await userModel.getByID(id)
		
		res.json(user)
	} catch(err) {
		next(err)
	}
})

router.delete("/users/:id", validateUserId(), async (req, res, next) => {
	try {
		const { id } = req.params
		await deleteByID(id)

		res.status(204).end()
	} catch(err) {
		next(err)
	}
})

router.get("/users/:id/posts", async (req, res, next) => {
	try {
		const posts = await userModel.findPostsByUserID(req.params.id)
		res.json(posts)
	} catch (err) {
		next(err)
	}
})

module.exports = router
