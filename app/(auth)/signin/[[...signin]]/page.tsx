import { SignIn,useUser } from "@clerk/nextjs";
import { useEffect } from "react";
export default function Page() {
  return (
    <div className="flex justify-center items-center mt-48">
      <SignIn />
    </div>
  );
}
