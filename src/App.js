import React from "react";

const API_KEY = "7fbe54d69c0cbcd3996496858d4f0b09";

class App extends React.Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }
  vremeGet = async (e) => {
    e.preventDefault();
    const drzava = e.target.elements.country.value;
    const mesto = e.target.elements.city.value;
    const apicall = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${mesto},${drzava}&appid=${API_KEY}`);
    const info = await apicall.json();
    if (mesto && drzava) {
      this.setState({
        temperature: (info.main && info.main.temp) ? info.main.temp : '',
        city: (info.name) ? info.name : '',
        country: (info.sys && info.sys.country) ? info.sys.country : '',
        humidity: (info.main && info.main.humidity) ? info.main.humidity : '',
        description: (info.weather && info.weather[0].description) ? info.weather[0].description : '',
        error: (info.message) ? info.message : ''
      });
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Vnesi podatke"
      });
    }
  }
  render() {
    return (
      <div className="back">
        <h1 className="naslov">Weather Search</h1>

        <div className="col-xs-7 form-container">
          <form onSubmit={this.vremeGet}>
            <input type="text" name="city" placeholder="Mesto" />
            <input type="text" name="country" placeholder="Država" />
            <button>Pridobi vreme</button>
          </form>

          <div className="vremepodatki">
            {
              this.state.city && this.state.country && <p className="vremekey"> Lokacija:
	 		                <span className="vremevalue"> {this.state.city}, {this.state.country}</span>
              </p>
            }
            {
              this.state.humidity && <p className="vremekey"> Vlažnost:
	 		                <span className="vremevalue"> {this.state.humidity} </span>
              </p>
            }
            {
              this.state.temperature && <p className="vremekey"> Temperatura:
	 		                <span className="vremevalue"> {this.state.temperature}	</span>
              </p>
            }
            {
              this.state.description && <p className="vremekey"> Kondicije:
	 		                <span className="vremevalue"> {this.state.description} </span>
              </p>
            }
            {
              this.state.error && <p className="vremenapaka">{this.state.error}</p>
            }
            <p className="vremekey"></p>
          </div>
        </div>
      </div>
    );
  }
};

export default App;