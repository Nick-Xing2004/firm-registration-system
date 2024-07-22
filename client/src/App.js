import './App.css';
import {useState} from 'react';
import Axios from 'axios';


function App() {
  //creating states for the datas we wanted to send to the database
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");  
  const [wage, setWage] = useState(0);

  const [employeeList, setemployeeList] = useState([]);   //used to render all employees from the database 

  //an auxiliary function to help make request 
  const addEmployee = () => {    //making the request from the front-end   sending information to the endpoint specified by the first argument 
    Axios.post('http://localhost:3001/create', {name: name, age: age, country: country, position: position, wage: wage}).then(
      () => {setemployeeList([...employeeList, {
        name: name, age: age, country: country, position: position, wage: wage
      }])}
    )
  }

  const getEmployees = () => {
    Axios.get('http://localhost:3001/employees').then(
      (res) => {    
        setemployeeList(res.data);   //data received from the backend
      }       //the response obj is the res obj sent from the bakckend (here will contain all the res obj at the backend has)
    )
  }


  return (
    <div className="App">
      <div className='information'>
        <label>Name:</label>
        <input type='text' onChange={(event) => setName(event.target.value)}/>
        <label>Age:</label>
        <input type='number' onChange={(event) => setAge(event.target.value)}/>
        <label>Country:</label>
        <input type='text' onChange={(event) => setCountry(event.target.value)}/>
        <label>Position:</label>
        <input type='text' onChange={(event) => setPosition(event.target.value)}/>
        <label>Wage (year):</label>
        <input type='number' onChange={(event) => setWage(event.target.value)}/>
        <button onClick={addEmployee}>Add Employee</button>
        </div>
        <hr/>
        <div className="employees">
          <button onClick={getEmployees}>Show All Employees</button>
          {employeeList.map((val, key) => {
            return(
            <div className="employee">
              <h3>Name: {val.name}</h3>
              <h3>Age: {val.age}</h3>
              <h3>Country: {val.country}</h3>
              <h3>Position: {val.position}</h3>
              <h3>Wage: {val.wage}</h3>
            </div>
            );
          })}
        </div>
    </div>
  );
}

export default App;
