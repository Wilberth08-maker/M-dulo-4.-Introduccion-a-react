import { useReducer, useRef, useEffect, useCallback, useState } from "react";

const initialState = { 
    count: 0, 
    history: [],
    pastStates: [], // para guardar estados previos y permitir undo

};

function reducer(state, action) {
    switch (action.type) {
        case "increment": {
            const newCount = state.count + action.payload;
            return {
                count: newCount,
                history: [...state.history, `+${action.payload} (Nuevo valor: ${newCount})`],
                pastStates: [...state.pastStates, { count: state.count, history: state.history }],
            };
        }
        case "decrement": {
            const newCount = state.count - 1;
            return {
                count: newCount,
                history: [...state.history, `-1 (Nuevo valor: ${newCount})`],
                pastStates: [...state.pastStates, { count: state.count, history: state.history }],
            };
        }
        case "reset": 
            return {
                count: 0,
                history: [...state.history, "Contador reiniciado"],
                pastStates: [...state.pastStates, { count: state.count, history: state.history }],
            };
        case "undo": {
            const lastState = state.pastStates[state.pastStates.length - 1];
            if (!lastState) return state; // nada para deshacer

            return {
                count: lastState.count,
                history: lastState.history,
                pastStates: state.pastStates.slice(0, -1),
            };
        }
        case "set": {
            // para setear un estado inicial desde localStorage
            return action.payload;
        }
        case "clearHistory":
            return {
                ...state, // Mantiene el estado actual del contador y otros datos
                history: [], // Borra el historial
                pastStates: [...state.pastStates, { count: state.count, history: state.history }], // Guarda el estado actual antes de borrarlo, por si se quiere deshacer el borrado
        };
        default:
            return state;
    }
}

function CounterGame() {
    // Cargar estado inicial desde localStorage si existe
    const [initialized, setInitialized] = useState(false);
    const [state, dispatch] = useReducer(reducer, initialState);
    const [incrementValue, setIncrementValue] = useState(1);
    const incrementBtnRef = useRef(null);

    // Cargar el estado guardado en localStorage la primera vez que se monta el componente
    useEffect(() => {
        const savedState = localStorage.getItem("counterGameState");
        if (savedState) {
            try {
                const parsed = JSON.parse(savedState);
                dispatch({ type: "set", payload: parsed });
            } catch(error) {
                console(error)
            }
        }
        setInitialized(true);
    }, []);

    // Guardar historial en localStorage cada vez que cambie el estado (y solo después de la carga inicial)
    useEffect(() => {
        if (initialized) {
            localStorage.setItem("counterGameState", JSON.stringify(state));
        }
    }, [state, initialized]);

    useEffect(() => {
        incrementBtnRef.current.focus();
    }, []);

    const handleIncrement = useCallback(() => {
        const num = Number(incrementValue);
        if (isNaN(num)) return;
        dispatch({ type: "increment", payload: num });
    }, [dispatch, incrementValue]);

    const handleDecrement = useCallback(() => {
        dispatch({ type: "decrement" });
    }, [dispatch]);

    const handleReset = useCallback(() => {
        dispatch({ type: "reset" });
    }, [dispatch]);

    const handleUndo = useCallback(() => {
        dispatch({ type: "undo" });
    }, [dispatch]);

    const handleClearHistory = useCallback(() => {
        dispatch({ type: "clearHistory" });
    }, [dispatch]);

    return (
        <div className="flex flex-col items-center justify-center p-8 bg-white text-gray-800 rounded-lg shadow-md max-w-sm mx-auto">
            <h2 className="text-4xl font-extrabold text-blue-600 mb-6">Contador: {state.count}</h2>
            <div className="flex items-center space-x-4 mb-4">
                <label className="text-gray-600 font-medium">
                    Incrementar en:{" "}
                    <input
                        type="number"
                        value={incrementValue}
                        onChange={(e) => setIncrementValue(e.target.value)}
                        className="w-20 p-1 ml-2 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    />
                </label>
            </div>

            <div className="grid grid-cols-2 gap-2 w-full mb-6">
                <button 
                className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-2xl" 
                ref={incrementBtnRef} 
                onClick={handleIncrement}>+</button>
                <button 
                onClick={handleDecrement}
                className="p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-2xl"
                >-</button>
                <button 
                onClick={handleReset}
                className="p-3 col-span-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                >Reset</button>
                <button 
                onClick={handleUndo}
                className="p-3 col-span-2 bg-yellow-400 text-gray-800 rounded-lg hover:bg-yellow-500 transition"
                >Deshacer</button>
                <button 
                onClick={handleClearHistory}
                className="p-3 col-span-2 bg-orange-500 text-gray-800 rounded-lg hover:bg-orange-600 transition"
                >Borrar historial</button>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Historial de cambios:</h3>
            <ul className="w-full text-center list-disc list-inside space-y-1 text-gray-500">
                {state.history.map((entry, index) => (
                    <li key={index} className="text-sm">{entry}</li>
                ))}
            </ul>
        </div>
    );
}

export default CounterGame;
