import { useState } from "react";
import axios from "axios";

export default function WeatherApp() {
    const [city, setCity] = useState('')
    const [weather, setWeather] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const fetchWeather = async () => {
        const key = '8c3c6aafd83ab3d60fecfc4ade19412f'

        if (!city) return
        setLoading(true)
        setError('')
        setWeather(null)

        try {
            const res = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`
            )
            console.log(res);
            setWeather(res.data)

        } catch (err) {
            setError('شهر وجود ندارد یا اتصال اینترنت قطع شده است!')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{ padding: '20', fontFamily: 'sans-serif', textAlign: 'center' }}>
            <input type="text" placeholder="Enter city..." value={city} onChange={e => setCity(e.target.value)} />
            <button onClick={fetchWeather}>Search</button>

            {loading && <p>Data is loading...</p>}
            {error && <p style={{ color: "red" }}>error</p>}
            {weather && (
                <div style={{ marginTop: 20 }}>
                    <img
                        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                        alt="weather-icon"
                    />
                    <h2>{weather.name}</h2>
                    <p>Temprature: {weather.main.temp}°C</p>
                    <p>Status: {weather.weather[0].description}</p>
                    <p>Feels like: {weather.main.feels_like}°C</p>
                    <p>Min: {weather.main.temp_min}°C / Max: {weather.main.temp_max}°C</p>
                    <p>Wet: {weather.main.humidity}%</p>
                    <p>ٌWind speed: {weather.wind.speed} m/s</p>
                </div>
            )}
        </div>
    )
}