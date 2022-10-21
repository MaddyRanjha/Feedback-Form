import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { CoPresentOutlined } from '@mui/icons-material';



function App() {
  const [userName, setUserName] =React.useState('')
  const [userMessage, setUserMessage] =React.useState('')

  const [messageList, setMessageLsit]=React.useState([])
  const [getMessages, setGetMessages] =React.useState(true)


  const handleSubmitFeedback=()=>{

    if(userName === '' || userMessage === ''){
      alert('Please enter your name and message')
      return;
    }

    fetch('https://learning-reactjs-9c95e-default-rtdb.asia-southeast1.firebasedatabase.app/feedback.json',
    {
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        userName: userName,
        userMessage: userMessage,
      })
    }
    )
    .then(res => res.json())
    .then(data =>{
      // console.log(data)
      setUserName('')
      setUserMessage('')
      // alert("feedback submittted successfully")
      setGetMessages(true)
    })
  }
  
  useEffect(()=>{
    if(getMessages){
      fetch('https://learning-reactjs-9c95e-default-rtdb.asia-southeast1.firebasedatabase.app/feedback.json')
      .then(res => res.json())
      .then(data =>{
        console.log(data)
        const loadedFeedback =[];
        for(const key in data){
          loadedFeedback.push({
            id:key,
            userName: data[key].userName,
            userMessage:data[key].userMessage,
          })
        }
        console.log(loadedFeedback)
        setMessageLsit(loadedFeedback)
      })
      setGetMessages(false)
    }
  },[getMessages])

  return (
    <div className='app-container'>
      <div className='main-container'>
      <div className='form-container'>
        <h2>
          Message Secretly
        </h2>
      <TextField
          required
          id="outlined-required"
          label="Name"
          defaultValue=""
          value={userName}
          onChange={(e)=> setUserName(e.target.value)}
        />
        <TextField
          id="outlined-multiline-static"
          label="Message"
          multiline
          rows={4}
          value={userMessage}
          onChange={(e)=> setUserMessage(e.target.value)}
        />
      <Button variant="contained" onClick={handleSubmitFeedback}>click</Button>

    </div>
    <div className='feedback-container'>
    {
          messageList && messageList.map((item, index) => {
            return (
              <div className='feedback-item' key={index}>
                <h3>{item.userName}</h3>
                <p>{item.userMessage}</p>
              </div>
            )
          })
        }
    </div>

      </div>
    </div>
  );
}

export default App;
