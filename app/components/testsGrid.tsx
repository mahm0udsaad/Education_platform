"use client"
import React from 'react';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion'
import usePopup from '../Hooks/usePopup';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TestsGrid = ({tests}:any) => {
  return (
      <div className="smallgrid grid grid-cols-2 gap-4 md:grid-cols-3">
        {tests.map((test:any, i:number) => {
        const { PopUp } = usePopup({ path: test, icon: faBook, color: 'gray' });
        return <PopUp key={i} />;
      })}
       </div>
  );
};

const AdminTestsGrid = ({ tests , onDelete}: any) => {

  return (
    <div className="smallgrid grid grid-cols-2 gap-4 md:grid-cols-3">
      {tests &&
        tests.map((test, i) => (
          <div className='flex justify-between relative bg-[#0f0f02] p-5 rounded-lg w-11/12 shadow-md'>
          <div className='w-[20%]'>
          <button onClick={onDelete} type="button" className=" bg-red-500 mb-3 w-6 h-6 text-sm rounded-full text-white">
              X
            </button>
          </div>
          <Link key={i} className='w-[80%]' href={`/Admin/Edit?quizName=${test}`}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className=" text-center hover:opacity-70 transition duration-300"
            >
              <p>{test}</p>
            </motion.div>
          </Link>
          </div>
        ))}
        <Link  href={`/Admin/CreateTest`}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-[#0f0f02] p-4 rounded-lg w-11/12 shadow-md text-center hover:opacity-70 transition duration-300"
            >
              <FontAwesomeIcon className='text-white text-4xl' icon={faPlusCircle} />
            </motion.div>
          </Link>
    </div>
  );
};

export {
  TestsGrid,
  AdminTestsGrid
};
