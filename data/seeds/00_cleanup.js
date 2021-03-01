exports.seed = async function(knex) {
	await knex("posts").truncate()
	await knex("users").truncate()
}
