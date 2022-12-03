import { readFileSync } from 'fs'

const tests: [string, any][] = [
    [
        `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`,
        157,
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

function solve(input: string): any {
    return input
        .split('\n')
        .map(line => {
            if (!isEven(line.length)) throw new Error('should not happen')

            const first = line.substring(0, line.length / 2)
            const last = line.substring(line.length / 2)
            let item: string = ''
            let i = 0
            while (i < first.length && !item) {
                if (last.includes(first.charAt(i))) {
                    item = first.charAt(i)
                }
                i++
            }

            return { item, score: map.findIndex(val => val === item)! + 1 }
        })
        .reduce((prev, next) => {
            return (prev += next.score)
        }, 0)
}
