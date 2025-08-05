
import {useState} from 'react'
import InputNumber from './InputNumber'
import Message from './Message.jsx'
import RestartButton from './RestartButton'

const Game = () => {
    const randomNumber = () => Math.floor(Math.random() * 100) + 1 // Genera un número aleatorio entre 1 y 100

    const [guess, setGuess] = useState('');
    const [secretNumber, setSecretNumber] = useState(randomNumber())
    const [message, setMessage] = useState('');

    const handleGuess = (e) => {
        e.preventDefault()
        const numericGuess = parseInt(guess)

        if (isNaN(numericGuess)) {
            setMessage('Ingresa un número válido.')
            return
        }

        if (numericGuess === secretNumber) {
            setMessage('Correcto 🎊 ')
        }
        else if (numericGuess < secretNumber) {
            setMessage('El número es mayor')
        }
        else {
            setMessage('El número es menor')
        }
    }
    
    const restartGame = () => {
        setSecretNumber(randomNumber())
        setGuess('')
        setMessage('')
    }

    return (
        <div className='container d-flex justify-content-center align-items-center bg-gray-900 text-gray-200 p-20 rounded-xl shadow-lg w-full max-w-lg text-center flex-col border-2 border-violet-500'>
            <h1 className='p-4 font-bold text-2xl'>Adivina el número (1 - 100)</h1>
            <form onSubmit={handleGuess} className='space-y-4'>
                <InputNumber value={guess} onChange={(e) => setGuess(e.target.value)} />
                <button className='w-1/2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition' type="submit">Adivinar</button>
            </form>
            <Message text={message} className='p-4 text-gray-700'/>
            <RestartButton onClick={restartGame} className='mt-4'/>
        </div>
    )
}

export default Game;