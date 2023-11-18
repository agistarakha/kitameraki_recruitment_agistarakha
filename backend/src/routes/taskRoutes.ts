import express from "express";
export const router = express.Router();

router.get("/", (req, res) => {
  res.json([
    {
      id: 1,
      title: "Title",
      descriptions: "Desc",
    },
  ]);
});

router.post("/", (req, res) => {
  const data = req.body;
  console.log(data);
  res.status(201).json({ message: "Success adding task" });
});
