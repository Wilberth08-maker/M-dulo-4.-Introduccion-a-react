const InputNumber = ({value, onChange}) => {
    return (
        <div className="container d-flex justify-content-center align-items-center vh-100  text-gray-200">
        
        <input 
            type="number" 
            name="guess"
            className="w-3/4 p-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-500 transition-colors duration-200 ease-in-out focus:outline-none focus:border-2 focus:border-fuchsia-500"
            placeholder="Adivina el número..." 
            value={value}
            onChange={onChange}
            min="1"
            max="100"
            />
        </div>
        
    )
}

export default InputNumber