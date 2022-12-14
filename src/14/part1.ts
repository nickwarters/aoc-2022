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
    const blocked = new Set()
    const fallenSand = new Set() 

    let dropCount = 0
    let currentSandPos: [number, number] = [500, 0]

    let floor = 0 
    for(const lineSet of lines){
        for(let l = 1; l < lineSet.length; l++){
            const start = [Math.min(lineSet[l-1][0], lineSet[l][0]), Math.min(lineSet[l-1][1], lineSet[l][1])]
            const end = [Math.max(lineSet[l-1][0], lineSet[l][0]), Math.max(lineSet[l-1][1], lineSet[l][1])]
            //console.log({start, end, line: [lineSet[l-1], lineSet[l]]})
            for(let c = start[0]; c < end[0] + 1; c++){
                for(let r = start[1]; r < end[1] + 1; r++){
                    blocked.add(`${c},${r}`)
                    floor = Math.max(floor, r + 1)
                }
            }

        }
    }
    //console.log(blocked)

    mainLoop:
    while(true){
        let sand = [500,0]
        while(true){
            //console.log({sand, floor, blocked: blocked.has(`${sand[0]},${sand[1]}`), dropCount})
            if(sand[1] >= floor){
                break mainLoop 
            }
            if(!blocked.has(`${sand[0]},${sand[1] + 1}`)){
                sand = [sand[0], sand[1] + 1]
                continue 
            }
            if(!blocked.has(`${sand[0] - 1},${sand[1] + 1}`)){
                sand = [sand[0] - 1, sand[1] + 1]
                continue 
            }
            if(!blocked.has(`${sand[0] + 1},${sand[1] + 1}`)){
                sand = [sand[0] + 1, sand[1] + 1]
                continue 
            }
            blocked.add(`${sand[0]},${sand[1]}`)
            dropCount++;
            break 
        }
    }

    return dropCount 
}
