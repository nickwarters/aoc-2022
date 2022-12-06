import { readFileSync } from 'fs'

const tests: [string, any][] = [
    [`mjqjpqmgbljsphdztnvjfqwrcgsmlb`, 7],
    ['bvwbjplbgvbhsrlpgdmjqwftvncz', 5],
    ['nppdvjthqldpwncqszvftbrmjlhg', 6],
    ['nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 10],
    ['zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 11],
]

tests.forEach(([testData, expected]) => {
    const result = solve(testData)
    console.log(`Example Input Solution - Expected: ${expected}, Got: ${result}, ${result === expected ? 'PASS' : 'FAIL'}`)
})

console.log('Full Input Solution', solve(readFileSync('./input.txt', { encoding: 'utf-8' })))

function solve(input: string): any {
    const signalLength = 4
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
