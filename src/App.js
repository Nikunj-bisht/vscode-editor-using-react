import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import MonacoEditor from '@uiw/react-monacoeditor';
import classes from './cont.module.css';
import Delcomp from './components/delcomp';
import axios from 'axios';
import Select from 'react-select';
import { Paper } from '@mui/material';


function App() {
  const options = [
    { value: 'java', label: 'JAVA' },
    { value: 'cpp', label: 'C++' },
    { value: 'py', label: 'Python' },
  ];

  const [lg , lgstate] = useState('');
  const [output_data , outputstate] = useState('');
  const [code_mat , codestate] = useState('');

console.log(lg.value);
  function changed(newval , event){
    console.log(newval);

codestate(newval);

}

function submitCode(){
  if(lg === ''){
    alert("select lang first")
    return;
  }
 let body = JSON.stringify({
    "code":`${code_mat}`,
  "language":`${lg.value}`,
  "input":""
  });

  var config = {
    method: 'post',
    url: 'https://springsche.herokuapp.com/api/code/output',
    headers: { 
      'Content-Type': 'application/json',
      'Accept':'application/json'
    },
    data : body
  };
  
  axios(config)
  .then(function (response) {
    console.log(response.data);
    outputstate(response.data);

  })
  .catch(function (error) {
    console.log(error);
  });
}

function langChanged(lan){

 console.log(lan);
 lgstate(lan.value);

}

  return (
<div className={classes.container}>

<div style={{height:"100vh",width:"50%"}}>
       <MonacoEditor
       onChange={changed}
  language="java"
  value=""
  options={{
    theme: 'vs-dark',
    fontSize:30
  }}/>

</div>

<div style={{width:"50%",height:"100vh",display:'flex',flexDirection:'column',backgroundColor:'#001E3C'}}>

<Delcomp codesubmit = {submitCode}></Delcomp>
<div style={{width:"100"}}>
<Select 
 value={lg}
 onChange={lgstate}
 options={options} 
></Select>

</div>
<Paper sx={{height:"100vh",padding:30,backgroundColor:'#001E3C',color:'white'}} elevation={3}>{output_data}</Paper>
</div>

</div>

  );
}

export default App;
