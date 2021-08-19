const express = require("express");
const app = express();

const flips = require("./data/flips-data");
const counts = require("./data/counts-data");

const flipsRouter = require("./flips/flips.router");
const countsRouter = require("./counts/counts.router");

app.use(express.json());

app.use("/flips", flipsRouter);
app.use("/counts", countsRouter);

// Not found handler
app.use((request, response, next) => {
  next({ status: 404, message: `Not found: ${request.originalUrl}` });
});

// Error handler
app.use((error, request, response, next) => {
  console.error(error);
  const { status = 500, message = "Something went wrong!" } = error;
  response.status(status).json({ error: message });
});

module.exports = app;