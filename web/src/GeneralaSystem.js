
//public
export const checkearJuego = (dices, jugadas) => {
    var ret = "";
    if(checkearGenerala(dices) && !jugadas.includes("Generala")) 
        ret = "Generala";
    else if(checkearPoker(dices) && !jugadas.includes("Poker")) 
        ret = "Poker";
    else if(checkearFull(dices) && !jugadas.includes("Full")) 
        ret = "Full";
    else if(checkearEscalera(dices) && !jugadas.includes("Escalera")) 
        ret = "Escalera";
    else if(!jugadas.includes("Numero " + max(dices)))
        ret = "Numero " + max(dices);
    else
        ret = "Jugada Repetida"
    
    return ret;
}

//public
export const juegoAPuntos = (juego, dices) => {
    var points = {
        "Generala": 50,
        "Poker":    40,
        "Full":     30,
        "Escalera": 20,
        "default":  conseguirDadosMasAltos(dices)
    };
    return points[juego];
}

//private
const count = (list,x) => {
    var count = 0;
    for(var i = 0; i < list.length; ++i) {
        if(list[i] === x) {
            count++;
        }
    }
    return count;
}

//private
const max = (list) => {
    var ret = 0;
    for(var i = 0; i < list.length; ++i) {
        if(list[i] > ret) {
            ret = list[i];
        }
    }
    return ret;
}

//private
const checkearGenerala = dices => {
    return dices[0] !== 0 && count(dices, dices[0]) === 5;
}

//private
const checkearPoker = dices => {
    return  count(dices, 1) === 4 ||
            count(dices, 2) === 4 ||
            count(dices, 3) === 4 ||
            count(dices, 4) === 4 ||
            count(dices, 5) === 4 ||
            count(dices, 6) === 4;
}

//private
const checkearFull = dices => {
    return (count(dices, 1) === 3 ||
            count(dices, 2) === 3 ||
            count(dices, 3) === 3 ||
            count(dices, 4) === 3 ||
            count(dices, 5) === 3 ||
            count(dices, 6) === 3) &&
            (count(dices, 1) === 2 ||
            count(dices, 2)  === 2 ||
            count(dices, 3)  === 2 ||
            count(dices, 4)  === 2 ||
            count(dices, 5)  === 2 ||
            count(dices, 6)  === 2);    
}

//private
const checkearEscalera = dices => {
    return  dices.includes(2) && dices.includes(3) && dices.includes(4) && dices.includes(5) &&
            (dices.includes(1) || dices.includes(6));
}

//private
const conseguirDadosMasAltos = dices => {
    return count(dices, max(dices)) * max(dices);
}