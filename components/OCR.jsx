import React, { useState, useEffect } from "react";
import Tesseract from "tesseract.js";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUser, useAuth } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";
import Button from "@mui/material/Button";
export default function OCR(props) {
  console.log(props.roomname)
  const [image, setImage] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [resultMessage, setResultMessage] = useState("");
  const [errorText, setErrorText] = useState(""); // State for error message
  const [roomValue, setRoomValue] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  // const { roomCode } = props; // Destructure the roomCode from props
  const router = useRouter();
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchCurrentRoomData = async () => {
      const token = await getToken({ template: "supabase" });
      const data = { id: props.roomId, token: token };
      console.log("OCR room data", data);
      // const roomData = await axios.post(
      //   "https://ludo-server-teal.vercel.app/fetchroombyid",
      //   data
      // );
      const roomData = await axios.post("/api/fetchRoomValueById", data, {
        withCredentials: true,
      });
      console.log("setRoomValue", roomData.data);
      setRoomValue(roomData.data);
    };

    fetchCurrentRoomData();
  }, []);

  const handleImageChange = async (event) => {
    // const selectedFile = event.target.files[0];
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        global: {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      }
    );
    const response = await axios.post("/api/checkResultFile",{token:localStorage.getItem('token'),roomcode:props.roomCode,subject:"result"});
    console.log('Result for checking',response.data);
      if(response.data===0){
    const { data, error } = await supabase.storage
      .from("Images")
      .upload(`result/${props.roomCode}/${props.username}${Date.now()}`, selectedFile, {
        contentType: selectedFile.type,
      });
    if (error) {
      console.error("Error uploading file:", error);
      // return 0
    } else {
      // const res = await axios.post("/api/userTransaction",{token:localStorage.getItem('token'),roomcode:props.roomCode});
      // if(res.data.message===0){
      console.log("File uploaded successfully:", data);
      let message = {
        token: localStorage.getItem("token"),
        email: "omkarhalgi50@gmail.com",
        subject:"Result",
        roomcode:props.roomCode

      };
      const response = await axios.post("/api/sendMail",message);
    // }
    }
  }
  else{
    console.log('Already uploaded screenshot')
  }
  };

  // const performOCR = async () => {
  //   try {
  //     if (image) {
  //       const {
  //         data: { text },
  //       } = await Tesseract.recognize(
  //         image,
  //         "eng" // Language code for English
  //       );
  //       setExtractedText(text);
  //       // console.log(text);

  //       const hasCongratulations = text.includes("Congratulations");
  //       // const hasMatchingRoomCode = roomCode && text.includes(roomCode);

  //       // if (hasCongratulations && hasMatchingRoomCode) {
  //       //   setResultMessage("Congratulations! You won the match.");
  //       // } else if (hasCongratulations && !hasMatchingRoomCode) {
  //       //   setResultMessage("Room code does not match.");
  //       // } else {
  //       //   setResultMessage("You lost the match. ");
  //       // }

  //       const token = await getToken({ template: "supabase" });
  //       let data = {
  //         hasCongratulations,
  //         roomId: props.roomId,
  //         token: token,
  //         roomValue: roomValue,
  //       };
  //       if (hasCongratulations) {
  //         setResultMessage(
  //           "Congratulations! You won the match.Chips will be added to your wallet."
  //         );
  //         let isWinner = await axios.post("/api/gameResult", data, {
  //           withCredentials: true,
  //         });
  //         console.log("isWinner", isWinner.data);
  //       } else {
  //         setResultMessage(
  //           "You lost the match.Chips will be deduced from your wallet. "
  //         );
  //         let isWinner = await axios.post("/api/gameResult", data, {
  //           withCredentials: true,
  //         });
  //         console.log("isLoser", isWinner.data);
  //       }
  //       setTimeout(() => {
  //         router.push("/rooms", { scroll: false });
  //       }, 5000);
  //     }
  //   } catch (error) {
  //     console.error("Error while getting the game result:", error);
  //   }
  // };

  // Check if an image is selected to enable the "Submit" button
  const isSubmitDisabled = !image;
  
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]); // Update state with selected file
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-center">
        <p>Please upload the Screenshot </p>
        <p>after the game. </p>
        <input
          className="my-4 w-11/12"
          type="file"
          accept="image/*" // Allow only image files
          onChange={handleFileChange}
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

        <Button onClick={handleImageChange}>Submit</Button>
          
       
      </div>
    </div>
  );
}
