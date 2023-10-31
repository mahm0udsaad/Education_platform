"use client"
import { useTestContext } from '@/store/context';
import React, { useState } from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const QuestionForm = ({i }:any) => {
    const { testData, setTestData } = useTestContext();
    const [disabled , setDisabled] = useState(false)
  const [formData, setFormData] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: '',
    time: 25
});

const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name === 'options') {
      const answersCopy = [...formData.options];
      answersCopy[parseInt(e.target.id)] = value;
      setFormData({
        ...formData,
        options: answersCopy,
      });
    } else if (name === 'time') {
      // Validate and restrict the time input within the range 10 to 45
      const timeValue = parseInt(value, 10);
      if (!isNaN(timeValue) && timeValue >= 10 && timeValue <= 45) {
        setFormData({
          ...formData,
          [name]: timeValue,
        });
      }
      
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
};

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    let newTest = [];
  
    if (testData.length > 0) {
      newTest = [
        ...testData,
        formData, // Assuming `formData` contains the form data you want to add
      ];
    } else {
      newTest = [formData];
    }
  
    setTestData(newTest);
    setDisabled(true);
    console.log(disabled);
    
}

  return (
    <div className="max-w-md mx-auto mt-6 p-4 ">
      <form className={`${disabled ? 'opacity-50':''}`} onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold text-sm mb-2">Question {i}</label>
          <input
            type="text"
            name="question"
            value={formData.question}
            onChange={handleChange}
            className="w-full border rounded py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold text-sm mb-2">Answers</label>
          {formData.options.map((option, index) => (
            <input
              key={index}
              type="text"
              name="options"
              id={index.toString()}
              value={option}
              onChange={handleChange}
              className="w-full border rounded py-2 px-3 mb-2"
            />
          ))}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold text-sm mb-2">Correct Answer</label>
          <select
            name="correctAnswer"
            value={formData.correctAnswer}
            onChange={handleChange}
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
        <div className="mb-4">
          <label className="block text-gray-700 font-bold text-sm mb-2">Time (in seconds)</label>
          <input
            type="number"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full border rounded py-2 px-3"
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            disabled={disabled}
            className={`${disabled ? 'opacity-50':''}  bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded focus-outline-none focus-ring focus-ring-blue-300`}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
const QuizForm = () => {
    const [isFormVisible, setIsFormVisible] = useState(1);
    const [input, setInput] = useState('');
    const { testData, setTestData , quizName ,setQuizName , isShowForm, setShowForm} = useTestContext();
    const handleButtonClick = () => {
      setIsFormVisible(isFormVisible + 1);
    };
    const questionForms = [];

  for (let i = 0; i < isFormVisible; i++) {
    questionForms.push(<div key={i} className='flex flex-col'>
        <QuestionForm  i={i+1} />
    </div>);
  }
  const handleInputChange = (e:any) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    setQuizName(input);
    // You can do something with the quizName here, like submitting it to a server.
    console.log('Quiz Name:', quizName);
  };
    return (
      <>
      <h1 className="text-3xl font-semibold mb-4 text-center">{quizName} Test</h1>
      {quizName ? 
      <div>
      <button onClick={handleButtonClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-40 h-12 flex justify-between items-center px-2  rounded focus-outline-none focus-ring focus-ring-blue-300">
        Add question
        <FontAwesomeIcon className='text-blue-600 border-none bg-white rounded-full p-1 ' icon={faPlus} />
      </button>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 max-h-[60vh] mx-auto gap-4">
      {questionForms}
      </div>
    </div>
    :
    <div className="w-5/6 mx-auto pt-20 shadow-lg py-20">
    <h1 className="text-center text-3xl">What's your quiz name?</h1>
    <form className='w-1/2 mx-auto mt-8' onSubmit={handleSubmit}>
      <input
        type="text"
        name="quizName"
        value={quizName}
        onChange={handleInputChange}
        className="w-full border rounded py-2 px-3"
      />
      <button type="submit" className="px-8 py-2 shadow-inner transition mt-8 rounded-full bg-orange-800 text-white">
        Submit
      </button>
    </form>
  </div>
    }
      </>
    );
  };
  
  
export default QuizForm;
