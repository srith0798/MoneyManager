// Write your code here
import './index.css'

function MoneyDetails(props) {
  const {items, incomeAmt, expensesAmt} = props
  const {imgUrl, altText, modeName, color, testId} = items
  let money = 0
  if (testId === 'incomeAmount') {
    money = incomeAmt
  } else if (testId === 'expensesAmount') {
    money = expensesAmt
  } else {
    money = incomeAmt - expensesAmt
  }

  return (
    <li className={`item ${color}`}>
      <img className="pic" src={imgUrl} alt={altText} />
      <div>
        <p className="mode-name">Your {modeName}</p>
        <p className="money" testId={testId}>
          Rs {money}
        </p>
      </div>
    </li>
  )
}

export default MoneyDetails
