import React from 'react'
import { useSelector } from 'react-redux'
import { isFinished } from '../../slices/gameSlice'
import GameCard from '../../components/game-card'
import Modal from '../../components/modal'


const GameArea = ({ n, data }) => {
  const finished = useSelector(isFinished)
  return <>
    <div className="playArea">
      {
        data.map((number, index)  => ( 
          <GameCard key={index} n={n} index={index} number={number}/>
        ))
      }
     
     {finished && <Modal n={n} /> }
    </div>
  </>
}

export default GameArea