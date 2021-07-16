import { React, useState, useEffect } from 'react'
import { Simulate } from 'react-dom/test-utils'
import Dice from './Dice'
import {checkearJuego, juegoAPuntos} from './GeneralaSystem.js'

export default function Generala() {
    //TODO Lograr hacer andar refactor

    const[dices, setDice]                    = useState([0,0,0,0,0])
    const[points, setPoints]                 = useState(0)
    const[turn, setTurn]                     = useState(0)
    const[jugadas, setJugadas]               = useState([])
    const[dice2roll, setDice2roll]           = useState([])
    const[cantidadReroll, setCantidadReroll] = useState(3)
    const[mostrarError, setMostrarError]     = useState(false)
    const[mensajeDeError, setMensajeDeError] = useState("")


    useEffect(() => {
        rollAllDice()
    },[])

    const getRandomArbitrary = (min,max) => {
        return Math.floor(Math.random() * (max - min) + min);
    }

    const rollDice = () => {
        if(cantidadReroll > 0 && dice2roll.length >= 1) {
            setDice(prevState => prevState.map((i,index) => (dice2roll.includes(index) ? getRandomArbitrary(1,6) : i)))
            setDice2roll([])
            setCantidadReroll(prevState => prevState - 1)
        } else {
            if(cantidadReroll <= 0) {
                setMensajeDeError(() => "Ya tiraste 3 veces, no podes volver a tirar!")
            } else {
                setMensajeDeError(() => "Debe seleccionar al menos un dado")
            }
            setMostrarError(true)
        }
    }

    const rollAllDice = () => {
        setDice(prevState => prevState.map(() => getRandomArbitrary(1,6)))
    }

    const restart = () => {
        setPoints(0)
        setTurn(0)
        setJugadas([])
        setCantidadReroll(() => 3)
        rollAllDice()
    }

    const endTurn = () => {
        setTurn(prevState => prevState + 1)
        var juego = checkearJuego(dices, jugadas)
        var puntos = juegoAPuntos(juego, dices)
        if(juego !== "Jugada Repetida") {
            setJugadas(prevState => (prevState.length === 0 ? [juego] : [...prevState, ", " + juego]))
            setPoints(prevState => prevState + puntos)
        } else {
            setMensajeDeError("no podes marcar dos veces la misma jugada")
            setMostrarError(true)
        }
        setCantidadReroll(() => 3)
        rollAllDice()
    }

    const add2roll = id => {
        setDice2roll(prevState => (prevState.includes(id)) ? [...prevState].filter(item => item !== id) : [...prevState, id])
    }

    return (
        <>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossOrigin="anonymous"></script>
        <div className="Background">
                <div>
                    <div className="Buttons">
                        <button type="button" className="btn btn-danger" onClick={restart}>Partida Nueva</button>
                    </div>
                    <p className="Text">Turno: {turn}</p>
                    <p className="Text">Puntos: {points}</p>
                    <p className="Text">Tiradas: {cantidadReroll}</p>
                    <p className="Text">Jugadas: {jugadas}</p>
                </div>
                <div className="DiceHolder">
                    <span className="Dice">
                        <button type="button" className="btn btn-light position-relative" onClick={() => add2roll(0)}>
                            <Dice value={dices[0]}/>
                            <span className={dice2roll.includes(0) ? "position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-succes rounded-circle" : "visually-hidden"}/>
                        </button>
                    </span>
                    <span className="Dice">
                        <button type="button" className="btn btn-light position-relative" onClick={() => add2roll(1)}>
                            <Dice value={dices[1]}/>
                            <span className={dice2roll.includes(1) ? "position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-succes rounded-circle" : "visually-hidden"}/>
                        </button>
                    </span>
                    <span className="Dice">
                        <button type="button" className="btn btn-light position-relative" onClick={() => add2roll(2)}>
                            <Dice value={dices[2]}/>
                            <span className={dice2roll.includes(2) ? "position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-succes rounded-circle" : "visually-hidden"}/>
                        </button>
                    </span>
                    <span className="Dice">
                        <button type="button" className="btn btn-light position-relative" onClick={() => add2roll(3)}>
                            <Dice value={dices[3]}/>
                            <span className={dice2roll.includes(3) ? "position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-succes rounded-circle" : "visually-hidden"}/>
                        </button>
                    </span>
                    <span className="Dice">
                        <button type="button" className="btn btn-light position-relative" onClick={() => add2roll(4)}>
                            <Dice value={dices[4]}/>
                            <span className={dice2roll.includes(4) ? "position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-succes rounded-circle" : "visually-hidden"}/>
                        </button>
                    </span>
                </div>
                <span className="Buttons">
                    <button type="button" className="btn btn-warning" onClick={rollDice}>Volver a tirar</button>
                </span>
                <span className="Buttons">
                    <button type="button" className="btn btn-success" onClick={endTurn}>Quedarse</button>
                </span>
                <div>
                    {
                        mostrarError ?
                        <div className="alert alert-warning" role="alert">
                            {mensajeDeError}
                            <button type="button" className="btn-close" aria-label="Close" onClick={() => setMostrarError(false)}/>
                        </div> :
                        <div/>                    
                    }
                </div>
            </div>
        </>
    )
}