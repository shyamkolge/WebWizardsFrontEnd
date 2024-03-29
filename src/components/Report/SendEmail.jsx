import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
 


const SendEmail = ( { reportId } ) => {

  const { setSendEmail } = useAuth();
  const [email , setEmail] = useState("");


  const handleEmail = async () =>{
      
       try {
            
        const response = await axios.post(`/v1/report/email/${reportId}`, { to : email}) 

        setSendEmail(prev => !prev)

        alert("Email Sent Successfully...!")
        
       } catch (error) {
          console.log(error);
       }
  }

  return (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-gray-600 bg-opacity-60 backdrop-filter backdrop-blur-lg">
      <div className="relative w-[60%]  bg-white rounded-md ">
        <div className="flex justify-between items-center p-2">
          <h1 className="font-bold text-xl text-blue-500">Send Email </h1>
          <IoMdClose
            size={40}
            className="hover:bg-[#f5f5f5] cursor-pointer p-2 rounded-full"
            onClick={() => setSendEmail(false)}
          />
        </div>
     
      <div className="p-10 flex justify-between items-center">
        <div className="">
          <label className="" htmlFor="email">Email : </label>
          <input
            id="email"
            type="email"
            className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none placeholder:text-sm placeholder:text-gray-400"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>
             <button className='bg-blue-500 px-6 py-2 rounded-lg shadow-lg text-white hover:bg-blue-700' onClick={handleEmail}>Send Email</button>
       </div>
      </div>
    </div>
  );
};

export default SendEmail;
