const mongoose = require("mongoose");

const journalSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  filed: { type: Boolean, default: false },
  removed: { type: Boolean, default: false },
  sentimentalAnalysis: { type: Number },
  stickers: [String]
});

module.exports = mongoose.model("journals", journalSchema);
