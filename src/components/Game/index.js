import { useState } from 'react'
import { calculateWinner } from '../../utils/calculateWinner'
import { Board } from '../Board'
import './styles.css'

export function Game() {
    const [history, setHistory] = useState([{ squares: Array(9).fill(null) }])
    const [stepNumber, setStepNumber] = useState(0)
    const [xIsNext, setXIsNext] = useState(true)
  
    function handleClick(i) {
      const newHistory = history.slice(0, stepNumber + 1)
      const current = newHistory[newHistory.length - 1]
      const squares = current.squares.slice()
  
      if (calculateWinner(squares) || squares[i]) return
  
      squares[i] = xIsNext ? "X" : "O"
  
      setHistory(newHistory.concat([{ squares: squares }]))
      setStepNumber(newHistory.length)
      setXIsNext(!xIsNext)
    }
  
    function jumpTo(step) {
      setStepNumber(step)
      setXIsNext(step % 2 === 0)
    }
  
    const current = history[stepNumber]
    const winner = calculateWinner(current.squares)
  
    const moves = history.map((step, move) => {
      const desc = move
        ? "Voltar para a jogada #" + move
        : "Voltar ao início do jogo"
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{desc}</button>
        </li>
      )
    })
  
    let status
    if (winner) {
      status = "Vencedor: " + winner + "!"
    } else {
      status = "Próximo jogador: " + (xIsNext ? "X" : "O")
    }
  
    return (
      <div className='game'>
        <div className='game-board'>
          <Board
            squares={current.squares}
            handleClick={(i) => handleClick(i)}
          />
        </div>
        <div className='game-info'>
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    )
  }