
import React, { useEffect } from 'react';
import TestsGrid from './testsGrid';
import { getTestsName } from '@/lib/data';

const Home = async() => {
  
  const tests = await getTestsName()
  
  return (
    <div
      className="main font-Font2 h-screen flex flex-col justify-center items-center"
    >
      <h1 className=" lg:text-4xl text-2xl mb-5 text-center text-black font-bold ">Welcome to the Test App</h1>
      <p className="text-lg mb-8">Get ready to test your knowledge!</p>
       <TestsGrid tests={tests}/>
    </div>
  );
};


export default Home;
