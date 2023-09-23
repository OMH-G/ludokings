"use client";
import React, { useState } from "react";
import Tesseract from "tesseract.js";
import Image from "next/image";

export default function TestOCR() {
  const [image, setImage] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [isWinner, setIsWinner] = useState("");

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(URL.createObjectURL(selectedImage));
  };

  const performOCR = async () => {
    try {
      if (image) {
        const {
          data: { text },
        } = await Tesseract.recognize(
          image,
          "eng" // Language code for English
          // { logger: (m) => console.log(m) } // Optional logger to see progress
        );
        setExtractedText(text);

        setIsWinner(text.includes("Congratulations"));

        if (isWinner) {
          console.log("You won the match.");
        } else {
          console.log("You lost the match.");
        }
      }
    } catch (error) {
      console.log("Error while getting game result.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className=" text-center">
        <input
          className="my-4 w-11/12"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        <div className="">
          {/* {image && <Image src={image} alt="Selected Image" width={250} height={250} />} */}
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
          className="w-11/12 md:w-1/4 bg-blue-600 text-white px-3 py-1 md:py-2 text-xl rounded-lg my-2 text-center"
        >
          Submit
        </button>
        {extractedText && (
          <div>
            <h2>Result:</h2>
            {isWinner ? <p>You won the match.</p> : <p>You lost the match.</p>}
          </div>
        )}
      </div>
    </div>
  );
}
