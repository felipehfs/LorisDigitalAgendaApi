const Profile = require("../models/profile");

exports.create = async function(req, res) {
  try {
    const profile = new Profile(req.body);
    profile.owner = req.user.id;
    const savedProfile = await profile.save();
    res.json(savedProfile);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getProfile = async function(req, res) {
  try {
    const saved = await Profile.findOne({ owner: req.user.id });
    res.json(saved);
  } catch (err) {
    res.status(501).json(err);
  }
};

exports.update = async function(req, res) {
  try {
    const updated = await Profile.findOneAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(201).json(updated);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
};
