"use client"
import React from 'react';
import QuizForm from '../../components/testForm'; 
import { useTestContext } from '@/store/context';
import { addQuiz } from '@/lib/data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSearchParams } from 'next/navigation';

export default function CreateQuiz() {
 const {testData} = useTestContext()
 const quizName = useSearchParams().get('testName')
 let submited = false ;
 async function put () {
    try {
        await addQuiz({name:quizName,data:testData})
    } catch (error) {
        console.log(error);
    }
 }
  return (
    <div className='w-5/6 mx-auto'>
        {!submited ?
         <>
         <QuizForm put={put} />
         </>
        :
        <>
            Quiz Submitted sucssfully
           <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"/></svg>
        </>
        }
    </div>
  );
}
