import { useState } from "react";

const PrevisaoTemp = ({
  temp,
  country,
  name,
  description,
  icon,
}) => (
  <div className="previsaoTemp">
    <p>Temperatura: {temp}</p>
    <p>Pais: {country}</p>
    <p>Cidade: {name}</p>
    <p>{description}</p>
    <img src={icon} />
  </div>
)

function Search() {
  const [cidade, setCidade] = useState("");
  function searchInput(e) {
    e.preventDefault(e);
    let currentValue = document.querySelector("input[name=searchInput]").value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${currentValue}&appid=4d8fb5b93d4af21d66a2948710284366&units=metric`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const { main, name, sys, weather } = data;
        if (sys !== undefined) {

          if (weather !== undefined) {
            const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;

            const data = {
              temp: main.temp,
              country: sys.country,
              description: weather[0]['description'],
              icon: icon,
              name: name
            }

            setCidade(data);
          }
        } else {
          setCidade("");
        }
      })

  }
  return (
    <div className="searchWraper">
      <div className="search">
        <h1>PREVISÃO</h1>
        <h2>Digite a cidade</h2>
        <form onSubmit={(e) => searchInput(e)}>
          <input placeholder="Digite a Cidade....." type="text" name="searchInput"></input>
          <input type="submit" value="Pesquisar por cidade!"></input>
        </form>
      </div>

      {
        (cidade !== "")
          ?
          <>
            <PrevisaoTemp
              icon={cidade.icon}
              temp={cidade.temp}
              description={cidade.description}
              name={cidade.name}
              country={cidade.country}
            />
          </>
          : <div style={{ alignSelf: "flex-start", padding: "15px" }}>Pesquise pela cidade</div>
      }

    </div>
  )

}
export default Search;