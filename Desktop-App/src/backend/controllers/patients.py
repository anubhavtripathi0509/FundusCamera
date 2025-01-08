import base64
import os
import sqlite3

from datetime import datetime

def create_database(db_dir):
    if not os.path.exists(db_dir):
        os.makedirs(db_dir)
    
    db_path = os.path.join(db_dir, 'netrax.db')
    
    try:
        conn = sqlite3.connect(db_path)
        c = conn.cursor()
        
        c.execute('''CREATE TABLE IF NOT EXISTS Doctors (
            doc_id INTEGER PRIMARY KEY, 
            first_name TEXT,
            last_name TEXT,
            speciality TEXT,
            contact TEXT
        )''')
        
        c.execute('''CREATE TABLE IF NOT EXISTS Patients (
            id INTEGER PRIMARY KEY, 
            first_name TEXT,
            last_name TEXT,
            dob TEXT,
            gender TEXT,
            contact TEXT,
            exam_code TEXT,
            doc_id INTEGER,
            FOREIGN KEY (doc_id) REFERENCES Doctors(doc_id)
        )''')
        
        conn.commit()
    except sqlite3.Error as e:
        print(f"An error occurred: {e}")
    finally:
        if conn:
            conn.close()

def add_patient(patient, db_dir):
    db_path = os.path.join(db_dir, 'netrax.db')

    patient_data = (
        patient['first_name'],
        patient['last_name'],
        patient['dob'],
        patient['gender'],
        patient['contact'],
        patient['exam_code'],
        patient['doc_id']
    )
    
    try:
        conn = sqlite3.connect(db_path)
        c = conn.cursor()
        c.execute('''INSERT INTO Patients (
            first_name, last_name, dob, gender, contact, exam_code, doc_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?)''', patient_data)
        conn.commit()
    except sqlite3.Error as e:
        print(f"An error occurred: {e}")
    finally:
        if conn:
            conn.close()

            
def search_patients(patient_name, db_dir):
    db_path = os.path.join(db_dir, 'netrax.db')

    result = []

    try:
        conn = sqlite3.connect(db_path)
        conn.row_factory = sqlite3.Row 
        c = conn.cursor()
        c.execute('''SELECT * FROM Patients WHERE first_name LIKE ? OR last_name LIKE ?''', 
            (f'%{patient_name}%', f'%{patient_name}%'))
        rows = c.fetchall()
        result = [dict(row) for row in rows]
    except sqlite3.Error as e:
        print(f"An error occurred: {e}")
    finally:
        if conn:
            conn.close()
    
    return result

def get_patient(patient_id, db_dir):
    db_path = os.path.join(db_dir, 'netrax.db')

    result = {}

    try:
        conn = sqlite3.connect(db_path)
        conn.row_factory = sqlite3.Row 
        c = conn.cursor()
        c.execute('''SELECT * FROM Patients WHERE id = ?''', (patient_id,))
        row = c.fetchone()
        result = dict(row)
    except sqlite3.Error as e:
        print(f"An error occurred: {e}")
    finally:
        if conn:
            conn.close()
    
    return result

def delete_patient(patient_id, db_dir):
    db_path = os.path.join(db_dir, 'netrax.db')

    try:
        conn = sqlite3.connect(db_path)
        c = conn.cursor()
        c.execute('''DELETE FROM Patients WHERE id = ?''', (patient_id,))
        conn.commit()
    except sqlite3.Error as e:
        print(f"An error occurred: {e}")
    finally:
        if conn:
            conn.close()

def get_all_patients(db_dir):
    db_path = os.path.join(db_dir, 'netrax.db')

    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    query = "SELECT * FROM Patients"
    cursor.execute(query)
    
    columns = [column[0] for column in cursor.description]
    results = cursor.fetchall()
    
    patients = []
    for row in results:
        patient = dict(zip(columns, row))
        patients.append(patient)

    print(patients)
    
    conn.close()

    return patients


def upload_image(image_data, patient_id, image_dir):
    patient_dir = os.path.join(image_dir, patient_id)
    if not os.path.exists(patient_dir):
        os.makedirs(patient_dir)
    
    image_path = os.path.join(patient_dir, f"{int(datetime.now().timestamp())}.jpeg")
    with open(image_path, "wb") as f:
        f.write(base64.b64decode(image_data.split(',')[1]))  
    
    return image_path

def get_image(image_id, patient_id, image_dir):
    patient_dir = os.path.join(image_dir, patient_id)
    if not os.path.exists(patient_dir):
        return {}

    image_path = os.path.join(patient_dir, f"{image_id}.jpeg")
    with open(image_path, "rb") as f:
        image_data = base64.b64encode(f.read()).decode('utf-8')
        return f"data:image/jpeg;base64,{image_data}"

def get_all_images(patient_id, image_dir):
    patient_dir = os.path.join(image_dir, patient_id)
    if not os.path.exists(patient_dir):
        return {}
    
    images = {}
    for image in os.listdir(patient_dir):
        with open(os.path.join(patient_dir, image), "rb") as f:
            image_data = base64.b64encode(f.read()).decode('utf-8')
            images[image] = f"data:image/jpeg;base64,{image_data}"
    
    return images