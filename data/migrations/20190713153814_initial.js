exports.up = async function(knex) {
	await knex.schema.createTable("users", (table) => {
		table.increments("id")
		table.text("username", 128).unique().notNull()
	})
	
	await knex.schema.createTable("posts", (table) => {
		table.increments("id")
		table.text("contents")
		table.integer("user_id")
			.unsigned()
			.notNull()
			.references("id")
			.inTable("users")
			.onUpdate("CASCADE")
			.onDelete("CASCADE")
	})
}

exports.down = async function(knex) {
	await knex.schema.dropTableIfExists("posts")
	await knex.schema.dropTableIfExists("users")
}
