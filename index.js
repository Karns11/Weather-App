function App() {

    const [input, setInput] = React.useState('');
    const [data, setData] = React.useState({});

    const fetchCityOnKeyPress = (evt) => {
        if (evt.key === 'Enter') {
            evt.preventDefault();
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=bbfa23bcb5271493e622c73f18ab414b`)
            .then(res => setData(res.data))
            .catch(err => console.log(err));
            setInput('');
        }
    };


    return (
        <div className='app'>
            <div className='container d-flex flex-column align-items-center justify-content-center pt-3'>
                <input type="text" className="form-control col-12 col-md-6 input-bar mb-3 py-3" placeholder="Enter A City..." value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={fetchCityOnKeyPress} />

                <Card data={data} />

                <div className='container text-center pt-5'>
                    <p>Developed by <a href='https://www.linkedin.com/in/nathan-karns-63820a216/'>Nathan Karns</a></p>
                </div>
                <div className='container text-center'>
                    {!data.main && <p>Please note: this app only searches by city and if there are multiple cities with the same name, it will only display data for the first city that the api finds with that name.</p>}
                </div>
            </div>
        </div>
    )
}


function Card({ data }) {

    const kelvinToF = (tempKelvin) => {
        const newTemp = (tempKelvin - 273.15) * 9/5 + 32;
        return Math.round(newTemp) + '°F';
    };

    return (
        <>
            <div className='card mt-5 col-md-6 weather-card'>
                <div className='card-body d-flex flex-column align-items-center justify-content-evenly text-center'>
                    <h1 className='py-3'>{data.name}</h1>
                    <h2 className='py-3'>{data.main && kelvinToF(data.main.temp)}</h2>
                    {data.weather && data.weather[0].description.includes('cloud') && (<i className='fas fa-cloud py-3'></i>)}
                    {data.weather && data.weather[0].description.includes('rain') && (<i className='fas fa-cloud-rain py-3'></i>)}
                    {data.weather && data.weather[0].description.includes('snow') && (<i className='fas fa-snowflake py-3'></i>)}
                    {data.weather && data.weather[0].description.includes('clear') && (<i className='fas fa-sun py-3'></i>)}
                    <h3 className='py-3'>{data.weather && data.weather[0].description}</h3>
                    {!data.main && <h3 className='pb-5'>Enter a city to see weather data!</h3>}
                </div>
                <div className='weather-card-footer d-flex flex-row align-items-center justify-content-evenly pt-5'>
                    <div className='feels-like d-flex flex-column align-items-center justify-content-center'>
                        <p>{data.main && 'Feels Like'}</p>
                        <p>{data.main && kelvinToF(data.main.feels_like)}</p>
                    </div>
                    <div className='humidity d-flex flex-column align-items-center justify-content-center'>
                        <p>{data.main && 'Humidity'}</p>
                        <p>{data.main && data.main.humidity + '%'}</p>
                    </div>
                    <div className='wind-speed d-flex flex-column align-items-center justify-content-center'>
                        <p>{data.main && 'Wind Speed'}</p>
                        <p>{data.main && data.wind.speed + ' mph'}</p>
                    </div>
                </div>
            </div>
        </>
    )
}



ReactDOM.render(<App />, document.getElementById('root'));
