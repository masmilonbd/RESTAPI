const Contact = require("../models/Contact");

const getAllContactController = (req, res, next) => {
  Contact.find()
    .then((data) => {
      result = data;
      res.status(200).json({
        message: "Your data has been fetched",
        data,
      });
    })
    .catch((err) => res.send("Error " + err));
};

const postNewContactController = (req, res, next) => {
  const contact = new Contact({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
  });

  contact
    .save()
    .then((data) => res.send("Data post successfully to db<br>" + data))
    .catch((err) => res.send("Error <br>" + err));
};

const getSingleContact = (req, res, next) => {
  const id = req.params.id;

  Contact.findById(id)
    .then((contact) => {
      res.status(200).json({
        contact,
      });
    })
    .catch((error) => {
      res.status(404).json({
        message: "Error Occured to find id",
        error: error,
      });
    });
};

const deleteContact = (req, res, next) => {
  const id = req.params.id;

  Contact.findByIdAndRemove(id).then((data) => {
    res.json({ message: "Contact Deleted", data });
  });
};

const editContact = (req, res, next) => {
  const id = req.params.id;

  let updatedContact = {
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
  };

  Contact.findByIdAndUpdate(id, { $set: updatedContact })
    .then((contact) => {
      Contact.findById(contact._id).then((newContact) => {
        res.json({
          message: "Update Successfully",
          data: newContact,
        });
      });
    })
    .catch((error) => {
      res.status(404).json({
        message: "Error Occured to find id",
        error: error,
      });
    });
};

module.exports = {
  getAllContactController,
  postNewContactController,
  getSingleContact,
  deleteContact,
  editContact,
};
