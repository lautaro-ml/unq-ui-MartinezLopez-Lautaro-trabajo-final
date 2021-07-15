import Generala from "./Generala"

export default function GeneralaSystem() {

    const generala = <Generala/>

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
        if(juego === "Generala") {
            ret = 50
        } else {
            if(juego === "Poker") {
                ret = 40
            } else {
                if(juego === "Full") {
                    ret = 30
                } else {
                    if(juego === "Escalera") {
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
            if(list[i] === x) {
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
        return Generala().dice[0] !== 0 && count(Generala().dice, Generala().dice[0]) === 5
    }

    const checkearPoker = () => {
        return  count(Generala().dice, 1) === 4 ||
                count(Generala().dice, 2) === 4 ||
                count(Generala().dice, 3) === 4 ||
                count(Generala().dice, 4) === 4 ||
                count(Generala().dice, 5) === 4 ||
                count(Generala().dice, 6) === 4
    }

    const checkearFull = () => {
        return (count(Generala().dice, 1) === 3 ||
                count(Generala().dice, 2) === 3 ||
                count(Generala().dice, 3) === 3 ||
                count(Generala().dice, 4) === 3 ||
                count(Generala().dice, 5) === 3 ||
                count(Generala().dice, 6) === 3) &&
                    (count(Generala().dice, 1) === 2 ||
                    count(Generala().dice, 2)  === 2 ||
                    count(Generala().dice, 3)  === 2 ||
                    count(Generala().dice, 4)  === 2 ||
                    count(Generala().dice, 5)  === 2 ||
                    count(Generala().dice, 6)  === 2)
    }

    const checkearEscalera = () => {
        return Generala().dice.includes(2) && Generala().dice.includes(3) && Generala().dice.includes(4) && Generala().dice.includes(5) &&
                (Generala().dice.includes(1) || Generala().dice.includes(6))
    }

    const conseguirDadosMasAltos = () => {
        return count(Generala().dice, max(Generala().dice)) * max(Generala().dice)
    }

}