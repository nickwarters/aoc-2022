import { readFileSync } from 'fs'

const tests: [string, any][] = [
    [`mjqjpqmgbljsphdztnvjfqwrcgsmlb`, 19],
    ['bvwbjplbgvbhsrlpgdmjqwftvncz', 23],
    ['nppdvjthqldpwncqszvftbrmjlhg', 23],
    ['nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 29],
    ['zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 26],
]

tests.forEach(([testData, expected]) => {
    const result = solve(testData)
    console.log(`Example Input Solution - Expected: ${expected}, Got: ${result}, ${result === expected ? 'PASS' : 'FAIL'}`)
})

console.log('Full Input Solution', solve(readFileSync('./input.txt', { encoding: 'utf-8' })))

function solve(input: string): any {
    const signalLength = 14
    return input.split('').reduce((prev, next, i, arr) => {
        if (prev > -1) {
            return prev
        }
        if (i >= 3) {
            const set = new Set(arr.slice(i - signalLength, i))
            return set.size === signalLength ? i : -1
        }

        return -1
    }, -1)
}
