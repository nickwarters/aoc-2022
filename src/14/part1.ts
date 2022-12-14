import { readFileSync } from 'fs'

const tests: [string, any][] = [[`498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`, 24]]

tests.forEach(([testData, expected]) => {
    const result = solve(testData)
    console.log(`Example Input Solution - Expected: ${expected}, Got: ${result}, ${result === expected ? 'PASS' : 'FAIL'}`)
})

console.log('Full Input Solution', solve(readFileSync('./input.txt', { encoding: 'utf-8' })))

function solve(input: string): any {
    const lines = input.split('\n').map(line => line.split(' -> ').map(cs => cs.split(',').map(c => parseInt(c))))
    const fallenSand = new Set() 

    let dropCount = 0
    let currentSandPos: [number, number] = [500, 0]
    let canMove = true

    const getNextPos = (current: [number, number]) => {

        const transforms = [[0, 1], [-1, 1], [1, 1]]

        let newPos: [number, number] 
        for(const t of transforms){
            newPos = [current[0] + t[0], current[1] + t[1]]

            for(const lineSet of lines){
                for(let l = 1; l < lineSet.length; l++){
                    const s = lineSet[l-1]
                    const e = lineSet[l]

                }
            }

            if(!fallenSand.has(newPos)){return newPos}
        }

        return current 
    }

    let nextPos = currentSandPos
    while(true){
        dropCount++
        currentSandPos = [500, 0]
        nextPos = getNextPos(currentSandPos)
        if(nextPos.toString() === currentSandPos.toString()){
            dropCount-- ;
            break
        }

        if(dropCount > 10000){break}

    }

    return dropCount 
}
