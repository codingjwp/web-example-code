
import { formatter } from '../util/investment';
const TABLE_HEADER = ['Year', 'Investment Value', 'Interest (Year)', 'Total Interest', 'Invested Capital'];

export default function Table({ result }) {
  const initialInvestment = result[0].valueEndOfYear - result[0].interest - result[0].annualInvestment;
  return (
    <table id="result">
      <thead>
        <tr className="center">
          {TABLE_HEADER.map((header, index) => <th key={index}>{header}</th>)}
        </tr>
      </thead>
      <tbody>
        {result.map((innerArray) => {
          const totalInterest = innerArray.valueEndOfYear - innerArray.annualInvestment * innerArray.year - initialInvestment;
          const totalAmountInvestment = innerArray.valueEndOfYear - totalInterest
          return (
            <tr key={innerArray.year}>
              <td>{innerArray.year}</td>
              <td>{formatter.format(innerArray.valueEndOfYear)}</td>
              <td>{formatter.format(innerArray.interest)}</td>
              <td>{formatter.format(totalInterest)}</td>
              <td>{formatter.format(totalAmountInvestment)}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}