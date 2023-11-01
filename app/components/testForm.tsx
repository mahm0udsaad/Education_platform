import { useTestContext } from '@/store/context';
import React, { useState } from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface QuestionFormProps {
  onDelete: () => void;
  formData: {
    question: string;
    options: string[];
    correctAnswer: string;
    time: number;
  };
  i: number;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, name: string, index?: number) => void;
}
const cloneFormData = (formData) => {
  return {
    ...formData,
    options: [...formData.options],
  };
};
const QuestionForm: React.FC<QuestionFormProps> = ({ onDelete, formData, i, handleChange }) => {
  const [disabled, setDisabled] = useState(false);
  const [message, setMessage] = useState(false);

  const handleSubmit = () => {
    const isFormValid = () => {
      // Check if all required fields are filled
      return (
        formData.question.trim() !== '' &&
        formData.options.every(option => option.trim() !== '') &&
        formData.correctAnswer.trim() !== ''
      );
    };

    if (isFormValid()) {
      setDisabled(true); 
      setMessage(false); 
    } else {
      setDisabled(false);
      setMessage(true); 
    }
  };

  return (
    <div className="max-w-md mx-auto mt-4">
      {message && <div className="text-white bg-red-700 p-4">Please Fill all the inputs</div>}
      <form className={`${disabled ? 'opacity-50' : ''}`}>
        <div className="mb-">
          <div className="flex justify-between items-center">
            <label className="block text-gray-700 font-bold text-sm mb-2">Question {i}</label>
            <button onClick={onDelete} type="button" className="bg-red-500 mb-3 w-6 h-6 text-sm rounded-full text-white">
              X
            </button>
          </div>
          <input
            type="text"
            name="question"
            value={formData.question}
            onChange={(e) => handleChange(e, 'question')}
            className="w-full border rounded py-2 px-3"
          />
        </div>
        <div className="mb-">
          <label className="block text-gray-700 font-bold text-sm mb-2">Answers</label>
          {formData.options.map((option, index) => (
            <input
              key={index}
              type="text"
              name={`option-${index}`}
              id={index.toString()}
              value={option}
              onChange={(e) => handleChange(e, 'options', index)}
              className="w-full border rounded py-2 px-3 mb-2"
            />
          ))}
        </div>
        <div className="mb-">
          <label className="block text-gray-700 font-bold text-sm mb-2">Correct Answer</label>
          <select
            name="correctAnswer"
            value={formData.correctAnswer}
            onChange={(e) => handleChange(e, 'correctAnswer')}
            className="w-full border rounded py-2 px-3"
          >
            <option value="">Select Correct Answer</option>
            {formData.options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-">
          <label className="block text-gray-700 font-bold text-sm mb-2">Time (in seconds)</label>
          <input
            type="number"
            name="time"
            value={formData.time}
            onChange={(e) => handleChange(e, 'time')}
            className="w-full border rounded py-2 px-3"
          />
        </div>
        <div className="text-center">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={disabled}
            className={`${
              disabled ? 'opacity-50' : ''
            }  bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded focus-outline-none focus-ring focus-ring-blue-300`}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

const QuizForm = ({ put }: any) => {
  const useSearch = useSearchParams();
  const quizName = useSearch.get('testName');
  const [input, setInput] = useState('');
  const [disabled, setDisabled] = useState(false);
  const { testData, setTestData } = useTestContext();
  const [formData, setFormData] = useState({
    id: 0,
    question: '',
    options: ['', '', '', ''],
    correctAnswer: '',
    time: 25,
  });
  const addQuestionForm = () => {
    if (!testData) {
      setTestData([{ ...formData, id: 0 }]);
    }
    setTestData([
      ...testData,
      { ...formData, id: testData.length > 0 ? testData[testData.length - 1].id + 1 : 0 },
    ]);
  };
  const deleteQuestionForm = (id: number) => {
    const newTestData = testData.filter((test) => test.id !== id);
    setTestData(newTestData);
  };

  return (
    <>
      <h1 className="py-8 text-3xl font-semibold mb- text-center flex justify-center">
        {quizName} Test
        <span className="bg-red-500 rounded-full w-7 h-7 text-white text-sm flex justify-center items-center">{testData.length}</span>
       </h1>
      {quizName ? (
        <div>
          <div className="fixed top-0 w-full">
          <div className="flex justify-around w-[30%]">
            <button
              onClick={put}
              className="text-center bg-orange-500 hover-bg-orange-700 text-white font-bold w-60 h-12 px-2  rounded focus-outline-none focus-ring focus-ring-blue-300"
            >
              Submit {quizName} Quiz
            </button>
            <button
              onClick={addQuestionForm}
              className="bg-blue-500 hover-bg-blue-700 text-white font-bold w-40 h-12 flex justify-between items-center px-2  rounded focus-outline-none focus-ring focus-ring-blue-300"
            >
              Add question
              <FontAwesomeIcon className="text-blue-600 border-none bg-white rounded-full p-1" icon={faPlus} />
            </button>
          </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 max-h-[60vh] mx-auto gap-4">
            {testData &&
              testData.map((data, index) => {
                const formDataClone = cloneFormData(data); // Create a new formData object for each form
                return (
                  <QuestionForm
                    key={index}
                    formData={formDataClone} // Pass the cloned formData to the component
                    i={index + 1}
                    onDelete={() => deleteQuestionForm(data.id)}
                    handleChange={(e, name, inputIndex) => {
                      const value = e.target.value;
                      const updatedData = { ...formDataClone }; // Create a copy of the cloned data
                      if (name === 'options') {
                        updatedData.options[inputIndex] = value;
                      } else {
                        updatedData[name] = value;
                      }
                      const newData = [...testData];
                      newData[index] = updatedData;
                      setTestData(newData);
                      console.log(newData);
                    }}
                  />
                );
              })}
          </div>
        </div>
      ) : (
        <div className="w-5/6 mx-auto pt-20 shadow-lg py-20">
          <h1 className="text-center text-3xl">What's your quiz name?</h1>
          <form className="w-1/2 mx-auto mt-8">
            <input
              type="text"
              name="quizName"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full border rounded py-2 px-3"
            />
            <Link href={`?testName=${input}`} className="px-8 py-2 shadow-inner transition mt-8 rounded-full bg-orange-800 text-white">
              Submit
            </Link>
          </form>
        </div>
      )}
    </>
  );
};

export default QuizForm;
