import React, { useState } from 'react'
import './index.css'
import { initGame } from '../../slices/gameSlice'
import { useDispatch } from 'react-redux';


const GameLevel = {
  EASY: 4,
  MEDIUM: 6,
  HARD: 8,
  SUPER_HARD:10
}

const StartArea = () => {
  const dispatch = useDispatch()
  const [contentClass, setClass] = useState('')
  const show = () => {
    contentClass
                ? setClass('')
                : setClass('show')
  }

  return (
    <div>
      <h3>Choose a difficulty level</h3>
      <div className="dropdown">
        <button onClick={() => show() } className="dropbtn">
          Choose a level
        </button>
        <div className={"dropdown-content " + contentClass} id="levelList">
          <span onClick={() => dispatch(initGame(GameLevel.EASY))}>
            Easy
          </span>
          <span onClick={() => dispatch(initGame(GameLevel.MEDIUM))}>
            Medium
          </span>
          <span onClick={() => dispatch(initGame(GameLevel.HARD))}>
            Hard
          </span>
          <span onClick={() => dispatch(initGame(GameLevel.SUPER_HARD))}>
            Like a God
          </span>
        </div>
      </div>
    </div>
  )
}

export default StartArea