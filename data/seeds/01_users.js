exports.seed = async function(knex) {
	await knex("users").insert([
		{ username: "lao_tzu" },
		{ username: "socrates" },
		{ username: "seneca" },
	])
}
