# 🌸 Iris Flower Classifier

This project is a web-based application that predicts the species of an Iris flower based on its sepal and petal dimensions. It consists of two main parts: the **Backend** (API and model training) and the **Frontend** (React-based user interface).

---

## 🛠️ Backend

The backend is built using **Flask** and serves as the API for predictions. It also includes a script to train the KNN model using the Iris dataset.

### 📂 Folder Structure

backend/ ├── app.py # Flask API for predictions ├── train_model.py # Script to train the KNN model ├── requirements.txt # Python dependencies └── model/ ├── knn_model.pkl # Trained KNN model └── scaler.pkl # Scaler for feature standardization

### 🚀 Steps to Run the Backend

1. **Install Dependencies**  
   Navigate to the `backend` folder and install the required Python packages:

   ```bash
   pip install -r requirements.txt
   ```

2. Train the Model
   Run the train_model.py script to train the KNN model and save it:

   ```bash
   python train_model.py
   ```

3. Start the Flask API
   Run the app.py file to start the backend server:
   ```bash
   python app.py
   ```

The API will be available at `http://localhost:5000`.

4. **API Endpoints**
   - **GET** `/`: Health check route.
   - **POST** `/predict`: Accepts JSON input with flower dimensions and returns the predicted species.

---

## 🌐 Frontend

The frontend is built using **React** and styled with **Tailwind CSS**. It provides a user-friendly interface to input flower dimensions and view predictions.

📂 Folder Structure
frontend/
├── .gitignore # Ignored files for Git
├── index.html # Main HTML file
├── package.json # Project metadata and dependencies
├── vite.config.js # Vite configuration
├── src/
│ ├── App.jsx # Main React component
│ ├── index.css # Tailwind CSS styles
│ ├── main.jsx # Entry point for React
│ └── components/
│ └── FlowerForm.jsx # Form for user input and predictions
└── public/
└── iris.png # Favicon for the app

🚀 Steps to Run the Frontend

1. Install Dependencies
   Navigate to the frontend folder and install the required npm packages:
   ```
   npm install
   ```
2. **Start the Development Server**
   Run the following command to start the frontend:

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`.

3. **Build for Production**
   To build the frontend for production, run:
   ```bash
   npm run build
   ```

---

📝 **How It Works**

1. The user enters the sepal and petal dimensions in the form on the frontend.
2. The frontend sends the data to the backend API.
3. The backend scales the input, predicts the species using the trained KNN model, and returns the result.
4. The frontend displays the predicted species or an error message.

---

🎉 **Features**

- **Backend**: Flask API with a trained KNN model.
- **Frontend**: Responsive React UI styled with Tailwind CSS.
- **Validation**: Ensures all inputs are non-negative and required fields are filled.
- **Error Handling**: Displays appropriate error messages for invalid inputs or server issues.

---

Enjoy predicting Iris flower species! 🌼
