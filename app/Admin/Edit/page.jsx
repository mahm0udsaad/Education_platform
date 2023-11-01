"use client"
import { useSearchParams } from 'next/navigation';
const Edit = () =>{
    const quizName = useSearchParams().get('quizName')
    return(
        <>
        <h1 className="text-center text-3xl">
            {quizName}
        </h1>
        </>
    )
    
}
export default Edit