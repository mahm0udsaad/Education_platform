"use client"

import Link from "next/link";
import { motion } from "framer-motion";
import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTestContext } from '../store/context';
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

interface PopupProps {
  path: string ;
  icon: IconDefinition;
  color: string;
}
const usePopup = ({path  , icon  ,color }:any) => {
    const { setTest , setCurrentQuestionIndex  , currentQuestionIndex} = useTestContext()
    const PopUp=()=> ( 
      <Link
     href={`/test/${path}`}
   >
        <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="bg-[#0f0f02] p-5 rounded-lg w-11/12 shadow-md text-center hover:opacity-70 transition duration-300"
      >
         <FontAwesomeIcon style={{color:color}} icon={icon} className="text-3xl mb-2 text-gray-600" />
         <p>
           {path}
         </p>
      </motion.div>
       </Link>
     );
     return {PopUp}
}
 
export default usePopup;