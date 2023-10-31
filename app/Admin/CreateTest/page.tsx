"use client"
import React from 'react';
import QuizForm from '../../components/testForm'; 
import { useTestContext } from '@/store/context';
import { addQuiz } from '@/lib/data';

export default function CreateQuiz() {
 const {testData , quizName} = useTestContext()
 async function put () {
    try {
        await addQuiz({name:quizName,data:testData})
    } catch (error) {
        console.log(error);
    }
 }
  return (
    <div>
        <button onClick={put} className="bg-orange-800 w-40 h-12 text-white">
            store Quiz
        </button>
        <QuizForm />
    </div>
  );
}
