import React, { useState } from "react";
import Navbar from "../Common/Navbar";

const UploadImagePage = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async () => {
    if (!image) {
      alert("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setResult(data);
      } else {
        alert(data.error || "Prediction failed.");
      }
    } catch (error) {
      alert("Error connecting to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-blue-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-green-700 text-center mb-6">
          Upload Image for Prediction
        </h1>
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mb-4"
          />
          <button
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition duration-300"
          >
            {loading ? "Predicting..." : "Submit"}
          </button>

          {result && (
            <div className="mt-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Prediction Result:
              </h2>
              <p className="text-lg text-gray-600">
                Predicted Label: {result.prediction}
              </p>
              <p className="text-lg text-gray-600">
                Confidence: {result.confidence.toFixed(2)}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadImagePage;
