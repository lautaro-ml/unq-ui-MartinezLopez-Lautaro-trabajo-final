package org.restapi

import io.javalin.http.Context
import io.javalin.http.UnauthorizedResponse

class GeneralaController(val generalaSystem: GeneralaSystem){


    fun endTurn(ctx : Context) {
        generalaSystem.endTurn()
        //update()
    }

    fun restart(ctx : Context) {
        generalaSystem.restart()
        //update()
    }

    fun reroll(ctx : Context) {
        val MutableList<Int> dice2roll = ctx.pathParam("dice2roll").split(",")
        generalaSystem.rollDice(dice2roll)
        //update()
    }
    /*
    fun update(ctx : Context) {

    }
    */
}