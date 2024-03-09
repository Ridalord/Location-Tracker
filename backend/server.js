const express = require("express");
const { connectToMongoDB } = require("./config/db");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

// Handling uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(
    `Error: ${err.message}\n`,
    "Shutting down the server for handling uncaught exception"
  );
});

const app = express();
connectToMongoDB();

// Routes
const user = require("./routes/user");

app.use(express.json());
app.use("/api/user", user)


app.get("/", (_, res) => {
  res.status(200).send("Hey there!");
});

app.get("*", (_, res) => {
  res.status(404).send("Route Not Found!");
});

app.listen(PORT, () => {
  console.log("Server is running on PORT", PORT);
});

// unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Shutting down the server for ${err.message}`);
  console.log(`shutting down the server for unhandle promise rejection`);

  server.close(() => {
    process.exit(1);
  });
});
