import * as mocha from "mocha";
const {describe, it } = mocha
import chai from 'chai'
const {expect} = chai

import Person from "../src/person.js";

describe('Person', () => {
    it('should return a person instance from a string', () => {
        const person = Person.generateInstanceFromString(
            "2 bike,aviao,navio 50000 2019-01-02 2020-03-02"
        )
        const expected = {
            id: "2",
            vehicles: ["bike","aviao","navio"],
            kmTraveled: "50000",
            from: "2019-01-02",
            to: "2020-03-02"
        }
        expect(person).to.be.deep.equal(expected)
    })

    it('should format values', () => {
        const person = new Person({
            id: "2",
            vehicles: ["bike","aviao","navio"],
            kmTraveled: "50000",
            from: "2019-01-02",
            to: "2020-03-02"
        })
        const result = person.formatted('pt-BR')
        const expected = {
            id: 2,
            vehicles: 'bike, aviao e navio',
            kmTraveled: '50.000 km',
            from: '02 de janeiro de 2019',
            to: '02 de janeiro de 2019'
        }
        expect(result).to.be.deep.equal(expected)
    })
})

