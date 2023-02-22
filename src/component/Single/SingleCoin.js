import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import "./SingleCoin.css"
import Spinner from '../Utills/Spinner'
import CoinChart from './CoinChart'

function SingleCoin() {
    let [coinData, setCoinData] = useState([])
    let [loading, setLoading] = useState(false)
    let { id } = useParams()
    let singleApiForCoin = async () => {
        try {
            let url = `https://api.coingecko.com/api/v3/coins/${id}`
            setLoading(true)
            let { data } = await axios.get(url)
            console.log(data)
            setCoinData(data)
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        singleApiForCoin()
    }, [])
    return (
        <div>
            <Navbar />
            {loading && <Spinner/>}
            <div className="coindata d-flex">
                <div className="sideBar">

                    <div className="coinContainer">
                        <img src={coinData.image?.large} className="logoImg" alt="" />
                    </div>
                    <div className="coinInfo">
                        <h1 className='coinName'>{coinData.name}</h1>
                    </div>
                    <div className="description">
                        <p>{coinData.description?.en.slice(0, 189)}</p>
                    </div>
                    <div className="ranks">
                        <h3>Rank :{coinData.market_data?.market_cap_rank}</h3>
                    </div>
                    <div className="capital">
                        <h3>Current Price :&#8377; {coinData.market_data?.current_price.inr}</h3>
                    </div>
                    <div className="MarketCap">
                        <h3>Market Cap: &#8377;{coinData.market_data?.market_cap.inr}</h3>
                    </div>
                </div>
            <div className="chart">
                <CoinChart id = {id}/>
            </div>
            </div>
        </div>

    )
}

export default SingleCoin