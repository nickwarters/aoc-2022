import { readFileSync } from 'fs'

const tests: [string, any][] = [[`Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`, 31]]

tests.forEach(([testData, expected]) => {
    const result = solve(testData)
    console.log(`Example Input Solution - Expected: ${expected}, Got: ${result}, ${result === expected ? 'PASS' : 'FAIL'}`)
})

//console.log('Full Input Solution', solve(readFileSync('./input.txt', { encoding: 'utf-8' })))

function solve(input: string): any {

    const rows = input.split('\n').length
    const cols = input.indexOf('\n')
    const grid = input.trim().replace(/[a-z]/g, c => {
        console.log({c, charCode: c.charCodeAt(0) - 'a'.charCodeAt(0)})
        return `${c.charCodeAt(0) - 'a'.charCodeAt(0)}`}).split('\n').map(l => l.split('').map(x => {
        let num = parseInt(x)
        return isNaN(num) ? x : num
    }))

    return 0
}
