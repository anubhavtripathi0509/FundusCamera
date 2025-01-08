import os

from flask import Flask, request, jsonify, Response
from werkzeug.utils import secure_filename
from flask_cors import CORS

import controllers.predict as predict
import controllers.patients as patients
import controllers.doctors as doctors
import controllers.feed as feed

app = Flask(__name__)
CORS(app)

db_dir = os.path.join(app.root_path, "database")
image_dir = os.path.join(app.root_path, "images")
patients.create_database(db_dir)


@app.route("/")
def index():
    return "NetraX API"


@app.route("/predict/diabetic_retinopathy", methods=["POST"])
def predict_diabetic_retinopathy():
    if "file" not in request.files:
        return jsonify({"error": "No file part"})

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"})

    uploads_dir = os.path.join(app.root_path, "uploads")
    if not os.path.exists(uploads_dir):
        os.makedirs(uploads_dir)

    file_path = os.path.join(uploads_dir, secure_filename(file.filename))
    file.save(file_path)

    result = predict.diabetic_retinopathy(file_path)
    return jsonify({"result": result})


@app.route("/patients/add", methods=["POST"])
def add_patient():
    patient = request.json["patient"]
    patients.add_patient(patient, db_dir)
    return jsonify({"message": "Patient added successfully"})


@app.route("/patients/search", methods=["GET"])
def search_patients():
    patient_name = request.args.get("patient_name")
    result = patients.search_patients(patient_name, db_dir)
    return jsonify({"result": result})


@app.route("/patients/all", methods=["GET"])
def get_all_patients():
    result = patients.get_all_patients(db_dir)
    return jsonify({"result": result})


@app.route("/patients/get", methods=["GET"])
def get_patient():
    patient_id = request.args.get("patient_id")
    result = patients.get_patient(patient_id, db_dir)
    return jsonify({"result": result})


@app.route("/patients/delete", methods=["DELETE"])
def delete_patient():
    patient_id = request.args.get("patient_id")
    patients.delete_patient(patient_id, db_dir)
    return jsonify({"message": "Patient deleted successfully"})


@app.route("/doctors/add", methods=["POST"])
def add_doctor():
    doctor = request.json["doctor"]
    doctors.add_doctor(doctor, db_dir)
    return jsonify({"message": "Doctor added successfully"})


@app.route("/doctors/get", methods=["GET"])
def get_doctor():
    doc_id = request.args.get("doc_id")
    result = doctors.get_doctor(doc_id, db_dir)
    return jsonify({"result": result})


@app.route("/doctors/all", methods=["GET"])
def get_all_doctors():
    result = doctors.get_all_doctors(db_dir)
    return jsonify({"result": result})


@app.route("/upload/image", methods=["POST"])
def upload_image():
    data = request.json
    if "image" not in data or "patient_id" not in data:
        return jsonify({"error": "Missing image or patient_id"}), 400

    image_data = data["image"]
    patient_id = data["patient_id"]

    image_path = patients.upload_image(image_data, patient_id, image_dir)
    return jsonify({"message": "Image uploaded successfully", "image_path": image_path})


@app.route("/images/get", methods=["GET"])
def get_image():
    image_id = request.args.get("image_id")
    patient_id = request.args.get("patient_id")
    result = patients.get_image(image_id, patient_id, image_dir)
    return jsonify({"result": result})


@app.route("/images/all", methods=["GET"])
def get_all_images():
    patient_id = request.args.get("patient_id")
    result = patients.get_all_images(patient_id, image_dir)
    return jsonify({"result": result})


@app.route("/feed")
def video_feed():
    return Response(
        feed.generate_frames(), mimetype="multipart/x-mixed-replace; boundary=frame"
    )


if __name__ == "__main__":
    app.run(debug=True)
