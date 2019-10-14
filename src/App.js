import React, { useState } from 'react';
import './App.css';
import List from './components/List';
import Form from './components/Form';
import Alert from './components/Alert';
import uuid from 'uuid/v4'

const initialExpenses = [
  { id: uuid(), charge: "rent", amount: 1600 },
  { id: uuid(), charge: "car payment", amount: 500 },
  { id: uuid(), charge: "credit card bill", amount: 1200 }
];

function App() {
  // ************** state values ****************
  // all expenses, add expense
  const [expenses, setExpenses] = useState(initialExpenses);
  // single expense
  const [charge, setCharge] = useState('');
  // single amount
  const [amount, setAmount] = useState('');
  // alert
  const [alert, setAlert] = useState({ show: false });
  // ************** functionality ****************

  // handle charge
  const handleCharge = e => {
    setCharge(e.target.value)
  };

  // handle amount
  const handleAmount = e => {
    setAmount(e.target.value)
  };

  //handle alert
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(()=>{
      setAlert({ show: false })
    },3000);
  };

  //handle submit
  const handleSubmit = e => {
    e.preventDefault();
    if(charge !== '' && amount > 0){
      const singleExpense = { id: uuid(), charge, amount };
      setExpenses([...expenses, singleExpense]);
      handleAlert({ type: 'success', text: 'item added' });
      setCharge('');
      setAmount('');
    }
    else{
      // handle alert called
      handleAlert({type: 'danger', text: `charge can't be empty value and amount of value has to be bigger than zero`})
    }
  };

  // clear all items
  const clearItems = () => {
    setExpenses([]);
    handleAlert({type: 'danger', text: 'all items deleted'});
  };

  // handle delete
  const handleDelete = id => {
    let tempExpenses = expenses.filter(item => item.id !== id);
    console.log(tempExpenses);
    setExpenses(tempExpenses)
    handleAlert({type: 'danger', text: 'item deleted'});
    
  };

  // handle edit
  const handleEdit = id => {
    console.log(`item edited : ${id}`);
  };

  return (
    <> 
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <Alert />
      <h1>budget calculator</h1>
      <main className="App">
        <Form 
          charge={charge} 
          amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
        />
        <List 
          expenses={expenses}
          handleDelete = {handleDelete}
          handleEdit = {handleEdit} 
          clearItems = {clearItems} 
        />  
      </main>
      <h1>
        total spending : {" "}
        <span className="total">
          $ 
          {expenses.reduce((acc, curr) => {
            return (acc += parseInt(curr.amount));
          },0)}
        </span>
      </h1>
    </>
  );
}

export default App;
