export default function Input({ label, name, onInvestment, value }) {
  return (
    <div>
      <label htmlFor={name} >{label}</label>
      <input type="number" id={name} name={name} value={value.toString()} required onChange={onInvestment} />
    </div>
  )
}