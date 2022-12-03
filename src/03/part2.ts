import { readFileSync } from 'fs'

const tests: [string, any][] = [
    [
        `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`,
        70,
    ],
    [
        `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg`,
        18,
    ],
    [
        `wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`,
        52,
    ],
]
const map = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

tests.forEach(([testData, expected]) => {
    const result = solve(testData)
    console.log(`Example Input Solution - Expected: ${expected}, Got: ${result}, ${result === expected ? 'PASS' : 'FAIL'}`)
})

console.log('Full Input Solution', solve(readFileSync('./input.txt', { encoding: 'utf-8' })))

function isEven(input: number) {
    return input % 2 === 0
}

function solve(input: string) {
    const lines = input.split('\n')

    let score = 0
    for (let i = 2; i < lines.length; i += 3) {
        const line = lines[i]
        const prevLine = lines[i - 1]
        const prevLine2 = lines[i - 2]
        if (!isEven(line.length)) throw new Error('should not happen')

        const item = line.split('').filter(c => prevLine.includes(c) && prevLine2.includes(c))

        score += map.findIndex(val => val === item[0])! + 1
    }

    return score
}
