import { useState, useEffect } from 'react'
import './styles.css'

export default function GameSecuence({ newConfig, numberDrums }) {
  const [drumActive, setDrumActive] = useState(999)
  const [round, setRound] = useState(1)
  const [drums, setDrums] = useState([])
  const [secuence, setSecuence] = useState([])
  const [subsecuence, setSubsecuence] = useState([])
  const [secuenceClick, setSecuenceClick] = useState([])

  const color = [
    '#ffff00',
    '#ff00f5',
    '#0006ff',
    '#0bff00',
    '#ff0023',
    '#00bdff',
    '#e6610b',
    '#5b15ed',
    '#82560b',
    '#46820b',
    '#0b3782',
    '#6f1e5d',
    '#9dba40',
    '#15edb2'
  ]

  useEffect(() => {
    const Secuence = []
    while (Secuence.length < 30) {
      const num = Math.floor(Math.random()*(Number(numberDrums)))
      Secuence.push(num)
    }
    setSecuence(Secuence)

    const drums = Array(Number(numberDrums))
    drums.fill(0,0)

    setDrums(drums)
  }, [])
  
  useEffect(() => {
    if (secuence.length) {
      showSecuence()
    }
  }, [secuence, round])

  useEffect(() => {
    // Comparar las dos secuencias
  }, [secuenceClick])
  

  const handleDrumClick = (id) => {
    console.log('drum: ', id)
    const temp = secuenceClick.map(i => i)
    temp.push(id)
    setSecuenceClick(temp)
  }

  const showSecuence = () => {
    const Subsecuence = secuence.slice(0, round)
    setSubsecuence(Subsecuence)
    console.log('subsecuence', Subsecuence)
    let index = 0;
    const interval = setInterval(() => {
      console.log('INDEX', index)
      setDrumActive(Subsecuence[index])
      index += 1
      if (index > Subsecuence.length) {
        console.log('clear', Subsecuence.length)
        clearInterval(interval)
      }
    }, 1000);
  }

  return (
    <section className='game_secuence'>
      <nav>
        <p>Round {round}</p>
        <p>your best score: 1</p>
        <button
          onClick={newConfig}
        >New Game</button>
      </nav>

      <div className='container'>
        {drums.map((_, id) => (
          <Drump
            id={id}
            key={id}
            active={id === drumActive}
            color={color[id]}
            click={handleDrumClick}
          />
        ))}
      </div>
    </section>
  )
}

const Drump = ({
  id,
  active,
  color,
  click
}) => {

  const [drumpActive, setDrumActive] = useState(false)

  const handleClick = () => {
    setDrumActive(true)
    click(id)
    setTimeout(() => {
      setDrumActive(false)
    }, 500);
  }

  return (
    <div className='drum' onClick={handleClick}>
      <div
        className={`drum_inner ${active || drumpActive ? 'active' : 'deactive'}`}
        style={{ background: color }}>
      </div>
    </div>
  )
}