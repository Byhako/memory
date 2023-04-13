import { useState, useEffect } from 'react'
import './styles.css'

export default function GameSecuence({ newConfig, numberDrums }) {
  const [drumActive, setDrumActive] = useState(999)
  const [round, setRound] = useState(1)
  const [score, setScore] = useState(localStorage.getItem('score'))
  const [drums, setDrums] = useState([])
  const [secuence, setSecuence] = useState([])
  const [subsecuence, setSubsecuence] = useState([])
  const [secuenceClick, setSecuenceClick] = useState([])
  const [showNewRound, setShowNewRound] = useState(false)
  const [showError, setShowError] = useState(false)

  const color = [
    '#ffff00',
    '#ff00f5',
    '#0006ff',
    '#0bff00',
    '#ff0023',
    '#00bdff',
    '#e6610b',
    '#46820b',
    '#5b15ed',
    '#82560b',
    '#6f1e5d',
    '#0b3782',
    '#9dba40',
    '#d18307',
    '#15edb2'
  ]

  useEffect(() => {
    createSecuence()

    const drums = Array(Number(numberDrums))
    drums.fill(0,0)
    setDrums(drums)
  }, [])
  
  useEffect(() => {
    if (secuence.length) showSecuence()
  }, [secuence])

  useEffect(() => {
    // Comparar las dos secuencias
    if (secuenceClick.length) {
      let isCorrect = false
      secuenceClick.forEach((number, index) => {
        isCorrect = number === secuence[index]
      })

      if (!isCorrect) {
        setTimeout(() => {
          setShowError(true)
        }, 500);
      }
  
      if (subsecuence.length === secuenceClick.length && isCorrect) {
        setSecuenceClick([])
        if (round > Number(score)) {
          localStorage.setItem('score', String(round))
          setScore(round)
        }
        setRound(round+1)
        setTimeout(() => {
          setShowNewRound(true)
        }, 500);
      }
    }
  }, [secuenceClick])

  const createSecuence = () => {
    const Secuence = []
    while (Secuence.length < 30) {
      const num = Math.floor(Math.random()*(Number(numberDrums)))
      Secuence.push(num)
    }
    setSecuence(Secuence)
  }

  const handleDrumClick = (id) => {
    const temp = secuenceClick.map(i => i)
    temp.push(id)
    setSecuenceClick(temp)
  }

  const showSecuence = () => {
    const Subsecuence = secuence.slice(0, round)
    setSubsecuence(Subsecuence)
    let index = 0;
    const interval = setInterval(() => {
      setDrumActive(Subsecuence[index])
      setTimeout(() => {
          setDrumActive(999)
        }, 500);
      if (index > Subsecuence.length) {
        clearInterval(interval)
      }
      index += 1
    }, 1000);
  }

  const handleContinue = () => {
    setShowNewRound(false)
    setTimeout(() => {
      showSecuence()
    }, 500)
  }

  const handleNewSecuence = () => {
    setRound(1)
    setSecuenceClick([])
    setShowError(false)
    createSecuence()
  }

  return (
    <section className='game_secuence'>
      <nav>
        <p>Round {round}</p>
        <p>your best score: {score || 1}</p>
        <button
        className='btn_nav'
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

      <>
        {showNewRound && (
          <div className='modal success'>
            <h2 className='success'>¡This is correct!</h2>
            <button className='btn_modal' onClick={handleContinue}>Continue</button>
          </div>
        )}
      </>

      <>
          {showError && (
            <div className='modal error'>
              <h2 className='error'>¡You lose!</h2>
              <button className='btn_modal' onClick={handleNewSecuence}>Try again</button>
            </div>
          )}
      </>
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