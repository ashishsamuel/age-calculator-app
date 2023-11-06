import { DatePicker } from '@mui/x-date-pickers'
import React, { useState } from 'react'
import './HomePage.css'
import { TextField } from '@mui/material';
import dayjs from 'dayjs';
import { format } from 'date-fns';

function HomePage() {
    const [name,setName] = useState("")
    const [country,setCountry] = useState("")
    const [dateValue,setDateValue] = useState(null);
    const [dobValue,setDobValue] = useState(null)
    const [year,setYear] = useState(0)
    const [month,setMonth] = useState(0)
    const [day,setDay] = useState(0)
    const [showUserDetails,setshowUserDetails] = useState(false)
    const [isNameValid,setIsNameValid] = useState(true)
    const [isCountryValid,setIsCountryValid] = useState(true)
    const [isDobValid,setIsDobValid] = useState(true)

const currentDate = new Date();

    const convert=(str)=> {
        var mnths = {
            Jan: "01",
            Feb: "02",
            Mar: "03",
            Apr: "04",
            May: "05",
            Jun: "06",
            Jul: "07",
            Aug: "08",
            Sep: "09",
            Oct: "10",
            Nov: "11",
            Dec: "12"
          },
          date = str.split(" ");
      
        return [date[3], mnths[date[1]], date[2]].join("-");
      }
    
    const changeDate = (value)=>{
setshowUserDetails(false)
            if(value!=null){
        setDateValue(convert(value.$d.toString()))
        setIsDobValid(true)
            }
            else{
                setIsDobValid(true)
                setYear(0);
        setMonth(0);
        setDay(0);
        setDateValue(null)
            }
    }

    const validateInput = (e)=>{
        const {value,name} = e.target;
setshowUserDetails(false)

        if(name === "name"){
            if(!!value.match(/^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$/)){
                setName(value);
                setIsNameValid(true)
            }
            else{
                setName(value)
            setIsNameValid(false)
            if(value === ""){
              setIsNameValid(true)
            }
        }
        }
        else if(name === "country"){
            if(!!value.match(/^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$/)){
                setCountry(value);
                setIsCountryValid(true)
            }
            else{
                setCountry(value)
            setIsCountryValid(false)
            if(value === ""){
              setIsCountryValid(true)
            }
        }
        }
    }

    const reset=(e)=>{
        e.preventDefault()
        setYear(0);
        setMonth(0);
        setDay(0);
        setName("")
        setCountry("")
        setDateValue(null)
        setshowUserDetails(false)
        setIsCountryValid(true)
        setIsNameValid(true)
        setIsDobValid(true)
    }

    const calculateAge = (e) =>{
    e.preventDefault();
        

        const selectedDate = new Date(dateValue);
        
if(!name || !country || !dateValue){
    alert("Please fill the form completely")
  }else{
    setDobValue(format(new Date(dateValue.split("-").toString()),'dd MMM yyyy'))

        // calculate years 
     
            if (currentDate.getMonth() > selectedDate.getMonth() || currentDate.getMonth() == selectedDate.getMonth()) {

                setYear(currentDate.getFullYear() - selectedDate.getFullYear());
            }
            else {
                setYear(currentDate.getFullYear() - selectedDate.getFullYear() - 1);
            }


        // calculate months 

    

        if(currentDate.getDate() >= selectedDate.getDate()){
            let monthValue = currentDate.getMonth() - selectedDate.getMonth();
            if(monthValue<0){
                setMonth(monthValue+12)
            }
            else{
                setMonth(monthValue)
            }
          
        }
      
        else if(currentDate.getDate() < selectedDate.getDate()){
            let monthValue = (currentDate.getMonth() - selectedDate.getMonth());
            if(monthValue<0){
                setMonth(monthValue+12)
            }
            else{
                setMonth(monthValue)
            }
          
        }
        

        // calculate days

        // days of months in a year
        const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        if(currentDate.getDate() >= selectedDate.getDate()){
            setDay(currentDate.getDate() - selectedDate.getDate());
        }
        else{
            setDay(currentDate.getDate() - selectedDate.getDate() + monthDays[selectedDate.getMonth()]);

        }
        
  
    if(selectedDate<=currentDate){
        setshowUserDetails(true)
    }
    else{
        setshowUserDetails(false)
    }
}
    }

  return (
    <>
        <div className='container details-section' style={{height:'100vh'}}>
              <h2 className='text-center my-4'>Age Calculator</h2>
              <div className='form-section'>
                <form className='d-flex align-items-center flex-column' style={{width:'100%'}} onSubmit={calculateAge}>
                    <div className='mt-4 mb-2 w-75'>
                        <TextField className='textfield-style' id="standard-basic" value={name || ""}
                         label="* Name" variant="outlined" name='name' onChange={(e)=>validateInput(e)}/>
                    </div>
                    {
            !isNameValid &&
            <div className='text-danger error-msg'>
              *Invalid Name
            </div>
          }
                    <div className='my-3 w-75'>
                        <TextField className='textfield-style' id="standard-basic" value={country || ""}
                         label="* Country" variant="outlined" name='country' onChange={(e)=>validateInput(e)}/>
                    </div>
                    {
            !isCountryValid &&
            <div className='text-danger error-msg'>
              *Invalid Country 
            </div>
          }
                    <div className='my-3 w-75'>
                    <DatePicker selected={dateValue} label="* Date Of Birth" value={dateValue || ""} maxDate={dayjs(currentDate)}
                     openTo="year"
                // slotProps={{
                //     textField: {
                //         helperText: 'DD-MM-YYYY',
                //     },
                // }}
                format="DD-MM-YYYY" id="dob" 
                views={['year', 'month', 'day']} onChange={(value)=>changeDate(value)} className='date-style'/>
                </div>
                {
            !isDobValid &&
            <div className='text-danger error-msg'>
              *Invalid Date Of Birth
            </div>
          }
              <div className='d-flex mt-4'>
                  <button className='btn bg-dark text-light mx-2' disabled={isNameValid && isCountryValid && isDobValid?false:true}>Calculate Age</button>
                  <button className='btn bg-dark text-light mx-2' onClick={(e)=>reset(e)}>Reset</button>
              </div>
                </form>
                
              </div>
              { showUserDetails &&
              <div className='d-flex flex-column my-4 p-3 display-details justify-content-center'>
                <h6><b>Name : {name}</b></h6>
                <h6><b>Country : {country}</b></h6>
                <h6><b>Date Of Birth : {dobValue}</b></h6>
                <h6 className='displayAge'><b>Age : {year!=0 ? year > 1?`${year} years `: `${year} year `: ""}{month!=0 ? month > 1?`${month} months `: `${month} month `: ""}{day!=0 ? day > 1?`${day} days `: `${day} day `: ""}</b></h6>
                <p className='bday-msg'>{(month === 0 && day === 0) || (month ===0 && day===0 && year ===0)?`Today is your Birthday.....Enjoy and celebrate...........`:""}</p>
              </div>
}

              
        </div>
    </>
  )
}

export default HomePage
