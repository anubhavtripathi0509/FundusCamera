import base64
import os
import sqlite3

def add_doctor(doctor, db_dir):
    db_path = os.path.join(db_dir, 'netrax.db')

    doctor_data = (
        doctor['first_name'],
        doctor['last_name'],
        doctor['speciality'],
        doctor['contact']
    )
    
    try:
        conn = sqlite3.connect(db_path)
        c = conn.cursor()
        c.execute('''INSERT INTO Doctors (
            first_name, last_name, speciality, contact
        ) VALUES (?, ?, ?, ?)''', doctor_data)
        conn.commit()
    except sqlite3.Error as e:
        print(f"An error occurred: {e}")
    finally:
        if conn:
            conn.close()

def get_doctor(doc_id, db_dir):
    db_path = os.path.join(db_dir, 'netrax.db')

    result = {}

    try:
        conn = sqlite3.connect(db_path)
        conn.row_factory = sqlite3.Row 
        c = conn.cursor()
        c.execute('''SELECT * FROM Doctors WHERE doc_id = ?''', (doc_id,))
        row = c.fetchone()
        result = dict(row)
    except sqlite3.Error as e:
        print(f"An error occurred: {e}")
    finally:
        if conn:
            conn.close()
    
    return result

def get_all_doctors(db_dir):
    db_path = os.path.join(db_dir, 'netrax.db')

    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    query = "SELECT * FROM Doctors"
    cursor.execute(query)
    
    columns = [column[0] for column in cursor.description]
    results = cursor.fetchall()
    
    doctors = []
    for row in results:
        doctor = dict(zip(columns, row))
        doctors.append(doctor)
    
    conn.close()

    return doctors
