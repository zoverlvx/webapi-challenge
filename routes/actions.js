const express = require("express");
const db = require("../data/helpers/actionModel");
const projectDb = require("../data/helpers/projectModel");

const router = express.Router();

router.get("/", async (req, res) => {
	try {
		const actions = await db.get();
		res.status(200).json(actions);
	} catch (error) {
		res.status(500).json({error: "Error retrieving actions."});
	}
});

router.post("/", async (req, res) => {
	const {project_id, description, notes, completed} = req.body;
	const projects = await projectDb.get()
	const ids = projects.map(project => project.id)
	console.log(ids);
	try {
		if (ids.includes(project_id)) {
			const action = db.insert({
				project_id, 
				description, 
				notes, 
				completed
			});
			res.status(201).json(action);
		}
		if (!ids.includes(project_id)) {
			res.status(404).json({
				message: "Cannot add action to project that doesn't exist"
			})
		}
	} catch (error) {
		res.status(500).json({
			error: "Error adding action"
		})
	}
});

router.put("/:id", async (req, res) => {
	const {project_id, description, notes, completed} = req.body;

	try {
		const actionToUpdate = await db.update(
			req.params.id, 
			{project_id, description, notes, completed}
		);
		if (actionToUpdate) {
			res.status(200).json(actionToUpdate)
		}

		if (!actionToUpdate) {
			res.status(404).json({error: "The action could not be found"});
		}
	} catch (error) {
		res.status(500).json({error: "Error updating action"});
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const action = await db.remove(req.params.id);
		if (action > 0) {
			res.status(200).json({message: "The action has been deleted"});
		}
		if (project <= 0) {
			res.status(404).json({message: "The action could not be found"});
		}
	} catch (error) {
		res.status(500).json({error: "Error removing the action"})
	}
});

module.exports = router;
