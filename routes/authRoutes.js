const {login, verifyJWT} = require("../controllers/authController");
const express = require("express");

const router = express.Router();

router.post("/login", login);
router.get("/me", verifyJWT);

module.exports = router;