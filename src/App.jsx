import Course from "./components/Course"
import Note from './components/Note'
import axios from 'axios'
import { useState, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid';
import noteService from './services/Notes'
import numberService from './services/Numbers'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import './index.css'
const api_key = import.meta.env.VITE_SOME_KEY

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName]= useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage] = useState('')
  useEffect(()=>{
    numberService.getAll()
    .then(data=>{
      console.log("NUMBERS: ",data)
      setPersons(data)
    })
    
  }, [])
  
  
  
  const handleNameChange = (e)=>{
    console.log(e.target.value)
    setNewName(e.target.value)
  }
  const handleNumberChange = (e)=>{
    setNewNumber(e.target.value)
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    if(newName.trim() === '' || newNumber.trim()==='') {alert("fill each field"); return};
    if(persons.some(person=> person.number===newNumber)) {
      const existingUser = persons.find(person=> person.number===newNumber)
      alert(`${newName} is already added to phonebook with number ${existingUser.name}`)
      return;
    }
    const newPerson = { id: uuidv4(), name: newName, number: newNumber}
    
    numberService
    .create(newPerson)
    .then(response=> {
      console.log(persons)
      setPersons([...persons,response.data])
      setMessage(`${newPerson.name} was added `)
      setTimeout(() => {
        setMessage(``)
      }, 2000);
    })
    
    console.log('Button clicked', e.target)
  }


  const removeUser = (id)=>{
    numberService
    .remove(id)
    .then(response => {
      setPersons(persons.filter(person => person.id !== id))
      console.log("success deletion")
    })
  }
  const [search, setSearch] = useState('');
  const [filteredPersons, setFilteredPersons] = useState(persons)
  
  const results = persons.filter(person => 
      person.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    )
  const handleSearchChange = (e)=>{
    setSearch(e.target.value)
  }
  const handleSearch = ()=>{
    setFilteredPersons(results)
  }

  ////////
//NOTES
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)

  useEffect(()=>{
    //console.log("before render")
    noteService
    .getAll()
    .then(
      response => {
        console.log('NOTES', response.data)
        setNotes(response.data)
      })
  }, [])

  //conditional rendering for const [notes, setNotes] = useState(null)
  //if (!notes) { 
  //  return null 
  //}

  const addNote = (event)=>{
    event.preventDefault();
    if(newNote.trim() === '') return;
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: uuidv4()
    }
    
    noteService
    .create(noteObject)
    .then(response => {
      setNotes(notes.concat(response.data))
      setNewNote('')
      setMessage(`${noteObject.content} was added `)
    })

    console.log('Button clicked', event.target)

  }
  const handleNoteChange = (event)=>{
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const toggleImportanceOfNote = id => {
    
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
  
    
    noteService.update(id, changedNote)
    .then(response => {
      console.log(response.data)
      setNotes(notes.map(n => n.id === id ? response.data : n))
      console.log("marked")
    })
    .catch(error => {
      setMessage(
        `Note '${note.content}' was already removed from server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      console.log("error",error.message)
      setNotes(notes.filter(n => n.id !== id))
    })

  }

  const handleNoteDelete = (id) => {
    noteService
      .remove(id)
      .then(response => {
        // Correctly filter the notes to exclude the deleted note
        const newNotes = notes.filter(note => note.id !== id)
        setNotes(newNotes); // Filter should return a boolean value
        setMessage(`${response.data.content} was deleted `)
      })
      .catch(error => {
        console.error("Failed to delete note:", error); // Handle error appropriately
      });
  };
  
  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

  
  const Notification = ({msg})=>{
    if(msg == null) return null;
    return(
      <div className="error">{msg}</div>
    )
  }

  const handleRefresh = () => {
    window.location.reload();
  };
  const Footer = ()=>{
    const footerStyle = {
      color: 'green',
      fonsStyle: 'italic',
      fontSize: 16
    }
    return(
      <div className="footerStyle">
        <em>Note app</em>
      </div>
    )
  }


  ////CURRENCY
  const [value, setValue] = useState('')
  const [rates, setRates] = useState({})
  const [currency, setCurrency] = useState(null)

  useEffect(() => {
    console.log('effect run, currency is now', currency)

    // skip if currency is not defined
    if (currency) {
      console.log('fetching exchange rates...')
      axios
        .get(`https://open.er-api.com/v6/latest/${currency}`)
        .then(response => {
          setRates(response.data.rates)
          console.log(rates);
        })
    }
  }, [currency])

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const onSearch = (event) => {
    event.preventDefault()
    setCurrency(value)
  }

  //Country details
  const [searchCountry, setSearchCountry] = useState(null)
  const [countryName, setCountryName] = useState('');
  const [details, setDetails] = useState([])
  const handleCountryChange = (e)=>{
    setCountryName(e.target.value)
  }
  useEffect(()=>{
    if (!searchCountry) return;
    console.log("AFTER 1ST RENDERING")
    const url = "https://studies.cs.helsinki.fi/restcountries/api/all";
    axios.get(url)
    .then(response => {
      const searches = response.data.filter(
        country => country.name.common.toLowerCase().includes(searchCountry.toLocaleLowerCase())
      );
      console.log(searches)
      setDetails(searches || {});
    })
  },[searchCountry])
  const onCountrySearch = (e)=>{
    e.preventDefault()
    setSearchCountry(countryName);
  }

  const [city, setCity] = useState('');
  const [weatherSearch, setWeatherSearch] = useState('');
  const [weatherDetails, setWeatherDetails] = useState(null);
  const handleCity = (e)=>{
    setCity(e.target.value);
  }
  const onWeatherSearch = (e)=>{
    e.preventDefault();
    setWeatherSearch(city);
  }
  useEffect(()=>{
    if (!weatherSearch) return;
    const apiKey = 'f69fd6b133c5afbdbfe3967e6313473d'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${weatherSearch}&appid=${apiKey}&units=metric`; // Metric units for Celsius

    axios.get(url)
      .then(response => {
        const searches = response.data
        console.log(searches);
        setWeatherDetails(searches);
        setMessage(''); // Clear error message if request is successful
      })
      .catch(err =>{
        console.log("Invalid Name");
      })
      
  },[weatherSearch])

  return(

      <div>
      <div className="parts">
        <h1>Weather</h1> 
        <form onSubmit={onWeatherSearch}>
            <input value={city} onChange={handleCity} />
            <button type="submit">Search</button>
        </form>
        {weatherDetails && (
          <div>
            <h2>{weatherDetails.name}, {weatherDetails.sys.country}</h2>
            <p>Temperature: {weatherDetails.main.temp} °C</p>
            <p>Weather: {weatherDetails.weather[0].description}</p>
            <p>Humidity: {weatherDetails.main.humidity} %</p>
            <p>Wind Speed: {weatherDetails.wind.speed} m/s</p>
          </div>
        )}
      </div>

      <div className="parts">
        <h1>Currency</h1>
        <form onSubmit={onSearch}>
          <input value={value} onChange={handleChange} />
          <button type="submit">exchange rate</button>
        </form>
        <br />
        {rates && (
          <div>
            <p>USD: {rates.USD}</p>
            <p>EUR: {rates.EUR}</p>
          </div>
        )} 
    </div>

    <div className="parts">
      <h1>Country Details</h1> 
      <form onSubmit={onCountrySearch}>
          <input value={countryName} onChange={handleCountryChange} />
          <button type="submit">Search</button>
      </form> 
      <div><br />
      {details.map((country, index) => (
          <div key={index}>
              <h2>{country.name.common}</h2>
              <img src={`${country.flags.png}`} alt="" />
              <p>Region: {country.region}</p>
              <p>Capital: {country.capital}</p>
              <br />
          </div>
      ))}
      </div>
    </div>

    <div className="parts">
    <h1>PHONEBOOK</h1>
      <div>
        <input onChange={handleSearchChange} />
        <button onClick={handleSearch} type="submit">Search</button>
      </div><br />
      <h4>Numbers</h4>
      <ul>
        {results.map(person => (
          <li key={person.id}>
            {person.name}, {person.number} 
            <button onClick={() => removeUser(person.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <div>
          <h3>Add new contact</h3>
          name: <input onChange={handleNameChange} value={newName}/><br /><br />
          number: <input onChange={handleNumberChange} value={newNumber}/>
          
        </div><br />
        <div>
          <button type="submit" >Add number</button>
        </div>
      </form>
    </div>
      
      
      
      <br />
      <div>
       <h1>Notes</h1>
       {message ? <Notification msg= {message}></Notification> : null}
       <button onClick={()=> setShowAll(!showAll)}>
         show {showAll ? 'important' : 'all'}
       </button>
       <ul>
         {notesToShow.map(note=>
           <Note note={note} key={uuidv4()} handleNoteDelete={()=> handleNoteDelete(note.id)} toggleImportance={()=>toggleImportanceOfNote(note.id)}></Note>
           
         )}
       </ul>
       <form onSubmit={addNote}>
         <input value ={newNote} onChange={handleNoteChange} />
         <button type="submit">Save</button>
       </form>
       <Footer></Footer>
     </div>

    </div>
  )
  
  
  

}
export default App