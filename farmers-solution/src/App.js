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
              Suggested Crops, Fruits And Vegetables You Can Grow In Your Area This Season!!!
              { //check if the data exists then execute if its there
              Plants && Plants.map( plants => {
              return(
                <div key={plants.id}> 
                { data.main.humidity > 20 && plants.averagehumidity > data.main.humidity && data.main.temp > 9 && data.main.temp > plants.averagetemperature && plants.country === data.sys.country &&        
                 <p> Plant Name: {plants.name} 
                 <br></br>
                 Germination Days: {plants.seedgerminationdays}
                 <br></br>
                 Soil pH: {plants.soilpH}
                 <br></br>
                 Soil Type: {plants['soiltype ']}
                 <br></br>
                 Sow Period: {plants.sowperiod}
                 <br></br>
                 Bloom Period: {plants.bloomperiod}
                 <br></br>
                 Harvest Period: {plants.harvestperiod}
                 <br></br>
                 Weeding Period: {plants.weedingperiod}
                 <br></br>
                 Agriculture Practice: {plants.practices}
                 <br></br>
                 Seed Germination Days: {plants.seedgerminationdays}
                 <br></br>
                 Germination-Harvest Days: {plants.germinationtoharvestperiod}
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
