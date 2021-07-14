package org.restapi

import io.javalin.Javalin
import io.javalin.apibuilder.ApiBuilder.path
import io.javalin.core.util.RouteOverviewPlugin
import io.javalin.apibuilder.ApiBuilder.*

class GeneralaApi {
    fun start(port: Int = 7000) {
        val generalaSystem = GeneralaSystem()
        val generalaController = GeneralaController()
        val generalaApp = Javalin.create {
            defaultContentType = "application/json"
            enableCorsForAllOrigins()
        }

        generalaApp.before {
            it.header("Access-Control-Expose-Headers", "*")
        }

        generalaApp.routes {
            path("endTurn") {
                post(generalaController::endTurn)
            }
            path("restart") {
                post(generalaController::restart)
            }
            path("reroll") {
                path(":dice2roll") {
                    post(generalaController::reroll)
                }
            }
            /*
            path("update") {
                get(generalaController::update)
            }
            */
        }
    }
}