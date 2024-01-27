import Input from './Input'

export default function InputGroup({ onInvestment, calculate }) {
  return (
    <section id="user-input">
      <div className="input-group">
        <Input label="initial investment" value={calculate.initialInvestment} name="initialInvestment" onInvestment={onInvestment} />
        <Input label="annual investment" value={calculate.annualInvestment} name="annualInvestment" onInvestment={onInvestment} />
      </div>
      <div className="input-group">
        <Input label="expected return" value={calculate.expectedReturn} name="expectedReturn" onInvestment={onInvestment} />
        <Input label="duration" value={calculate.duration} name="duration" onInvestment={onInvestment} />
      </div>
    </section>
  )
}