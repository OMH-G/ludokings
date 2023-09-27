import React, { useState, useEffect } from "react";
import Tesseract from "tesseract.js";
import Image from "next/image";

export default function OCR(props) {
  const [image, setImage] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [resultMessage, setResultMessage] = useState("");
  // const [showComponent, setShowComponent] = useState(false); // Add state to control component visibility
  const [errorText, setErrorText] = useState(""); // State for error message
  const { roomCode } = props; // Destructure the roomCode from props

  // useEffect(() => {
  //   // Use setTimeout to delay showing the component for 6 seconds
  //   const delay = setTimeout(() => {
  //     setShowComponent(true);
  //   }, 9000);

  //   return () => clearTimeout(delay); // Clear the timeout if the component unmounts
  // }, []);

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    // Check if the selected file is an image
    if (selectedImage && selectedImage.type.startsWith("image/")) {
      setImage(URL.createObjectURL(selectedImage));
      setErrorText(""); // Clear any previous error message
    } else {
      // Display an error message for non-image files
      setErrorText("Selected file is not an image.");
    }
  };

  const performOCR = async () => {
    try {
      if (image) {
        const {
          data: { text },
        } = await Tesseract.recognize(
          image,
          "eng" // Language code for English
        );
        setExtractedText(text);
        console.log(text);

        const hasCongratulations = text.includes("Congratulations");
        const hasMatchingRoomCode = roomCode && text.includes(roomCode);

        if (hasCongratulations && hasMatchingRoomCode) {
          setResultMessage("Congratulations! You won the match.");
        } else if (hasCongratulations && !hasMatchingRoomCode) {
          setResultMessage("Room code does not match.");
        } else {
          setResultMessage("You lost the match. ");
        }
      }
    } catch (error) {
      console.error("Error while getting the game result:", error);
    }
  };

  // Check if an image is selected to enable the "Submit" button
  const isSubmitDisabled = !image;

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-center">
        <input
          className="my-4 w-11/12"
          type="file"
          accept="image/*" // Allow only image files
          onChange={handleImageChange}
        />
        {errorText && <p className="text-red-500">{errorText}</p>}
        <div className="">
          {image && (
            <Image
              src={image}
              alt="Selected Image"
              width={250}
              height={600}
              layout="responsive"
            />
          )}
        </div>

        <button
          onClick={performOCR}
          className={`w-11/12 md:w-1/4 bg-blue-600 text-white px-3 py-1 md:py-2 text-xl rounded-lg my-2 text-center ${
            isSubmitDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isSubmitDisabled} // Disable the button if no image is selected
        >
          Submit
        </button>
        {extractedText && (
          <div>
            <h2>Result:</h2>
            <p>{resultMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
}
