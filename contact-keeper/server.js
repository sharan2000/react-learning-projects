const express = require("express");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.port || 5000;

connectDB();

// initializing middleware to use request body
app.use(express.json({ extended: false }));

app.listen(PORT, () => {
  console.log(`server started on port : ${PORT}`);
});

app.use("/api/users", require("./routes/users"));
app.use("/api/contacts", require("./routes/contacts"));
app.use("/api/auth", require("./routes/auth"));

app.get("/", (req, res) => {
  res.json({ message: "hello there" });
});
