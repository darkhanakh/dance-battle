import React, { useState } from 'react';
import {FC} from 'react'
import useDancerModelPath from '../hooks/useDancerModel';
import { PlayersMentor } from '../../pages/MentorSelection';


interface IBattle{
    player1: PlayersMentor
    player2: PlayersMentor
}

const Battle = () => {
    // const [score1, setScore1] = useState(0)
    // const [score2, setScore2] = useState(0)

    // const player1Model = useDancerModelPath(player1.name) //path to file .${name}.fbx
    // const player2Model = useDancerModelPath(player2.name) //path to file .${name}.fbx

    
    return (    
        <div>
            <iframe src="/iframes/index.html" width={1850} height={970}>
        
            </iframe>
        </div>
    );
};

export default Battle;