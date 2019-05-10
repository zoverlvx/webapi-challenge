const express = require("express");
const db = require("../data/helpers/projectModel");

const router = express.Router();

router.get("/", async (req, res) => {
	try {
		const projects = await db.get();
		res.status(200).json(projects);
	} catch (error) {
		res.status(500).json({error: "Error retrieving projects."});
	}
});

module.exports = router;
