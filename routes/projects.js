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

router.get("/:id/actions", async (req, res) => {
	try {
		const actions = await db.getProjectActions(req.params.id);
		if (actions) {
			res.status(200).json(actions);
		}
		if (!actions) {
			res.status(404).json({message: "Project not found"})
		}
	} catch (error) {
		res.status(500).json({error: "The project information could not be retrieved"})
	}
})

router.post("/", async (req, res) => {
	const {name, description, completed} = req.body;
	try {
		const project = db.insert({name, description, completed});
		res.status(201).json(project);
	} catch (error) {
		res.status(500).json({
			error: "Error adding project"
		})
	}
});

router.put("/:id", async (req, res) => {
	const {name, description, completed} = req.body;
	try {
		const projectToUpdate = await db.update(req.params.id, {name, description, completed})
		if (projectToUpdate) {
			res.status(200).json(projectToUpdate)
		}

		if (!projectToUpdate) {
			res.status(404).json({error: "The project could not be found"});
		}
	} catch (error) {
		res.status(500).json({error: "Error updating project"});
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const project = await db.remove(req.params.id);
		if (project > 0) {
			res.status(200).json({message: "The project has been deleted"});
		}
		if (project <= 0) {
			res.status(404).json({message: "The project could not be found"});
		}
	} catch (error) {
		res.status(500).json({error: "Error removing the project"})
	}
})

module.exports = router;
