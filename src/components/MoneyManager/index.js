import {Component} from 'react'
import {v4 as uuidV4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here

function OptionItem(props) {
  const {optionsData} = props
  const {optionId, displayText} = optionsData
  return (
    <option id={optionId} value={optionId}>
      {displayText}
    </option>
  )
}

const itemDataList = [
  {
    imgUrl:
      'https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png',
    altText: 'balance',
    modeName: 'Balance',
    testId: 'balanceAmount',
    color: 'green',
  },
  {
    imgUrl:
      'https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png',
    altText: 'income',
    modeName: 'Income',
    testId: 'incomeAmount',
    color: 'light-blue',
  },
  {
    imgUrl:
      'https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png',
    altText: 'expenses',
    modeName: 'Expenses',
    testId: 'expensesAmount',
    color: 'light-pink',
  },
]

class MoneyManager extends Component {
  state = {
    transList: [],
    title: '',
    type: transactionTypeOptions[0].displayText,
    amount: '',
    incomeAmt: 0,
    expensesAmt: 0,
  }

  onAddLedger = event => {
    const {type, amount, title} = this.state
    event.preventDefault()
    const transObj = {
      type,
      amount,
      title,
      id: uuidV4(),
    }
    this.setState(prevValue => ({
      transList: [...prevValue.transList, transObj],
      type,
      amount: '',
      title: '',
    }))
    if (type === 'INCOME') {
      this.setState(prevState => ({
        incomeAmt: prevState.incomeAmt + parseInt(amount),
      }))
    } else {
      this.setState(prevState => ({
        expensesAmt: prevState.expensesAmt + parseInt(amount),
      }))
    }
    // console.log(`income: ${incomeAmt}
    //                   expenses: ${expensesAmt}  `)
  }

  onTitle = event => {
    this.setState({
      title: event.target.value,
    })
  }

  onAmount = event => {
    this.setState({
      amount: event.target.value,
    })
  }

  onType = event => {
    this.setState({
      type: event.target.value,
    })
  }

  onRemoveHistory = (id, amount, type) => {
    const {transList} = this.state
    const updateList = transList.filter(each => each.id !== id)
    this.setState({
      transList: updateList,
    })
    if (type === 'Income') {
      this.setState(prevState => ({
        incomeAmt: prevState.incomeAmt - parseInt(amount),
      }))
    } else {
      this.setState(prevState => ({
        expensesAmt: prevState.expensesAmt - parseInt(amount),
      }))
    }
  }

  render() {
    const {type, amount, title, incomeAmt, expensesAmt, transList} = this.state

    return (
      <div className="bg-card">
        <div className="card">
          <div className="top-section">
            <h1 className="welcome-text">Hi,Richard</h1>
            <p className="caption">
              Welcome back to your{' '}
              <span className="color-text">Money Manager</span>
            </p>
          </div>
          <div className="middle-section">
            <div className="mode-list">
              {itemDataList.map(eachItem => (
                <MoneyDetails
                  key={eachItem.testId}
                  incomeAmt={incomeAmt}
                  expensesAmt={expensesAmt}
                  items={eachItem}
                />
              ))}
            </div>
          </div>
          <div className="bottom-section">
            <form className="form" onSubmit={this.onAddLedger}>
              <h1 className="form-title">Add Transaction</h1>
              <label className="tag" htmlFor="title">
                TITLE
              </label>
              <input
                id="title"
                onChange={this.onTitle}
                className="input-box"
                type="text"
                placeholder="TITLE"
                value={title}
              />
              <label className="tag" htmlFor="amount">
                AMOUNT
              </label>
              <input
                id="amount"
                onChange={this.onAmount}
                className="input-box"
                type="text"
                placeholder="AMOUNT"
                value={amount}
              />
              <label className="tag" htmlFor="type">
                TYPE
              </label>
              <select
                id="type"
                className="input-box"
                onChange={this.onType}
                value={type}
              >
                {transactionTypeOptions.map(eachTrans => (
                  <OptionItem
                    key={eachTrans.optionId}
                    optionsData={eachTrans}
                  />
                ))}
              </select>{' '}
              <button className="form-btn" type="submit">
                Add
              </button>
            </form>
            <div className="left-bar">
              <h1 className="left-title">History</h1>
              <div>
                <ul className="history-list">
                  <li id="title" className="title-row">
                    <p className="col">Title</p>
                    <p className="col">Amount</p>
                    <p className="col">Type</p>
                  </li>
                  {transList.map(eachPiece => (
                    <TransactionItem
                      key={eachPiece.id}
                      removeHistory={this.onRemoveHistory}
                      data={eachPiece}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
