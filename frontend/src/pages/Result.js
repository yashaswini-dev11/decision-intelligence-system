import { useLocation, useNavigate } from "react-router-dom";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state;
  let confidenceColor = "#e74c3c"; // default red

if (data?.confidenceScore >= 50) {
  confidenceColor = "#27ae60"; // green
} else if (data?.confidenceScore >= 25) {
  confidenceColor = "#f39c12"; // orange
}

  if (!data) {
    return (
      <div>
        <h2>No Result Found</h2>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }

 return (
  <div className="container">
    <h1>Decision Analysis Result</h1>

    <div className="score-box">
      <h2
  style={{
    textAlign: "center",
    color: confidenceColor,
    fontSize: "28px"
  }}
>
  Confidence Score: {data.confidenceScore}
</h2>
    </div>

    <div className="card">
      <p><strong>Risk Score:</strong> {data.riskScore}</p>
      <p><strong>Logic Score:</strong> {data.logicScore}</p>
      <p><strong>Bias Score:</strong> {data.biasScore}</p>
    </div>

    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <button
        className="primary-btn"
        onClick={() => navigate("/")}
      >
        Analyze Another
      </button>

      <button
        className="secondary-btn"
        onClick={() => navigate("/history")}
        style={{ marginLeft: "10px" }}
      >
        View History
      </button>
    </div>
  </div>
);
}

export default Result;