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

    return (
        <div>
            <h2>Contador: {state.count}</h2>
            <div>
                <label>
                    Incrementar en:{" "}
                    <input
                        type="number"
                        value={incrementValue}
                        onChange={(e) => setIncrementValue(e.target.value)}
                        style={{ width: "60px" }}
                    />
                </label>
            </div>
            <button ref={incrementBtnRef} onClick={handleIncrement}>+</button>
            <button onClick={handleDecrement}>-</button>
            <button onClick={handleReset}>Reset</button>
            <button onClick={handleUndo}>Deshacer</button>

            <h3>Historial de cambios:</h3>
            <ul>
                {state.history.map((entry, index) => (
                    <li key={index}>{entry}</li>
                ))}
            </ul>
        </div>
    );
}

export default CounterGame;
