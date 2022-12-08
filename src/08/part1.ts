import { readFileSync } from 'fs'

const tests: [string, any][] = [
    [
        `30373
25512
65332
33549
35390`,
        21,
    ],
]

tests.forEach(([testData, expected]) => {
    const result = solve(testData)
    console.log(`Example Input Solution - Expected: ${expected}, Got: ${result}, ${result === expected ? 'PASS' : 'FAIL'}`)
})

console.log('Full Input Solution', solve(readFileSync('./input.txt', { encoding: 'utf-8' })))

function solve(input: string): any {
    const lineLength = input.split('\n')[0].length
    const trees = input
        .replace(/\n|\r/, '')
        .trim()
        .split('')
        .filter(x => !isNaN(parseInt(x)))
        .map(x => parseInt(x))

    const getRow = (ind: number) => Math.floor(ind / lineLength)
    const getCol = (ind: number) => ind - getRow(ind) * lineLength

    let tInd = 0
    let tree: number
    let c = 0,
        r = 0

    let count: number = 0
    let visibleTop = false,
        visibleBottom = false,
        visibleLeft = false,
        visibleRight = false

    for (; tInd < trees.length; tInd++) {
        tree = trees[tInd]
        r = getRow(tInd)
        c = getCol(tInd)

        const compL = trees.filter((_, i) => getRow(i) === r && getCol(i) < c)
        const compR = trees.filter((_, i) => getRow(i) === r && getCol(i) > c)
        const compT = trees.filter((_, i) => getRow(i) < r && getCol(i) === c)
        const compB = trees.filter((_, i) => getRow(i) > r && getCol(i) === c)

        visibleLeft = compL.every(x => x < tree)
        visibleRight = compR.every(x => x < tree)
        visibleTop = compT.every(x => x < tree)
        visibleBottom = compB.every(x => x < tree)

        // console.log({ ind: [r, c], tree, visibleTop, visibleRight, visibleBottom, visibleLeft, compL, compT, compB, compR })

        if (visibleTop || visibleLeft || visibleBottom || visibleRight) {
            count += 1
        }
    }

    return count
}
