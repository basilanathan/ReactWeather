import React from "react";
import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";

const API_KEY = "9cdd8cd57fae7ff93e7d652fc42f6648";


class App extends React.Component {
  //initiat state
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }

  //get weather function => API Call
  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=imperial`);
    const data = await api_call.json();

    if (city && country) {
      console.log(data);

  //set state using the data from the API call
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ""
      });
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter a value."
      });
    }
  }

  //what is getting rendered on the app
  render() {
    return (
      <div>
      <div className="wrapper">
        <div className="main">
          <div className="container">
            <div className="row">
              <div className="col-xs-5 title-container">
                {/*Title component*/}
                <Titles />
              </div>
              <div className="col-xs-7 form-container">

                {/* Form component => passing in getWeather function */}
                <Form getWeather = {this.getWeather} />

                {/* Weather component => passing in state data */}
                <Weather
                  temperature = {this.state.temperature}
                  city = {this.state.city}
                  country = {this.state.country}
                  humidity = {this.state.humidity}
                  description = {this.state.description}
                  error = {this.state.error}
                />

              </div>
            </div>
          </div>
        </div>
      </div>

      </div>
    );
  }
}

export default App;
