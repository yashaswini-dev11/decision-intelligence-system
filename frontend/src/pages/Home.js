import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    
    title: "",
    category: "",
    pros: 0,
    cons: 0,
    financialImpact: "Low",
    emotionalLevel: 1,
    researchDone: false,
    urgency: "Low"
    
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/analyze",
        formData
      );
      setLoading(false);

      navigate("/result", { state: response.data });

    } catch (error) {
        setLoading(false);
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      <h1>Decision Intelligence</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Decision Title"
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="text"
          name="category"
          placeholder="Category"
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="number"
          name="pros"
          placeholder="Number of Pros"
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="number"
          name="cons"
          placeholder="Number of Cons"
          onChange={handleChange}
          required
        />
        <br /><br />

        <div style={{ marginTop: "15px", marginBottom: "20px" }}>
  <label style={{ fontWeight: "500", display: "block", marginBottom: "8px" }}>
    Financial Impact
  </label>

  <select
    name="financialImpact"
    onChange={handleChange}
    style={{
      width: "100%",
      padding: "8px",
      borderRadius: "6px",
      border: "1px solid #ccc"
    }}
  >
    <option value="Low">Low</option>
    <option value="High">High</option>
  </select>
</div>
        <br /><br />

        <div style={{ marginTop: "15px", marginBottom: "20px" }}>
  <label style={{ fontWeight: "500", display: "block", marginBottom: "8px" }}>
    Urgency Level
  </label>

  <select
    name="urgency"
    onChange={handleChange}
    style={{
      width: "100%",
      padding: "8px",
      borderRadius: "6px",
      border: "1px solid #ccc"
    }}
  >
    <option value="Low">Low</option>
    <option value="High">High</option>
  </select>
</div>
        <br /><br />

        <label>
          Emotional Level (1-5):
          <input
            type="number"
            name="emotionalLevel"
            min="1"
            max="5"
            onChange={handleChange}
          />
        </label>
        <br /><br />

      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
  <p style={{ fontWeight: "500", marginBottom: "8px" }}>
    Research Done
  </p>

  <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
    <input
      type="checkbox"
      name="researchDone"
      onChange={handleChange}
      style={{
        margin: 0,
        marginRight: "10px",
        width: "18px",
        height: "18px"
      }}
    />
    Yes, I have done proper research
  </label>
</div>
        <br /><br />

        <button className="primary-btn" type="submit" disabled={loading}>{loading ? "Analyzing..." : "Analyze Decision"}</button>
      </form>
    </div>
  );
}

export default Home;