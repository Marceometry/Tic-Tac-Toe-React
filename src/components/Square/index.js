import './styles.css'

export function Square({ value, handleClick }) {
    return (
      <button className='square' onClick={handleClick}>
        {value}
      </button>
    )
  }