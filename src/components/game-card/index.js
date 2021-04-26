import React from 'react'
import styles from './index.module.css'
import { pickCard } from '../../slices/gameSlice'
import { useDispatch, useSelector } from 'react-redux'



function GameCard({ index, number , n }) {
  const dispatch = useDispatch()
  const active = useSelector(state => state.game.flipped[index])

  return (
    <div className={styles.cardWrapper} 
      style={{
        "width": 90/n + "%",
        "fontSize": 40/n + "vmin"
      }}
    >
      <div 
        className={active ? styles.cardFlipped : styles.card}
        onClick={() => dispatch(pickCard(index))}
        
      >
        <div className={styles.front}
        style={{
          "backgroundColor": "hsl(" + 720/n/n*number + ", 100%, 50%)"
        }}
        >{number}</div>
        <div className={styles.back}></div>
      </div>
    </div>
  )
}

export default GameCard