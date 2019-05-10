const express = require("express");
const helmet = require("helmet");
const projectRouter = require("./routes/projects");
const actionRouter = require("./routes/actions");

const server = express();

server.use(express.json());
server.use(helmet());
server.use("/api/projects", projectRouter);
server.use("/api/actions", actionRouter);

server.get("/", async (req, res) => {
	res.send(`
		<p>Server runs</p>
	`)
});

module.exports = server;
