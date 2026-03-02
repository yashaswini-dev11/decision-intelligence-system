const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const Decision = require("./models/Decision");

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log("DB Connection Error:", err));

app.get("/", (req, res) => {
  res.send("Decision Intelligence API Running 🚀");
});

// ANALYZE ROUTE
app.post("/analyze", async (req, res) => {
  try {
    const {
      title,
      category,
      pros,
      cons,
      financialImpact,
      emotionalLevel,
      researchDone,
      urgency
    } = req.body;

    let riskScore = 0;
    let logicScore = 0;
    let biasScore = 0;

    if (cons > pros) riskScore += 30;
    if (financialImpact === "High") riskScore += 25;
    if (urgency === "High") riskScore += 15;

    if (pros > cons) logicScore += 30;
    if (researchDone) logicScore += 25;
    if (financialImpact === "Low") logicScore += 15;

    if (emotionalLevel >= 4) biasScore += 30;
    if (!researchDone) biasScore += 20;

    let confidenceScore = Math.max(0, logicScore - riskScore - biasScore);
    if (confidenceScore > 100) confidenceScore = 100;

    const newDecision = new Decision({
      title,
      category,
      pros,
      cons,
      financialImpact,
      emotionalLevel,
      researchDone,
      urgency,
      confidenceScore,
      riskScore,
      logicScore,
      biasScore
    });

    await newDecision.save();

    res.json({
      confidenceScore,
      riskScore,
      logicScore,
      biasScore
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// HISTORY ROUTE (Correct Placement)
app.get("/history", async (req, res) => {
  try {
    const decisions = await Decision.find().sort({ createdAt: -1 });
    res.json(decisions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

const PORT = 5000;
app.delete("/delete/:id", async (req, res) => {
  try {
    await Decision.findByIdAndDelete(req.params.id);
    res.json({ message: "Decision deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});