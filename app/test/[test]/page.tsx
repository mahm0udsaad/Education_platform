import TestPage from "@/app/components/testpage"
import {  getTest, getTestsName } from "@/lib/data"
import { ObjectId } from "mongodb";

interface QuestionData {
    id?: ObjectId;
    question: string;
    options: string[];
    correctAnswer: string;
  }
  
  export async function generateStaticParams() {
    const tests = await getTestsName()
    const test = []
    for (let i = 0 ; i < tests.length ; i ++){
        test.push({test:tests[i]})
  }
  return test
}
 const Test = async({params}:any) =>{
    const data = await getTest(params.test);

    // Transform data into the expected QuestionData[] type
    const questions: QuestionData[] | null = data ? data.map(item => ({
      question: item.question,
      options: item.options,
      correctAnswer: item.correctAnswer
    })) : null;
    
    return (
        <>
        {questions ? (
            <TestPage questions={questions} />
          ) : (
            <div>No questions available.</div>
          )}
        </>
    )
}
export default Test ;