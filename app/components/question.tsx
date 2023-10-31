"use client"
import React, { useState, useEffect } from 'react';
import { motion ,AnimatePresence} from 'framer-motion';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

interface QuestionProps {
  question:{
    question:string,
    options:string[],
    correctAnswer:string
  }
  onNextQuestion: () => void;
  total: number;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
}
const Question: React.FC<QuestionProps> = ({ question, onNextQuestion, total , setTotal}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  
  useEffect(() => {
    setSelectedOption(null)
  }, [question]);

  const handleOptionSelect = (option:string) => {
    setSelectedOption(option);
    onNextQuestion();
    if (question.correctAnswer === option) {
      setTotal(total + 1)
    }
  };
  const renderOptions = () => {
    return question.options.map((option, index) => (
      <AnimatePresence key={index}>
        <motion.button
        onClick={() => handleOptionSelect(option)}
        style={{ userSelect: 'none'}}
        className={`block w-full mb-3 p-5 rounded hover:bg-black hover:text-white ease-out duration-300 ${
          selectedOption === option ? 'bg-red-500 text-white' : 'bg-white text-black'
        }`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      >
        {option}
      </motion.button>
      </AnimatePresence>
    ));
  };

  return (
    <div className='overflow-hidden'>
      {question ? (
        
      <>
            <div className="lg:w-full md:w-full flex justify-center absolute w-11/12  top-2 md:top-10 lg:top-5">
            <CountdownCircleTimer
                isPlaying
                duration={25}
                colorsTime={[7, 5, 2, 0]}
                size={100}
                colors={[
                  '#efa951', // Color for the entire circle
                  '#abc123', // Color for the first quarter
                  '#456def', // Color for the second quarter
                  '#789xyz', // Color for the third quarter
                ]}
                onComplete={()=>{
                  onNextQuestion()
                }}
              >
                {({ remainingTime }) => remainingTime}
              </CountdownCircleTimer>
            </div>
        <div className="p-8 rounded-lg">
          <div className='overflow-hidden'>
          <motion.div
           initial={{ y:100 }}
           animate={{ y:0 }}
           style={{ userSelect: 'none'}}
           className="text-2xl md:text-4xl lg:text-5xl mb-5 lg:mb-10">{question.question}</motion.div>
          </div>
          <div>{renderOptions()}</div>
        </div>
      </>
      ) : (
        <div className="animate-spin rounded-full h-16 w-16 border-t-8 border-red-500"></div>
      )}
    </div>
  );
};

export default Question;
