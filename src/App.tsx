import { useState, useEffect } from 'react';
import * as C from './App.styles';
import { Item } from './types/Item';
import { Category } from './types/Category';
import { categories } from './data/categories';
import { items } from './data/items';
import { getCurrentMonth, filterListByMonth } from './helpers/dateFilter';
import { TableArea } from './components/TableArea';
import { InfoArea } from './components/InfoArea';
import { InsertArea } from './components/InsertArea'

const App = () => {

  const [list, setList] = useState(items);
  const [filteredList, setFilteredList] = useState<Item[]>([]);
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth());
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);



  useEffect(() => {
    setFilteredList( filterListByMonth(list, currentMonth) );
  }, [list, currentMonth]);

  useEffect(() => {
    let income = 0 
    let expense = 0

    for(let i in filteredList){
      if(categories[filteredList[i].category].expense){
            expense = expense + filteredList[i].value;
          }else {
            income = income + filteredList[i].value;
          }
          setIncome(income)
          setExpense(expense)
        }
  }, [filteredList]);

  const handleMonthChange = (newMonth: string) => {
    setCurrentMonth(newMonth)
  }
  
  const handleAddItem = (item: Item) => {
    let newList = [...list]
    newList.push(item)
    console.log(filteredList)
    setList(newList);

  }

  return (
    <C.Container>
    <C.Header>
      <C.HeaderText>Sistema Financeiro</C.HeaderText>
    </C.Header>
    <C.Body>

      <InfoArea 
      currentMonth={currentMonth}
      onMonthChange ={handleMonthChange}
      income = {income}
      expense = {expense}
      />

      <InsertArea onAdd={handleAddItem}/>

      <TableArea list={filteredList} />

    </C.Body>
    </C.Container>
  );
}

export default App;