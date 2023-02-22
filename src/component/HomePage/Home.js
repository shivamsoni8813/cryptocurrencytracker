import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import './Home.css'
function Home() {
    let [currData, setCurrData] = useState([])
    let [searchCoins, setSearchCoins] = useState([])
    let [page, setPage] = useState(1)
    let [total, setTotal] = useState([])
    let [header, setHeader] = useState([])
    let navigate = useNavigate()
    let fetchData = async () => {
        try {
            let url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=10&page=${page}&sparkline=false`
            let { data } = await axios.get(url)
            setCurrData(data)
            setSearchCoins(data)
            let res = data.length;
            let newArray = new Array(res).fill(0)
            setTotal(newArray)
        } catch (error) {
            console.log(error)
        }
    }
    let fetchPageData = async () => {
        try {
            let url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=1000&page=1&sparkline=false`
            let { data } = await axios.get(url)
            console.log(data.length)
            setHeader(data)
        } catch (error) {
            console.log(error)
        }
    }

    console.log(currData)

    let handleChange = (ev) => {
        if (!ev || ev.length === 0) {
            setSearchCoins(currData)

        } else {

            let finding = currData.filter((e) => {
                return e.name.toUpperCase().includes(ev.toUpperCase())
            })
            setSearchCoins([...finding])
            console.log(searchCoins)
        }

    }

    let selectedPage = (s) => {
        setPage(s)
    }

    const previousClick = () => {
        setPage(page - 1)
    }

    const nextClick = () => {
        setPage(page + 1)

    }

    let singleCoinClick=(id)=>{
        navigate("coins/"+id)
    }

    useEffect(() => {
        fetchData()
        fetchPageData()
    }, [page])

    return (
        <div>

            <Navbar />
            <div className="crypto">
                <div className="cryptoHeader">

                    <div className="cryptoHeading text-center pt-5">

                        <h1>Crypto Tracker</h1>
                    </div>
                    <div className="cryptoContainer mt-5">

                        {header?.map((e, i) => {
                            return (
                                <div className="cryptoImg" key={i}>
                                    <div className="cryptoWrapper">
                                        <img src={e.image} className="cryptoImages" alt="" />
                                    </div>
                                    <div id="Help" className="form-text text-center text-white fw-bold ">{e.symbol.toUpperCase()}<span className={e.price_change_percentage_24h < 0 ? "currencyPercent text-danger text-center mx-2" : "currencyPercent text-success text-center mx-2"}>{e.price_change_percentage_24h
                                    }</span> </div>
                                    <div className="price text-center">
                                        <p>&#8377; {e.current_price}</p>
                                    </div>

                                </div>
                            )
                        })}

                    </div>
                </div>
                <div className="search mt-5">
                    <h2 className='text-center'>Cryptocurrency Price By Market Cap</h2>
                    <div className="coinSearch">
                        <form className="d-flex align-items-center justify-content-center " role="search">
                            <input className="form-control me-2 searchInput" onChange={(e) => handleChange(e.target.value)} type="search" placeholder="Search" aria-label="Search" />
                        </form>
                    </div>
                </div>
                <table className="table  my-3">
                    <thead>
                        <tr className='bg-warning'>
                            <th scope="col">Coin</th>
                            <th scope="col">Price</th>
                            <th scope="col">24h Change</th>
                            <th scope="col">Market Cap</th>
                        </tr>
                    </thead>
                    {
                        searchCoins?.map((e, i) => {
                            return (

                                <tbody className='text-white' key={i}>
                                    <tr>

                                        <td className='text-white tdclasses' onClick={()=>singleCoinClick(e.id)}><img src={e.image} className="coinImgLogo"  alt="" /> {e.symbol.toUpperCase()}<span className="align-middle align-middle fs-6 d-block mx-5 text-white">{e.name}</span></td>


                                        <td>&#8377; {e.current_price}</td>
                                        <td className={e.price_change_24h / 100 > 0 ? "text-success" : "text-danger"} >{e.price_change_24h / 100}%</td>
                                        <td>{e.market_cap}M</td>
                                    </tr>

                                </tbody>
                            )
                        })
                    }
                </table>
                <div className="pagination ">

                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-center ">

                            <li className="page-item">
                                <button className="btn btn-primary" disabled={page <= 1} onClick={() => previousClick()} >Previous</button>
                            </li>
                            {
                                total.map((_, i) => {
                                    return (

                                        <li className="page-item" key={i}><button onClick={() => selectedPage(i + 1)} className="btn btn-primary mx-2"  >{i + 1}</button></li>
                                    )
                                })
                            }

                            <li className="page-item">
                                <button className="btn btn-primary" disabled={page === total.length} onClick={() => nextClick()} >Next</button>
                            </li>
                        </ul>
                    </nav>

                </div>
            </div>
        </div>
    )
}

export default Home
