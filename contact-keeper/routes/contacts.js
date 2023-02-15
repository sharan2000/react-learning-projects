const express = require("express");
const router = express.Router();

const Contact = require("../models/Contact");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const auth = require("../middleware/auth");

//@Route    GET    api/contacts
//@desc    Get all contacts of logged in user
//@access    Private
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json({ contacts });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

//@Route    POST    api/contacts
//@desc    add a contact
//@access    Private
router.post(
  "/",
  [auth, [check("name", "Enter a name").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, phone, type } = req.body;
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });

      const contact = await newContact.save();
      res.json({ contact });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//@Route    PUT    api/contacts/:id
//@desc    update contact
//@access    Private
router.put("/:id", [auth], async (req, res) => {
  const { name, email, phone, type } = req.body;

  const contactUpdates = {};
  if (name) contactUpdates.name = name;
  if (email) contactUpdates.email = email;
  if (phone) contactUpdates.phone = phone;
  if (type) contactUpdates.type = type;

  try {
    const contactId = req.params.id;
    const contact = await Contact.findById(contactId);
    // making sure the logged in user owns the contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Unauthorized, Request denied" });
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { $set: contactUpdates },
      { new: true }
    );
    res.json({ updatedContact });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

//@Route    DELETE    api/contacts/:id
//@desc    Delete a contact
//@access    Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const contactId = req.params.id;
    const contact = await Contact.findById(contactId);

    // making sure the logged in user owns the contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Unauthorized, Request denied" });
    }

    await Contact.findByIdAndRemove(contactId);

    res.json({ message: "Contact deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
