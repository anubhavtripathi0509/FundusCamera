import os

import numpy as np
from skimage.io import imread
from skimage.transform import resize

base_dir = os.path.dirname(os.path.abspath(__file__))

db_model_comp = os.path.join(base_dir, 'models', 'DB_model.p.gz')
db_model = os.path.join(base_dir, 'models', 'DB_model.p')

print('Model loaded. Check http://127.0.0.1:5000/')

def diabetic_retinopathy(img):
    flat_data = []

    img = imread(img)
    img_resized = resize(img, (150,150,3))

    flat_data.append(img_resized.flatten())
    flat_data = np.array(flat_data)

    y_out = db_model.predict(flat_data)
    y_out = db_model.predict(flat_data)

    best_model = db_model.best_estimator_

    print(f"Model parameters: {best_model.get_params()}")
    print("Shape of y_out:", y_out.shape)
    print("Values of y_out:", y_out)
    
    if y_out == 0:
        result = 'Mild'
    elif y_out == 1:
        result = 'Moderate'
    elif y_out == 2:
        result = 'No_DR'
    elif y_out == 3:
        result = 'Proliferate_DR'
    else:
        result = 'Severe'

    return result