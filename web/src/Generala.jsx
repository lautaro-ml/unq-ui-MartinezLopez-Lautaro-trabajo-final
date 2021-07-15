import { React, useState, useEffect, useContext } from 'react'
import Dice from './Dice'

export default function Generala() {
    const[dice, setDice] = useState([0,0,0,0,0])
    const[points, setPoints] = useState(0)
    const[turn, setTurn] = useState(0)
    const[jugadas, setJugadas] = useState([])
    const[dice2roll, setDice2roll] = useState([])

    const getRandomArbitrary = (min,max) => {
        return Math.floor(Math.random() * (max - min) + min);
    }

    const rollDice = () => {
        setDice(prevState => prevState.map((i,index) => (dice2roll.includes(index) ? getRandomArbitrary(1,6) : i)))
        setDice2roll([])
    }

    const rollAllDice = () => {
        setDice2roll(prevState => [...prevState,[0,1,2,3,4]])
        rollDice()
    }

    //useEffect(() => {rollAllDice()})

    const restart = () => {
        setPoints(0)
        setTurn(0)
        setJugadas([])
        rollAllDice()
    }

    const checkearJuego = () => {
        var ret = ""
        if(checkearGenerala()) {
            ret = "Generala"
        } else {
            if(checkearPoker()) {
                ret = "Poker"
            } else {
                if(checkearFull()) {
                    ret = "Full"
                } else {
                    if(checkearEscalera()) {
                        ret = "Escalera"
                    } else {
                        ret = "Dados"
                    }
                }
            }
        }
        return ret
    }

    const juegoAPuntos = juego => {
        var ret = 0
        if(juego == "Generala") {
            ret = 50
        } else {
            if(juego == "Poker") {
                ret = 40
            } else {
                if(juego == "Full") {
                    ret = 30
                } else {
                    if(juego == "Escalera") {
                        ret = 20
                    } else {
                        ret = conseguirDadosMasAltos()
                    }
                }
            }
        }
        return ret
    }

    const count = (list,x) => {
        var count = 0;
        for(var i = 0; i < list.length; ++i) {
            if(list[i] == x) {
                count++;
            }
        }
        return count
    }

    const max = (list) => {
        var ret = 0
        for(var i = 0; i < list.length; ++i) {
            if(list[i] > ret) {
                ret = list[i]
            }
        }
        return ret
    }

    const checkearGenerala = () => {
        return count(dice, dice[0]) === 5
    }

    const checkearPoker = () => {
        return  count(dice, 1) === 4 ||
                count(dice, 2) === 4 ||
                count(dice, 3) === 4 ||
                count(dice, 4) === 4 ||
                count(dice, 5) === 4 ||
                count(dice, 6) === 4
    }

    const checkearFull = () => {
        return (count(dice, 1) === 3 ||
                count(dice, 2) === 3 ||
                count(dice, 3) === 3 ||
                count(dice, 4) === 3 ||
                count(dice, 5) === 3 ||
                count(dice, 6) === 3) &&
                    (count(dice, 1) === 2 ||
                    count(dice, 2)  === 2 ||
                    count(dice, 3)  === 2 ||
                    count(dice, 4)  === 2 ||
                    count(dice, 5)  === 2 ||
                    count(dice, 6)  === 2)
    }

    const checkearEscalera = () => {
        return dice.includes(2) && dice.includes(3) && dice.includes(4) && dice.includes(5) &&
                (dice.includes(1) || dice.includes(6))
    }

    const conseguirDadosMasAltos = () => {
        return count(dice, max(dice)) * max(dice)
    }

    const endTurn = () => {
        setTurn(prevState => prevState + 1)
        var juego = checkearJuego()
        var puntos = juegoAPuntos(juego)
        setJugadas(prevState => ([...prevState, juego]))
        setPoints(prevState => prevState + puntos)
        rollAllDice()
    }

    const add2roll = id => {
        setDice2roll(prevState => (prevState.includes(id)) ? [...prevState] : [...prevState, id])
    }

    return (
        <>
            <div>
                <div>
                    <p>Turno: {turn}</p>
                    <p>Puntos: {points}</p>
                    <p>Jugadas: {toString(jugadas)}</p>
                </div>
                <div>
                    <button onClick={() => add2roll(0)}><Dice value={dice[0]}/></button>
                    <button onClick={() => add2roll(1)}><Dice value={dice[1]}/></button>
                    <button onClick={() => add2roll(2)}><Dice value={dice[2]}/></button>
                    <button onClick={() => add2roll(3)}><Dice value={dice[3]}/></button>
                    <button onClick={() => add2roll(4)}><Dice value={dice[4]}/></button>
                </div>
                <button onClick={rollDice}>Volver a tirar</button>
                <button onClick={endTurn}>Quedarse</button>
                <button onClick={restart}>Partida Nueva</button>
            </div>
        </>
    )
}