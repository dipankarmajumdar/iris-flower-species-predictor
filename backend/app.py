from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS

# Initialize app
app = Flask(__name__)
CORS(app) # Allow cross-origin requests from frontend

# Load the trained model and scaler
model = joblib.load("./model/knn_model.pkl")
scaler = joblib.load("./model/scaler.pkl")

# Health check route
@app.route("/")
def index():
    return jsonify({"message":"Iris Flower Classifier API is Running!"})

# Predict route
@app.route("/predict", methods=['POST'])
def predict():
    try:
        data = request.get_json()

        features = [
            data["sepal_length"],
            data["sepal_width"],
            data["petal_length"],
            data["petal_width"]
        ]

        features_scaled = scaler.transform([features])
        prediction = model.predict(features_scaled)[0]

        target_names = ["setosa", "versicolor", "virginica"]
        predicted_species = target_names[prediction]

        return jsonify({
            'prediction': predicted_species
        })
    except Exception as e:
        return jsonify({"error":str(e)})

if __name__=="__main__":
    app.run(debug=True)