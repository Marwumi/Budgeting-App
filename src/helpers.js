export const waait =() => new Promise(res => setTimeout(res, Math.random() * 800)) 


// color
const generateRandomColor = () => {
  const existingBudgetLength = fetchData("budgets")?. length ?? 0;
  return `${existingBudgetLength * 34} 65% 50%`
}
//local storage functions

export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key));
  };

// get all items from local storage 
export  const getAllMatchingItems = ({
  category, key, value
}) => {
  const data = fetchData(category) ?? [];
  return data.filter((item) => 
    item[key] === value);
  
};

// delete item from local storage

export const deleteItem = ({ key,id }) => {
  const existingData = fetchData(key);
  if (id) {
    const newData = existingData.filter((item) => item.id !== id);
return localStorage.setItem(key, JSON.stringify(newData));
    
  }
  return localStorage.removeItem(key)
}

// create budget

export const createBudget = ({ name, amount}) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    color: generateRandomColor()
  }
  const existingBudgets = fetchData("budgets") ?? [];
  return localStorage.setItem("budgets", JSON.stringify([...existingBudgets, newItem]))
};


//create Expense


export const createExpense = ({ name, amount, budgetId}) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
budgetId: budgetId,
  }
  const existingExpenses = fetchData("expenses") ?? [];
  return localStorage.setItem("expenses", JSON.stringify([...existingExpenses, newItem]))
};

// total spent by budget
export const calculateSpentByBudget = (budgetId) => {
  const expenses = fetchData("expenses") ?? [];
  const budgetSpent = expenses.reduce((acc, expense) => {

    // check if expense.id === budgetId passed in
    if (expense.budgetId !== budgetId ) 
      return acc
    // add the current amount to my total
    return acc += expense.amount
  }, 0)
  return budgetSpent;
}

  //delete item

  // export const deleteItem = ({key})  => {
  //   return localStorage.removeItem(key)
  // }

  // format currency
  // export const formatCurrency = (amt) => {
  //   return amt.toLocaleString(undefined, {
  //     style: "currency",
  //     currency: 'USD',
  //   })
  // }

  export const formatCurrency = (amt) => {
    // Define a custom symbol for Naira (₦)
    const nairaSymbol = "₦";
  
    // Convert the amount to a number with 2 decimal places
    const formattedAmount = parseFloat(amt).toFixed(2);
  
    // Add the Naira symbol to the formatted amount
    return `${nairaSymbol}${formattedAmount}`;
  };
  


  // format percentage
  export const formatPercentage = (amt) => {
    return amt.toLocaleString(undefined, {
      style: "percent",
      minimumFractionDigits:0
    })
  }

  export const formatDateToLocaleString = (epoch) => 
    new Date(epoch).toLocaleDateString();
  