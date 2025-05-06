import { useState } from "react";
import axios from "axios";

const FlowerForm = () => {
  const [formData, setFormData] = useState({
    sepal_length: "",
    sepal_width: "",
    petal_length: "",
    petal_width: "",
  });

  const [prediction, setPrediction] = useState("");
  const [error, setError] = useState("");
  const [validationMsg, setValidationMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    const floatValue = parseFloat(value);

    setFormData({ ...formData, [name]: value });

    if (floatValue < 0) {
      setValidationMsg(`${name.replace("_", " ")} should not be less than 0`);
    } else {
      setValidationMsg("");
    }
  };

  const isInvalid = Object.values(formData).some(
    (val) => val === "" || parseFloat(val) < 0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isInvalid) {
      setError("Please fill all fields with non-negative numbers.");
      return;
    }

    try {
      const res = await axios.post(
        "https://iris-flower-predictor-8x7m.onrender.com/predict",
        formData
      );
      setPrediction(res.data.prediction);
      setError("");
    } catch (err) {
      setError("Prediction failed. Please try again.");
      setPrediction("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-pink-100 to-yellow-100 px-4 py-10">
      <div className="w-full max-w-2xl bg-white/60 backdrop-blur-md rounded-xl shadow-2xl p-10 border border-white/40">
        <h2 className="text-4xl font-extrabold text-center text-purple-700 mb-8 drop-shadow-lg">
          <p>🌼</p>
          <span>Iris Flower Predictor</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {["sepal_length", "sepal_width", "petal_length", "petal_width"].map(
              (field, index) => (
                <input
                  key={index}
                  type="number"
                  step="any"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  placeholder={field.replace("_", " ").toUpperCase()}
                  className="px-4 py-3 rounded-lg bg-white/90 border border-gray-300 shadow-inner placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                />
              )
            )}
          </div>

          {validationMsg && (
            <p className="text-center text-sm text-red-600 font-semibold">
              ⚠️ {validationMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={isInvalid}
            className={`w-full py-3 rounded-lg text-white font-semibold text-lg tracking-wide transition-all duration-300 transform ${
              isInvalid
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700 hover:scale-105 shadow-md"
            }`}
          >
            🔍 Predict Flower Species
          </button>
        </form>

        {prediction && (
          <div className="mt-6 text-center bg-green-100 border border-green-300 text-green-900 font-semibold p-4 rounded-md shadow-inner">
            ✅ Predicted Species:{" "}
            <span className="uppercase text-green-800">{prediction}</span>
          </div>
        )}

        {error && (
          <div className="mt-6 text-center bg-red-100 border border-red-300 text-red-800 font-semibold p-4 rounded-md shadow-inner">
            ❌ {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default FlowerForm;
