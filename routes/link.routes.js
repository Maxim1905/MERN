const { Router } = require("express");
const Link = require("../models/Link");
const config = require("config");
const auth = require("../middleware/auth.middleware");

const shortid = require("shortid");

const router = Router();
const baseUrl = config.get("baseUrl");

router.post("/generate", auth, async (req, res) => {
  try {
    const { from } = req.body;

    const code = shortid.generate();

    const existing = await Link.findOne({ from });

    if (existing) {
      return res.json({ link: existing });
    }

    const to = baseUrl + "/t/" + code;

    const link = new Link({
      code,
      to,
      from,
      owner: req.user.userId,
    });

    await link.save();

    res.status(201).json({ link });
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId });

    res.json(links);
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
}); // для получения всех ссылок

router.get("/:id", auth, async (req, res) => {
  try {
    const links = await Link.findById(req.params.id);

    res.json(links);
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
}); // для получения ссылок по id

module.exports = router;
