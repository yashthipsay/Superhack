"use client"
import axios from 'axios';
import { useState, useEffect } from 'react';

import './uniswap.css'
import TheGraph from '../svgs/TheGraph';


const URL = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3';

const query = `
{
    pools(orderBy: volumeUSD, orderDirection: desc, first:10){
        id
        volumeUSD
        liquidity
        totalValueLockedUSD
        token0{
            symbol
        }
        token1{
            symbol
        }
    }
}
`;

export default function Home() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.post(URL, { query })
            .then((result) => {
                setData(result.data.data.pools);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div className='uniswap-container'>
            <TheGraph />
            <h1>Top 10 Uniswap V3 Pools</h1>
            <table>
                <thead>
                    <tr>
                        <th>Pool ID</th>
                        <th>Token 0</th>
                        <th>Token 1</th>
                        <th>Volume USD</th>
                        <th>Liquidity</th>
                        <th>Total Value Locked USD</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((pool) => (
                        <tr key={pool.id}>
                            <td>{pool.id}</td>
                            <td>{pool.token0.symbol}</td>
                            <td>{pool.token1.symbol}</td>
                            <td>${pool.volumeUSD}</td>
                            <td>${pool.liquidity}</td>
                            <td>${pool.totalValueLockedUSD}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
