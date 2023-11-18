import express from "express";

const app = express();
const port = 3000;
app.get("/", (req, res) => {
  res.status(200).json({ message: "OK" });
});
app.listen(port, () => {
  console.log("App listen to: http://localhost:" + port);
});
