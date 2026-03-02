const mongoose = require("mongoose");

const decisionSchema = new mongoose.Schema({
  title: String,
  category: String,
  pros: Number,
  cons: Number,
  financialImpact: String,
  emotionalLevel: Number,
  researchDone: Boolean,
  urgency: String,
  confidenceScore: Number,
  riskScore: Number,
  logicScore: Number,
  biasScore: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Decision", decisionSchema);