"use client"
import React, { createContext, useState, useContext , useEffect} from 'react';
import axios from 'axios';

const TestContext = createContext();

export const TestProvider = ({ children }) => {
  const [testData , setTestData] = useState([])
  const [quizName, setQuizName] = useState(null)
  const [isShowForm, setShowForm] = useState(false);

  return (
    <TestContext.Provider value={{testData ,  setTestData , quizName , setQuizName}}>
      {children}
    </TestContext.Provider>
  );
};

export const useTestContext = () => {
  return useContext(TestContext);
};
