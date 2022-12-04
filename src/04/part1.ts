import { readFileSync } from 'fs'

const tests: [string, any][] = [[`2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`, 2]]

tests.forEach(([testData, expected]) => {
    const result = solve(testData)
    console.log(`Example Input Solution - Expected: ${expected}, Got: ${result}, ${result === expected ? 'PASS' : 'FAIL'}`)
})

console.log('Full Input Solution', solve(readFileSync('./input.txt', { encoding: 'utf-8' })))

function solve(input: string): any {
    return input.split('\n').reduce((prev, line) => {
        const [s1, e1, s2, e2] = line.match(/(\d{1,})/g) || ['0', '0', '1', '1']
        return prev += ((s1 <= s2 && e1 >= e2 || s2 <= s1 && e2 >= e1)) ? 1 : 0
    }, 0)
}
