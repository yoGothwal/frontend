import Course from "./components/Course"
import Note from './components/Note'
import axios from 'axios'

import { useState, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid';

import noteService from './services/Notes'
import numberService from './services/Numbers'
import loginService from './services/login'
import blogService from './services/Blogs'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import './index.css'
const api_key = import.meta.env.VITE_SOME_KEY

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName]= useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage] = useState('')
  
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  useEffect(()=>{
    numberService.getAll()
    .then(data=>{
      console.log("NUMBERS:",data)
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
    const newPerson = {name: newName, number: newNumber}
    
    numberService
    .create(newPerson)
    .then(response=> {
      const newPersons = persons.concat(response.data);
      setPersons(newPersons);
      setMessage(`${newPerson.name} was added `)
    })
    .catch(error=>{
      console.log(error.response.data.error)
      setMessage(error.response.data.error)
    })
  }


  const removeUser = (id)=>{
    console.log("removeUser",id);
    numberService
    .remove(id).then(res =>{
      const updatedPersons = persons.filter(person => person._id !== id);
      setPersons(updatedPersons);
      setMessage("Deleted")
    }).catch(error => {
      console.error("Failed to delete person:", error);
    });
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
  useEffect(() => {
    setFilteredPersons(persons.filter(person => 
      person.name.toLowerCase().includes(search.toLowerCase())
    ));
  }, [persons, search]);  // This will run whenever 'persons' or 'search' changes
  

  ////////
//NOTES
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  // useEffect(()=>{
  //   noteService
  //   .getAll()
  //   .then(
  //     response => {
  //       const notes = response.data
  //       console.log("Notes :",notes)
  //       const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
  //       const user = JSON.parse(loggedUserJSON)
        
  //       if (user) {
  //         const filteredNotes = notes.filter(note => note.user.username === user.username);
  //         setNotes(filteredNotes);
  //       }
        
  //     })
  // }, [])
  // useEffect(() => {
  //   const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
    
  //   if (loggedUserJSON) {
  //     const user = JSON.parse(loggedUserJSON);
  //     setUser(user);
  //     noteService.setToken(user.token); // Set token for requests
  
  //     noteService.getAll()
  //       .then(response => {
  //         const notes = response.data;
  //         console.log("Fetched notes:", notes);
  //         if (user) {
  //           const filteredNotes = notes.filter(
  //             note => note.user && note.user.username === user.username
  //           );
  //           setNotes(filteredNotes);
  //         }
  //       })
  //       .catch(error => {
  //         console.error("Error fetching notes:", error);
  //       });
  //   } else {
  //     console.warn("No logged-in user found.");
  //   }
  // }, []);
  useEffect(() => {
    if (user) { // Fetch notes only when user is available
      noteService.getAll()
        .then(response => {
          const notes = response.data;
          console.log("Fetched notes:", notes);
          const filteredNotes = notes.filter(
            note => note.user && note.user.username === user.username
          );
          setNotes(filteredNotes);
        })
        .catch(error => {
          console.error("Error fetching notes:", error);
        });
    }
  }, [user]);
  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
      blogService.setToken(user.token)
      // console.log(user.name, user.username)
    }
  }, [])

  //conditional rendering for const [notes, setNotes] = useState(null)
  //if (!notes) { 
  //  return null 
  //}
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await loginService.login({username, password})
      const user = response.data
      console.log(user.token)
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      setUser(user) 
      noteService.setToken(user.token)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (error) {
      setMessage('Wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }
  const handleLogout = () => {
    window.localStorage.clear(); // Clears all data from localStorage
    setUser(null); // Resets the user state
  };
  const logoutButton = () => (
    <button type="button" onClick={handleLogout}>
      Logout
    </button>
  );
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )
  const noteForm = () => (
    <form onSubmit={addNote}>
      <input
        value={newNote}
        onChange={handleNoteChange}
        placeholder="Write a note"
      />
      <button type="submit">save</button>
    </form>  
  )
  const addNote = (event)=>{
    console.log("user ",user)
    event.preventDefault();
    if(newNote.trim() === '' || newNote.length < 3) {
      setMessage(`note must be > 3 letters"`);
      return
    }
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }
    noteService
    .create(noteObject)
    .then(response => {
      console.log("addnote button response: ", response.data)
      setNotes(notes.concat(response.data))
      const userID = response.data.user
      setNewNote('')
      setMessage(`Added`);
    })
    .catch(error=>{
      setMessage(error);
    })
  }
  
  const handleNoteChange = (event)=>{
    console.log(event.target.value)
    setNewNote(event.target.value)
  }
  const toggleImportanceOfNote = id => {
    const note = notes.find(n => n._id === id);
    console.log(note);
    // Check if note exists before proceeding
    if (!note) {
        console.log("Note not found!");
        return; // Exit the function if note is not found
    }

    const changedNote = { ...note, important: !note.important };
    console.log(changedNote);

    noteService.update(id, changedNote)
        .then(response => {
            console.log(response.data);
            setNotes(notes.map(n => n._id === id ? response.data : n));
            console.log("marked");
        })
        .catch(error => {
            console.log("error", error.message);
            setNotes(notes.filter(n => n._id !== id));
        });
};


  const handleNoteDelete = (id) => {
    noteService
      .remove(id)
      .then(response => {
        // Correctly filter the notes to exclude the deleted note
        const newNotes = notes.filter(note => note._id !== id)
        setNotes(newNotes); // Filter should return a boolean value
        setMessage(`Deleted `)
      })
      .catch(error => {
        console.error("Failed to delete note:", error); // Handle error appropriately
      });
  };
  
  const notesToShow = showAll ? notes : notes.filter(note => (note.important === true))

  
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


  //blogss
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    content: '',
  });
  const handleBlogChange = (event) => {
    const { name, value } = event.target;
    setNewBlog({
      ...newBlog,
      [name]: value, // Dynamically update the specific field
    });
  };
  
  useEffect(() => {
    if (user) { // Fetch notes only when user is available
      blogService.getAll()
        .then(response => {
          const blogs = response.data;

          const filteredBlogs = blogs.filter(
            blog => blog.user && blog.user.username === user.username
          );
          setBlogs(filteredBlogs);
        })
        .catch(error => {
          console.error("Error fetching notes:", error);
        });
    }
  }, [user]);
  const addBlog = (event) => {
    event.preventDefault();
    console.log("Adding blog:", newBlog);
  
    blogService
      .create(newBlog)
      .then((response) => {
        console.log("Blog added:", response.data);
        setBlogs((prevBlogs) => prevBlogs.concat(response.data)); // Update blogs list
        setNewBlog({ title: '', author: '', content: '' }); // Clear form inputs
        setMessage(`Added "${newNote}"`);
      })
      .catch((error) => {
        console.error("Error adding blog:", error);
      });
  };
  const blogForm = () => (
    <form onSubmit={addBlog}>
      <input
        name="title" // Input name matches the field in the state
        value={newBlog.title}
        onChange={handleBlogChange}
        placeholder="Write title"
      />
      <input
        name="author"
        value={newBlog.author}
        onChange={handleBlogChange}
        placeholder="Write author name"
      />
      <input
        name="content"
        value={newBlog.content}
        onChange={handleBlogChange}
        placeholder="Write content"
      />
      <button type="submit">save</button>
    </form>
  );
  
  
  const removeBlog = (id)=>{
    console.log("removeUser",id);
    blogService
    .remove(id)
    .then(res =>{
      const updatedBlogs = blogs.filter(blog => blog._id !== id);
      setBlogs(updatedBlogs);
      setMessage("Deleted  Blogs")
    }).catch(error => {
      console.error("Failed to delete blog:", error);
    });
  }
  
  return(
          
      <div>
        
        {message ? <Notification msg= {message}></Notification> : null}
        <div className="parts">
          <h1>NoteApp</h1>
          {user === null ?
            loginForm() :
            <div>
              <p>{user.name} logged-in</p>
              <div>
                <h3>Add note</h3>
                {noteForm()}
              </div>
              <div>
              <h3>Add blog</h3>
                {blogForm()}
              </div>
            </div>
          }
        
        </div>

        {user &&
            <div className="parts">
              <h1>Notes</h1>
              <button onClick={()=> setShowAll(!showAll)}>
                show {showAll ? 'important' : 'all'}
              </button>
              <ul>
              {notesToShow.map(note =>
                <Note 
                  note={note} 
                  key={note._id} // Use the note's id as the key
                  handleNoteDelete={() => handleNoteDelete(note._id)} 
                  toggleImportance={() => toggleImportanceOfNote(note._id)} 
                />
              )}
              </ul>
            </div>
            }
        {user &&
            <div className="parts">
              <h1>Blogs</h1>
              <ul>
              {blogs.map(blog => (
                <li key={blog._id}>
                  <h4>{blog.title}</h4>
                  <h5>{blog.author}</h5>
                  <p>{blog.content}</p>
                  <button onClick={()=>removeBlog(blog._id)}>Delete</button>
                </li>
              ))}
              </ul>
            </div>
          }
      
      {user && logoutButton()}
      
      {/* <div className="parts">
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
      </div> */}
      

      {/* <div className="parts">
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
          <li key={person._id}>
            {person.name}, {person.number} 
            <button onClick={()=>removeUser(person._id)}>Delete</button>
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
    </div> */}
      
    
      <Footer></Footer>
    </div>
  )

}
export default App