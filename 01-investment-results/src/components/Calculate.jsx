import { useState } from 'react';
import InputGroup from './InputGroup'
import Table from './Table';
import { calculateInvestmentResults } from '../util/investment';

const INITIAL_INVESTMENT = {
  'initialInvestment': 0,
  'annualInvestment': 0,
  'expectedReturn': 0,
  'duration': 0,
}

export default function Calculate() {
  const [calculate, setCalculate] = useState(INITIAL_INVESTMENT);
  const handleInvestmentCahnge = (event) => {
    setCalculate((prevCalculate) => {
      return {
        ...prevCalculate,
        [event.target.id]: +event.target.value
      }
    })
  }

  const calculateResult = calculateInvestmentResults(calculate);
  return (
    <main>
      <InputGroup onInvestment={handleInvestmentCahnge} calculate={calculate} />
      {calculate.duration < 1 
        ? <p className='center'>duration는 1이상이여야 합니다.</p> 
        : <Table result={calculateResult} />}
      
    </main>
  )
}