// import React, { useState } from "react";
// import Tesseract from "tesseract.js";
// import Image from "next/image";

// export default function OCR(props) {
//   const [image, setImage] = useState(null);
//   const [extractedText, setExtractedText] = useState("");
//   const [resultMessage, setResultMessage] = useState("");
//   const { roomCode } = props; // Destructure the roomCode from props

//   const handleImageChange = (event) => {
//     const selectedImage = event.target.files[0];
//     setImage(URL.createObjectURL(selectedImage));
//   };

//   const performOCR = async () => {
//     try {
//       if (image) {
//         const {
//           data: { text },
//         } = await Tesseract.recognize(
//           image,
//           "eng" // Language code for English
//           // { logger: (m) => console.log(m) } // Optional logger to see progress
//         );
//         setExtractedText(text);
//         console.log(text);

//         const hasCongratulations = text.includes("Congratulations");
//         const hasMatchingRoomCode = roomCode && text.includes(roomCode);

//         if (hasCongratulations && hasMatchingRoomCode) {
//           setResultMessage("Congratulations! You won the match.");
//         } else if (hasCongratulations && !hasMatchingRoomCode) {
//           setResultMessage(
//             "You lost the match, because room code does not match."
//           );
//         } else {
//           setResultMessage("You lost the match. ");
//         }
//       }
//     } catch (error) {
//       console.log("Error while getting game result.");
//     }
//   };

//   return (
//     <div className="flex flex-col justify-center items-center">
//       <div className=" text-center">
//         <input
//           className="my-4 w-11/12"
//           type="file"
//           accept="image/*"
//           onChange={handleImageChange}
//         />
//         <div className="">
//           {image && (
//             <Image
//               src={image}
//               alt="Selected Image"
//               width={250}
//               height={600}
//               layout="responsive"
//             />
//           )}
//         </div>

//         <button
//           onClick={performOCR}
//           className="w-11/12 md:w-1/4 bg-blue-600 text-white px-3 py-1 md:py-2 text-xl rounded-lg my-2 text-center"
//         >
//           Submit
//         </button>
//         {extractedText && (
//           <div>
//             <h2>Result:</h2>
//             <p>{resultMessage}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import Tesseract from "tesseract.js";
import Image from "next/image";

export default function OCR(props) {
  const [image, setImage] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [resultMessage, setResultMessage] = useState("");
  const [showComponent, setShowComponent] = useState(false); // Add state to control component visibility
  const { roomCode } = props; // Destructure the roomCode from props

  useEffect(() => {
    // Use setTimeout to delay showing the component for 6 seconds
    const delay = setTimeout(() => {
      setShowComponent(true);
    }, 9000);

    return () => clearTimeout(delay); // Clear the timeout if the component unmounts
  }, []);

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
        console.log(text);

        const hasCongratulations = text.includes("Congratulations");
        const hasMatchingRoomCode = roomCode && text.includes(roomCode);

        if (hasCongratulations && hasMatchingRoomCode) {
          setResultMessage("Congratulations! You won the match.");
        } else if (hasCongratulations && !hasMatchingRoomCode) {
          setResultMessage(
            "You lost the match because the room code does not match."
          );
        } else {
          setResultMessage("You lost the match. ");
        }
      }
    } catch (error) {
      console.log("Error while getting the game result.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {showComponent && (
        <div className="text-center">
          <input
            className="my-4 w-11/12"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
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
            className="w-11/12 md:w-1/4 bg-blue-600 text-white px-3 py-1 md:py-2 text-xl rounded-lg my-2 text-center"
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
      )}
    </div>
  );
}
