import React from 'react';
import Battle from '../components/Battle/Battle';
import { useLocation } from 'react-router';
import queryString from 'query-string'
const BattlePage = () => {
    const location = useLocation();

    const queryParams = queryString.parse(location.search);
    const player1 = String(queryParams.player1)
    const player2 = String(queryParams.player2)

    console.log(player1, player2)
    return (
        <div>
            <Battle player1={player1} player2={player2} />
        </div>
        );
    };

export default BattlePage;