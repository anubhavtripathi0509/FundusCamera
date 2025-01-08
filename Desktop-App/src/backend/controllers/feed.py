import io
import numpy as np
from PIL import Image


def is_raspberry_pi():
    try:
        with open("/sys/firmware/devicetree/base/model") as f:
            return "Raspberry Pi" in f.read()
    except FileNotFoundError:
        return False


def generate_frames(zoom_factor=3.0):
    if not is_raspberry_pi():
        raise EnvironmentError("This code can only be executed on a Raspberry Pi.")
    else:
        from picamera2 import (  # type: ignore
            Picamera2,
        )

        picam2 = Picamera2()

        config = picam2.create_video_configuration(main={"size": (640, 480)})
        picam2.configure(config)

        picam2.start()

        # Adjust the focus and other camera settings (if the sensor supports it)
        picam2.set_controls({"AfMode": 2})  # Enable continuous autofocus mode

        try:
            while True:
                # Capture a frame as a numpy array
                frame = picam2.capture_array()

                # Apply zoom by resizing the frame (simulating a digital zoom effect)
                if zoom_factor > 1.0:
                    height, width, _ = frame.shape
                    new_width = int(width / zoom_factor)
                    new_height = int(height / zoom_factor)

                    # Calculate the cropping box to center the zoom
                    start_x = (width - new_width) // 2
                    start_y = (height - new_height) // 2

                    # Crop the frame to the zoomed-in region
                    frame = frame[
                        start_y : start_y + new_height, start_x : start_x + new_width
                    ]

                    # Resize the cropped frame back to the original resolution
                    frame = np.array(
                        Image.fromarray(frame).resize((width, height), Image.LANCZOS)
                    )

                # Convert the frame to a Pillow image
                img = Image.fromarray(frame)

                # Ensure the image is in RGB mode
                if img.mode == "RGBA":
                    img = img.convert("RGB")

                # Save the frame as JPEG
                stream = io.BytesIO()
                img.save(stream, format="JPEG")

                # Prepare the JPEG stream for HTTP response
                stream.seek(0)
                yield b"--frame\r\nContent-Type: image/jpeg\r\n\r\n" + stream.read() + b"\r\n"

                # Reset the stream for the next frame
                stream.seek(0)
                stream.truncate()
        finally:
            picam2.stop()
