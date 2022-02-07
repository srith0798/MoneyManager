// Write your code here
import './index.css'

function TransactionItem(props) {
  const {data, removeHistory} = props
  const {id, title, amount, type} = data
  const removeData = () => {
    removeHistory(id, amount, type)
  }
  return (
    <li className="row-bar">
      <p className="row-name">{title}</p>
      <p className="row-name">Rs {amount}</p>
      <p className="row-name">{type}</p>
      <button
        className="del-btn"
        testid="delete"
        onClick={removeData}
        type="button"
      >
        <img
          className="del-pic"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default TransactionItem
