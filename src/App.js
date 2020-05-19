import React from "react";
import Cookies from 'universal-cookie';

const API_KEY = "7fbe54d69c0cbcd3996496858d4f0b09";
const cookies = new Cookies();

class App extends React.Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined,
    drzava1: cookies.get('drzava1'),
        drzava2: cookies.get('drzava2'),
        drzava3: cookies.get('drzava3'),
        mesto1: cookies.get('mesto1'),
        mesto2: cookies.get('mesto2'),
        mesto3: cookies.get('mesto3')
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
        error: (info.message) ? info.message : '',
        drzava1: cookies.get('drzava1'),
        drzava2: cookies.get('drzava2'),
        drzava3: cookies.get('drzava3'),
        mesto1: cookies.get('mesto1'),
        mesto2: cookies.get('mesto2'),
        mesto3: cookies.get('mesto3')
        

      });
      var mesto1 = cookies.get('mesto1');
      var mesto2 = cookies.get('mesto2');
      var mesto3 = cookies.get('mesto3');

      cookies.set('mesto1', mesto, { path: '/' });
      cookies.set('mesto3', mesto2, { path: '/' });
      cookies.set('mesto2', mesto1, { path: '/' });
      
     

      var drzava1 = cookies.get('drzava1');
      var drzava2 = cookies.get('drzava2');
      var drzava3 = cookies.get('drzava3');

      cookies.set('drzava1', drzava, { path: '/' });
      cookies.set('drzava3', drzava2, { path: '/' });
      cookies.set('drzava2', drzava1, { path: '/' });
      
      

    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Vnesi podatke",
        drzava1: cookies.get('drzava1'),
        drzava2: cookies.get('drzava2'),
        drzava3: cookies.get('drzava3'),
        mesto1: cookies.get('mesto1'),
        mesto2: cookies.get('mesto2'),
        mesto3: cookies.get('mesto3')
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
            <button >Pridobi vreme</button>
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
<div className="visits">
Tvoja zadnja obiskana mesta:
          <form onSubmit={this.vremeGet}>
            <input type="text" name="city" placeholder="Mesto" value={this.state.mesto1} hidden/>
            <input type="text" name="country" placeholder="Država" value={this.state.drzava1} hidden/>
            <button>{this.state.mesto1},{this.state.drzava1}</button>
          </form>

          <form onSubmit={this.vremeGet}>
            <input type="text" name="city" placeholder="Mesto" value={this.state.mesto2} hidden/>
            <input type="text" name="country" placeholder="Država" value={this.state.drzava2} hidden/>
            <button>{this.state.mesto2},{this.state.drzava2}</button>
          </form>

          <form onSubmit={this.vremeGet}>
            <input type="text" name="city" placeholder="Mesto" value={this.state.mesto3} hidden/>
            <input type="text" name="country" placeholder="Država" value={this.state.drzava3} hidden/>
            <button>{this.state.mesto3},{this.state.drzava3}</button>
          </form>
</div>
  
        </div>
      </div>
    );
  }
};

export default App;