import database from './../database.json' assert {type: "json"}
import Person from "./person.js";
import TerminalController from "./terminalController.js";
import {save} from "./repository.js";

const DEFAULT_LANG = 'pt-BR'
const STOP_TERM = ':q'

const terminalController = new TerminalController()
terminalController.initializeTerminal(database, DEFAULT_LANG)

async function mainLoop () {
    try {
        const answer = await terminalController.question('Bom dia?')
        console.log('answer', answer)
        if (answer === STOP_TERM) {
            terminalController.closeTerminal()
            console.log('process exited')
            return
        }
        const person = Person.generateInstanceFromString(answer)
        // format =  2 bike,aviao,navio 50000 2019-01-02 2020-03-02
        // console.log('person', person.formatted(DEFAULT_LANG))
        terminalController.updateTable(person.formatted(DEFAULT_LANG))
        save(person)
        return mainLoop()
    } catch (e) {
        console.log(e)
    }
}
await mainLoop()


