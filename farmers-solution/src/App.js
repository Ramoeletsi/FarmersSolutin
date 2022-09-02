import React, {useState} from 'react'
import Plants from './PlantsDetails.json';
import './App.css';
import axios from 'axios';

function App() {

  const [data, setData] = useState({})
  const [getlocation, setGetLocation] = useState('')
  const [showMoreDetails, setShowMoreDetails] = useState(false);
    
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${getlocation}&units=metric&appid=eacf37967a7e8aadc0c904494f4f488c`

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", 
                  "May","June", "July", "August", "September",
                  "October", "Novmber", "December"
                  ];
    let days = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  const germinationDay = () => {
    const current = new Date();
  
    current.setDate(current.getDate() + 10);
    return(current.toDateString());
    
  }

  const growthRateCalculation = () => {

    const idealtemperature = 20;
    const idealhumidity = 55;

    const idealgrowth =  idealtemperature + idealhumidity;
    const obtainedgrowth = data.main.temp + data.main.humidity;

    const actualgrowth = idealgrowth - obtainedgrowth;

    if (actualgrowth === idealgrowth){
      return(germinationDay());
    }
    
    if (actualgrowth < idealgrowth){
      return( germinationDay());
    }

    else {
      return(actualgrowth);
    }
    
  }   
  
  
  const searchLocation = (event) =>{
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
      })
      setGetLocation('')
    }
  }

  return (
    <div className="App">
    <div className='search-box'>
      <input type="text" 
        value={getlocation}
        onChange = {event => setGetLocation(event.target.value)}
        onKeyPress={searchLocation}
        placeholder="Search By Location"
      />
    </div>
    <div className='search-box'>
      <input type="text" 
        value={getlocation}
        onChange = {event => setGetLocation(event.target.value)}
        onKeyPress={searchLocation}
        placeholder="Search By Plant"
      />
    </div>
    {data.name !== undefined &&
      <div className="weather-container">
        <div className='top'>
          <div className="location">
            <h1>{data.name}, {data.sys.country}</h1>
            <h2>{dateBuilder(new Date())}</h2>
          </div>
          <div className="temp">
           {data.main ? <h2>{data.main.temp.toFixed()}°c</h2> :null}
          </div>
          <div className="description">
          {data.weather ?  <h2>{data.weather[0].main}</h2> : null} 
          </div>
        </div>
        
       
          <div className="bottom">
            <div className="feels">
              <p>Feels like</p>
              {data.main ? <h2>{data.main.feels_like.toFixed()}°c</h2> :null}
            </div>
            
            <div className="humidity">
            <p>Humidity</p>
            </div>
            {data.main ? <h2>{data.main.humidity}%</h2> :null}
            
            <div className="wind">
            <p>Wind Speed</p>
            {data.wind ? <h2>{data.wind.speed.toFixed()}MPH</h2> :null}
            </div>

            <button onClick={ () => setShowMoreDetails(true)} > More Details</button>

            {showMoreDetails  && 
            <div>

            <h5>
              Suggested Plants You Can Grow In Your Area!!!
              { //check if the data exists then execute if its there
              Plants && Plants.map( plants => {
              return(
                <div key={plants.id}> 
                { data.main.humidity > 30 && plants.averagehumidity > data.main.humidity && data.main.temp > 10 && data.main.temp < plants.averagetemperature &&        
                 <p> Plant Name: {plants.name} 
                 <br></br>
                 Planting Day: {dateBuilder(new Date())}
                 <br></br>
                 Germination Day: {growthRateCalculation()}
                 <br></br>
                 Agriculture Practice: {plants.practices}
                 </p>
                }
                </div>
              )})
              }
            </h5>
          

          </div>
          }
        </div>          
  
      </div>
        }
    </div>
  );
}
export default App;
