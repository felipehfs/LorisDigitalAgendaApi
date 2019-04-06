const Journal = require("../models/journal");
const sentimental = require("sentiment-ptbr");

exports.create = async function(req, res) {
  try {
    const journal = new Journal(req.body);
    journal.owner = req.user.id;
    journal.sentimentalAnalysis = sentimental(
      req.body.description,
      require("../config/afinn.json")
    ).score;
    const saved = await journal.save();
    res.status(201).json(saved);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.findJournalById = async function(req, res) {
  try {
    const journal = await Journal.findOne({
      owner: req.user.id,
      removed: false,
      _id: req.params.id
    });
    res.json(journal);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getUserJournals = async function(req, res) {
  try {
    const journals = await Journal.find({
      filed: false,
      owner: req.user.id,
      removed: false
    }).sort("-createdAt");
    res.json(journals);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.getAllJournals = async function(req, res) {
  try {
    const journals = await Journal.find({ owner: req.user.id, removed: false }).sort("-createdAt");
    res.json(journals);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getArchivedJournals = async function(req, res) {
  try {
    const result = await Journal.find({
      owner: req.user.id,
      removed: false,
      filed: true
    }).sort("-createdAt");
    res.json(result);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.changeJournal = async function(req, res) {
  try {
    const result = await Journal.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      { $set: req.body },
      { new: true }
    );
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};
