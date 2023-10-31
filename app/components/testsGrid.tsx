"use client"
import React from 'react';
import { faBook, faCalculator, faFlask, faHistory } from '@fortawesome/free-solid-svg-icons';
import usePopup from '../Hooks/usePopup';
import { getTestsName } from '@/lib/data';

const TestsGrid = async ({tests}:any) => {
  for (let i = 0 ; i < tests.length ; i ++){
    const popupResult = usePopup({ path: `${tests[i]}`, icon: faHistory, color: 'red' });
    const { PopUp: popup } = popupResult}
  
  return (
      <div className="smallgrid grid grid-cols-2 gap-4 md:grid-cols-3">
        {tests.map((test:any, i:number) => {
        const { PopUp } = usePopup({ path: test, icon: faBook, color: 'gray' });
        return <PopUp key={i} />;
      })}
       </div>
  );
};


export default TestsGrid;
