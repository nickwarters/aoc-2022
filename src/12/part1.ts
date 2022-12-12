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

console.log('Full Input Solution', solve(readFileSync('./input.txt', { encoding: 'utf-8' })))

function getHeight(s: string){
    const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz'
    if(s === 'S') return 0 
    if(s === 'E') return lowercaseLetters.indexOf('z')
    return lowercaseLetters.indexOf(s)
}


function solve(input: string): any {

    let start: [number, number] = [0, 0]
    let end: [number, number] = [0, 0]

    const grid = input.trim().split('\n').map(l => l.trim().split(''))
    for(let r = 0; r < grid.length; r++){
        for(let c = 0; c < grid[r].length; c++){
            if(grid[r][c] === 'S') start = [r, c]
            if(grid[r][c] === 'E') end = [r, c]
        }
    }

    const visited = grid.map(row => row.map(_ => 0))
    const queue = [[0, start[0], start[1]].toString()]


    const findNeighbours = (r: number, c: number): [number, number][] => {

        const ns: [number, number][] = []

        let tr: number 
        let tc: number

        const mods = [[1,0], [-1,0], [0, -1], [0, 1]]
        for(let mi = 0; mi < mods.length; mi++){
            tr = r + mods[mi][0]
            tc = c + mods[mi][1]

            //console.log({tr, tc})
            if(!(tr >= 0 && tr < grid.length && tc >= 0 && tc < grid[0].length && !visited[tr][tc])) {
                continue
            }

            if(getHeight(grid[tr][tc]) <= getHeight(grid[r][c]) + 1) {
                ns.push([tr, tc])
            }
        }

        //console.log({ns})
        return ns
    }


    let steps: number
    while(true){
        let next = queue.shift()
        let r: number 
        let c: number 

        //console.log({queue, next, visited})
        if(next !== undefined){
            [steps, r , c] = next.split(',').map(x => parseInt(x)) 
        } else {
            break
        }

        if(visited[r][c]) {
            //console.log(`Already seen ${[r,c].toString()}`)
            continue
        } 

        visited[r][c] = 1

        if(r === end[0] && c === end[1]){
            //console.log(steps)
            break 
        }

        findNeighbours(r, c).forEach(([nr, nc]) => {
            if(!queue.includes([steps + 1, nr, nc].toString())){
                queue.push([steps + 1, nr, nc].toString())
            }
        })
    }

    return steps!
}
