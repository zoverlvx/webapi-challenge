const express = require("express");
const helmet = require("helmet");
const projectRouter = require("./data/helpers/projectModel");

const server = express();

server.use(express.json());
server.use(helmet());
server.use("/api/projects", projectRouter);

server.get("/", async (req, res) => {
	res.send(`
		<p>Server runs</p>
	`)
});

module.exports = server;
