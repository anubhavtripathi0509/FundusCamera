import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

import usePatients from "../hooks/usePatients";

const CameraPage = () => {
  const videoRef = useRef(null);

  const id = useParams().id || "";
  const navigate = useNavigate();

  const { addImage } = usePatients();

  const capture = async () => {
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const image = canvas.toDataURL("image/jpeg");
    await addImage(image, id);
    navigate(-1);
  };

  useEffect(() => {
    const video = videoRef.current;
    video.src = "http://127.0.0.1:5000/feed";
    video.play();

    return () => {
      video.pause();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="relative bg-gray-800 h-screen overflow-hidden pb-10">
      <div className="flex justify-center items-center h-full">
        <div className="flex justify-center items-center gap-10">
          <div className="flex flex-col gap-4 items-center">
            <video
              ref={videoRef}
              className="h-[50vh] w-[50vw] object-cover bg-white border-4 border-white"
              style={{
                clipPath: "circle(40% at 50% 50%)",
              }}
              autoPlay
            />
            <button
              onClick={capture}
              className="mt-10 p-2 w-1/3 text-gray-800 border border-white rounded-full p-2"
            >
              <div className="rounded-full px-4 py-2">
                <p className="text-center text-white text-xl">Capture</p>
              </div>
            </button>
          </div>
          <div className="flex flex-col gap-4 text-white">
            <button
              className="hover:bg-blue-500 border text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                videoRef.current.style.transform = "scale(1.5)";
              }}
            >
              Zoom In
            </button>
            <button
              className="hover:bg-blue-500 border text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                videoRef.current.style.transform = "scale(1.5)";
              }}
            >
              Zoom Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CameraPage;