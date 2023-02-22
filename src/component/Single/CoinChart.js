import axios from 'axios'
import './CoinChart.css'
import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Tooltip,
    Legend,
    registerables as registerablesJS
} from 'chart.js';


ChartJS.register(...registerablesJS);

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Tooltip,
    Legend,
);


const CoinChart = ({ id }) => {
    let [historicData, setHistoricData] = useState([])
    let [days, setdays] = useState(1)

    let cryptoChart = async () => {
        try {

            let url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=inr&days=${days}`
            let { data } = await axios.get(url)
            setHistoricData(data.prices)
            console.log("res", data);
        } catch (error) {
            console.log(error)
        }
    }
    console.log("hist", historicData)

    let forSingleDay = () => {
        setdays(1)
    }
    let for30Day = () => {
        setdays(30)
    }   
    let for90Day = ()=>{
        setdays(90)

        
    } 
    let forAYear = () =>{
        setdays(365)

    }
    useEffect(() => {
        cryptoChart()
    }, [days])


    return (
        <div>
            <div className="chartContainer my-5 mx-4">
                {<>
                    <Line
                        data={{
                            labels: historicData?.map((coin) => {
                                let date = new Date(coin[0])
                                let time = date.getHours() > 12
                                    ? `${date.getHours() - 12}:${date.getMinutes()}PM`
                                    : `${date.getHours()}:${date.getMinutes()}AM`
                                return days === 1 ? time : date.toLocaleDateString()
                            }),
                            datasets: [{
                                data: historicData.map((coin) => coin[1]),
                                label: `price(past ${days} Days) in inr`,
                                borderColor: "yellow",



                            }],

                        }}
                        options={
                            {
                                elements: {
                                    point: {
                                        radius: 1
                                    }
                                }
                            }
                        }
                    />
                </>
                }
                <div className="buttonContainer d-flex justify-content-around">
                    <button className='btn btn-warning my-4' onClick={() => forSingleDay()}> 1 Day</button>
                    <button className='btn btn-warning my-4' onClick={() => for30Day()}> 30 Day</button>
                    <button className='btn btn-warning my-4' onClick={() => for90Day()}> 90 Day</button>
                    <button className='btn btn-warning my-4' onClick={() => forAYear()}> 1 year</button>
                </div>
            </div>
        </div>
    )
}

export default CoinChart
