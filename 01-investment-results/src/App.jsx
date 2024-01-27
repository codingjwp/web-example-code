import headerImg from './assets/investment-calculator-logo.png';
import Header from './components/Header';
import Calculate from './components/Calculate';
import { useState } from 'react';

function App() {
  return (
    <>
      <Header title="Investment Calculator" path={headerImg} />
      <Calculate />
    </>
  )
}

export default App
