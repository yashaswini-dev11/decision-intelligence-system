import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function History() {
  const [decisions, setDecisions] = useState([]);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/delete/${id}`);

    // Remove deleted item from UI
    setDecisions(decisions.filter((d) => d._id !== id));

  } catch (error) {
    console.error("Delete Error:", error);
  }
};

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get("http://localhost:5000/history");
        setDecisions(response.data);
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="container">
      <h1>Decision History</h1>
      <br /><br />

      {decisions.length === 0 ? (
        <p>No decisions found.</p>
      ) : (
        decisions.map((decision) => (
          
            <div key={decision._id}className="card">
          
            <h3>{decision.title}</h3>
            <p>Category: {decision.category}</p>
            <p>Confidence: {decision.confidenceScore}</p>
            <p>Risk: {decision.riskScore}</p>
            <p>Logic: {decision.logicScore}</p>
            <p>Bias: {decision.biasScore}</p>
            <button
  className="danger-btn"
  onClick={() => handleDelete(decision._id)}
>
  Delete
</button>
          </div>
        ))
      )}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
  <button
    className="secondary-btn"
    onClick={() => navigate("/")}
  >
    Back to Home
  </button>
</div>
    </div>
  );
  
}

export default History;