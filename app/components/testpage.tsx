"use client"

import React, { useState } from 'react';
import Question from './question';
import { useTestContext } from '../../store/context.jsx';
import Link from 'next/link.js';
import { motion } from 'framer-motion';
import { getTest } from '@/lib/data';
import { ObjectId } from 'mongodb';

interface QuestionData {
  id?: ObjectId;
  question: string;
  options: string[];
  correctAnswer: string;
}

const TestPage =  ({ questions }: { questions: QuestionData[] })  => {
  const [total , setTotal ] = useState(0)
  const [displayTotal , isDisplayTotal ] = useState(false)
  const [currentQuestionIndex,setCurrentQuestionIndex ]= useState(0);
  
  const nextQuestion = () => {
      if (questions && currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        }else{
          isDisplayTotal(true) 
        }
        console.log( currentQuestionIndex,total);
        localStorage.setItem('index',JSON.stringify(currentQuestionIndex))
    };

  return (
    <div className={displayTotal ? "final min-h-screen w-full flex items-center justify-center":"bg-orange-50 min-h-screen flex flex-col items-center justify-center overflow-hidden"}>
      {questions ? (
              <div className="flex justify-center max-w-md mx-auto w-11/12 lg:w-2/1 md:w-6/12 ">
              {displayTotal ? (
                  <div className='flex flex-col h-full justify-around'>

                   <motion.div initial={{ scale:0 }} animate={{scale:1}} className='flex bg-black text-white text-center text-lg p-5 rounded mb-5'>
                   <Link href={'/'} className='w-full h-full'>Exit</Link>
                   </motion.div>
                    <div className="overflow-hidden mx-auto">
                    <div 
                   className='text-4xl mt-5 flex items-center'>Total :  <motion.h1 className='' initial={{ y:150 }} animate={{ y:0 }}> {total} </motion.h1> / {questions.length}
                  </div>
                    </div>
                  </div>
              ) : ( 
                <>
                  <Question
                  key={currentQuestionIndex}
                  question={questions[currentQuestionIndex]}
                  onNextQuestion={nextQuestion}
                  setTotal={setTotal}
                  total={total}
                  />
                </>
              )}
        </div>
      ):(
        <div className="animate-spin rounded-full h-16 w-16 border-t-8 border-red-500"></div>
      )}
    </div>
  );
};

export default TestPage;
