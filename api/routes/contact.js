const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const contactController = require("../controllers/contact");

router.get("/", contactController.getAllContactController);

router.post("/", contactController.postNewContactController);

router.get("/:id", contactController.getSingleContact);

router.delete("/:id", contactController.deleteContact);

router.put("/:id", contactController.editContact);

module.exports = router;
