const RestartButton = ({ onClick }) => {
    return (
        <button onClick={onClick} className='w-1/2 bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition mt-4'>
            Reiniciar juego 🔄
        </button>
    )
}

export default RestartButton