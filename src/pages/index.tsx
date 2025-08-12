import { useLogin } from "@/providers/LoginProvider";
import Router from "./router";
import { useEffect } from "react";

export default function Home() {

  const { isLoggedIn, isSignup } = useLogin()
  
  useEffect(() => {
    
  },[isLoggedIn,isSignup])

  return (
  // <div className="md:flex h-screen md:h-full primary-bg md:justify-center md:items-center md:border-2 md:shadow-xl md:border-primary md:w-1/2 md:p-16 mx-auto md:mt-16">
  //   <Router />
  // </div>
  <div className="md:flex md:justify-center md:items-center secondary-bg md:h-screen">
    <Router />
  </div>
);

}
