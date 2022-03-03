import './App.css';
import { useReducer, useState } from 'react';
import React from 'react';
import Task from './Task.js';
import User from './User.js';

let today = new Date();
let [focusedMonth, setFocusedMonth] = [1, 1];
let currYear;
let [date, setDate] = [1, 1];
let [time, setTime] = [1, 1];
let [title, setTitle] = [1, 1];
let [description, setDescription] = [1, 1];
let [year, setYear] = [1,1];
let [compVisible, setCompVisible] = [1,1]
let [focusedDay, setFocusedDay] = [1, 1];
let [user, setUser] = [1,1];
const mOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const defaultUser = new User;
const App=()=>{
  [focusedDay, setFocusedDay] = useState(1);
  [focusedMonth, setFocusedMonth] = useState(0);
  [date, setDate]  = useState('12/22/2021');
  [time, setTime]  = useState('hh:mm AM/PM');
  [title, setTitle]  = useState('');
  [description, setDescription]  = useState('');
  [year, setYear] = useState(`${today.getFullYear()}`);
  [user, setUser] = useState(defaultUser);
  const [mVisuals, setMVisuals] = useState(['','','','','','','','','','','','']);
  [compVisible, setCompVisible] = useState(['block', 'none', 'none']);
  return (
    <div>
      <div
      className='bg'
      style={{display: `${compVisible[0]}`}}>
        {taskCreate()}
        {Calendar([mVisuals, setMVisuals])}
        <button
        className='taskCreateInput'
        style={{width: '9em', height: "2em"}}
        onClick={()=>{
          setCompVisible(['none', 'block', 'none']);
        }}>
          {`View ${mOfYear[focusedMonth]}`}
        </button>
      </div>
      <div
      className='bg'
      style={{display: `${compVisible[1]}`}}>
        {MonthWindow()}
      </div>
      <div
      className='bg'
      style={{display: `${compVisible[2]}`}}>
        {dayWindow()}
      </div>
    </div>
  );
}
const taskCreate = () =>{
  const options = [['Date:', 'Time:', 'Title:', 'Description:'],['65', '65', '67.5', '42', '50','55'],['25', '25', '22.5', '48', '40', '35'],['text', 'text',  'text', 'text', 'text'], ['mm/dd/yyyy', 'hh:mm AM/PM','', '', 'none']]
  const getStyle = (i) => {
    return({
      left:`${options[2][i]}%`, 
      width: `${options[1][i]}%`,
      top: `${10*i + 10}%`
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if(date.split("/")[0].length == 2 && date.split("/")[1].length == 2 && date.split("/")[2].length == 4 && !isNaN(date.split("/")[0])&& !isNaN(date.split("/")[1])&& !isNaN(date.split("/")[2])){
      let task = new Task;
      task.newTask(date, time, title, description);
      defaultUser.addTask(task);
    } else alert("Your date is likely formated incorrectly. Try doing so in the mm/dd/yyyy format");
  }
  return(
    <div
    className='taskCreateWindow'>
        <form onSubmit={handleSubmit}>
            <label
            className='taskCreateTitle'>
                Create Task
            </label>
            {
                options[0].map((option, i) => 
                    <label 
                    className='taskCreateTxt' 
                    style={{top: `${10*i + 10}%`}}>
                        {option}
                    </label>
                )
            }
            <input
            className="taskCreateInput"
            type="text"
            required
            value={date}
            onChange = {(e)=>{setDate(e.target.value)}}
            style = {getStyle(0)}
            />
            <input
            className="taskCreateInput"
            type="text"
            required
            value={time}
            onChange = {(e)=>{setTime(e.target.value)}}
            style = {getStyle(1)}
            />
            <input
            className="taskCreateInput"
            type="text"
            required
            value={title}
            onChange = {(e)=>{setTitle(e.target.value)}}
            style = {getStyle(2)}
            />
            <input
            className="taskCreateInput"
            type="text"
            required
            value={description}
            onChange = {(e)=>{setDescription(e.target.value)}}
            style = {getStyle(3)}
            />
            <button
            style = {{position: 'absolute', top: '80%', height: '10%', width: '40%', left: '30%'}}>
              Create
            </button>
        </form>
    </div>
  );
}
const Calendar = ([mVisuals, setMVisuals]) => {
  currYear = String(today.getFullYear());
  let style;
  const monthFocus=(month)=>{
    setFocusedMonth(month);
  }
  const getMonths=()=>{
    let Months=[];
    for(let x = 0; x < 12; x++){
      Months.push(x);
    }
    return(Months);
  }
  const getMonthVisuals=(i)=>{
    user.getCalendar().getDatesWithTasks().forEach(xYear => {
      if(xYear.getYear() == currYear){
        xYear.getMonths().forEach(month => {
          if(parseInt(month.getTotalPrio()) > 0){
            console.log(month.getTotalPrio());
            let tempArr = mVisuals;
            tempArr[month.getMonth()-1] = `☆ ${month.getTotalPrio()}`;
            setMVisuals(tempArr);
            console.log(month.getTotalPrio());
          }
          else{
            let tempArr = mVisuals;
            tempArr[month.getMonth()-1] = '';
            setMVisuals(tempArr);
          }
        });
        console.log(currYear);
        return;
      }
      else{
        setMVisuals(['','','','','','','','','','','','']);
      }
    });
  }
  return(
    <div 
    className="Calendar">
      <label className='Year'>{year}</label>
      {
        getMonths().map(month => {
            if(month < 4){
            style = {
                top: `13%`,
                left: `${24.67*(month%4)+(month%4)*.3}%`
            }
            } else if(month < 8){
            style = {
                top: `42%`,
                left: `${24.67*(month%4)+(month%4)*.3}%`
            }
            } else{
            style = {
                top: `71%`,
                left: `${24.67*(month%4)+(month%4)*.3}%`
            }
            }
            return(
              <div 
              className="Month" style = {style}>
                  <body 
                  className = "mText">
                    {mOfYear[month]}
                  </body>
                  <label className='mText' style = {{left: "40%", position: 'absolute'}}>
                    {
                      mVisuals[month]
                    }
                  </label>
                  <button 
                  className = 'monthButton' 
                  onClick = {() => monthFocus(month)} >
                  </button>
              </div>
            );
        })
      }
      <button className='taskCreateInput' style = {{position: 'absolute', left: '35%', width: '2em', top: "3%"}} onClick = {()=>{currYear = parseInt(year)-1; setYear(currYear);  getMonthVisuals(); }}>←</button>
      <button className='taskCreateInput' style = {{position: 'absolute', left: '57%', width: '2em', top: "3%"}} onClick = {()=>{currYear = parseInt(year)+1; setYear(currYear); getMonthVisuals(); }}>→</button>
    </div>
  );
}
const MonthWindow=()=>{
  const getDayWindows=()=>{
    let components = [];
    let numOfDays = new Date(year, focusedMonth + 1, 0).getDate()
    console.log(numOfDays);
    let x = 0;
    for(let z = 1;x < numOfDays; z++){
      for(let y = 0; y < 7 && x < numOfDays; y++){
        components.push(<button value={`${x+1}`} onClick={(e)=>{
          setFocusedDay(e.target.value);
          setCompVisible(['none', 'none', 'block'])
          }} style={{position: 'absolute', backgroundColor: 'rgb(46, 46, 46)', height: '16%', width: '12%', top: `${17*z-3}%`, left: `${14*y + 2}%`}}>
          {`${x+1}th`}
        </button>);
        x++;
      }
    }
    return(components);
  }
  return(
    <div>
      {taskCreate()}
      <div className='Calendar'>
        <label className='Year'>{mOfYear[focusedMonth]}</label>
        {getDayWindows()}
      </div>
    </div>
  );
}
const dayWindow=()=>{
  const getTaskWindows=()=>{
    let components = [];
    let x = 0;
    if(user.getTasks().length > 0 && user.getTasks()[x] instanceof Task){
      components.push(<label className='Year' style={{textAlign: 'center' , top: '15%', left: '5%'}}>{"Date: "+user.getTasks()[0].getDate()}</label>);
      components.push(<label className='Year' style={{textAlign: 'center' , top: '25%', left: '5%'}}>{"Time: "+user.getTasks()[0].getTime()}</label>);
      components.push(<label className='Year' style={{textAlign: 'center' , top: '35%', left: '5%'}}>{"Title: "+user.getTasks()[0].getTitle()}</label>);
      components.push(<label className='Year' style={{textAlign: 'center' , top: '45%', left: '5%'}}>{"Description: "+user.getTasks()[0].getDescription()}</label>);
    }
    return components;
  }
  return(
    <div>
      {taskCreate()}
      <div className='Calendar'>
        <label className='Year'>Tasks:</label>
        {getTaskWindows()}
      </div>
    </div>
  );
}
export default App;