import sun.security.ec.point.ProjectivePoint
import kotlin.random

class GeneralaSystem() {
    val dice   = MutableList<Int>()
    val points = 0
    val turn   = 0
    val juegos = MutableList<String>()

    fun restart() {
        points = 0
        turn = 0
        juegos = MutableList<String>()
    }

    fun rollAllDice() {
        for i in dice {
            roll(dice.get(i))
        }
    }

    fun rollDice(MutableList<Int> : dice2roll) {
        for i in dice2roll {
            roll(dice.get(i))
        }
    }

    fun roll(Int i) {
        dice.remove(i)
        dice.add(i, Random.nextInt(1,6))
    }

    fun checkearJuego() {
        var Pair<String, Int> ret = ("", 0)
        if checkearGenerala() {
            ret ("Generala", 50)
        } else {
            if checkearPoker() {
                ret = ("Poker", 40)
            } else {
                if checkearFull() {
                    ret = ("Full", 30)
                } else {
                    if checkearEscalera() {
                        ret = ("Escalera", 20)
                    } else {
                        ret = ("Mayor", conseguirMayor())
                        }
    }

    fun checkearGenerala() {
        return dice.all(isEqual(dice.get(0)))
    }

    fun checkearPoker() {
        return  dice.count(isEqual(1)) == 4 ||
                dice.count(isEqual(2)) == 4 ||
                dice.count(isEqual(3)) == 4 ||
                dice.count(isEqual(4)) == 4 ||
                dice.count(isEqual(5)) == 4 ||
                dice.count(isEqual(6)) == 4
    }

    fun checkearFull() {
        return (dice.count(isEqual(1)) == 3 ||
                dice.count(isEqual(2)) == 3 ||
                dice.count(isEqual(3)) == 3 ||
                dice.count(isEqual(4)) == 3 ||
                dice.count(isEqual(5)) == 3 ||
                dice.count(isEqual(6)) == 3) &&
                (dice.count(isEqual(1)) == 2 ||
                dice.count(isEqual(2))  == 2 ||
                dice.count(isEqual(3))  == 2 ||
                dice.count(isEqual(4))  == 2 ||
                dice.count(isEqual(5))  == 2 ||
                dice.count(isEqual(6))  == 2)
    }

    fun checkearEscalera() {
        return dice.contains(2) && dice.contains(3) && dice.contains(4) && dice.contains(5) &&
                (dice.contains(1) || dice.contains(6))
    }

    fun conseguirMayor() {
        return dice.count(dice.max()) * dice.max()
    }
    fun endTurn() {
        turn += 1
        val Pair<String, Int> juego = checkearJuego()
        juegos.add(juego.first)
        points += juego.second
    }
}