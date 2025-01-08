import PropTypes from "prop-types";

const LoadingOverlay = ({ message }) => {
  if (message) {
    return (
      <div className="fixed top-16 right-0 bottom-0 left-0 z-50 flex items-center justify-center w-screen h-screen bg-white bg-opacity-50">
        <div className="flex justify-center items-center space-x-1">
          <svg
            fill="none"
            className="w-16 h-16 text-primary animate-spin mb-16"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
              fill="currentColor"
              fillRule="evenodd"
            />
          </svg>
          <h2 className="text-3xl mb-16">{message}</h2>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

LoadingOverlay.propTypes = {
  message: PropTypes.string,
};

export default LoadingOverlay;
