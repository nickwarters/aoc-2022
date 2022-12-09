import { readFileSync } from 'fs'

const tests: [string, any][] = [[`R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`, 1], [`R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`, 36]]

tests.forEach(([testData, expected]) => {
    const result = solve(testData)
    console.log(`Example Input Solution - Expected: ${expected}, Got: ${result}, ${result === expected ? 'PASS' : 'FAIL'}`)
})

console.log('Full Input Solution', solve(readFileSync('./input.txt', { encoding: 'utf-8' })))

function solve(input: string): any {
    const lines = input.split('\n')
    const visited = new Set()

    const currentH = [0,0]
    const currentT = [0, 0]
    for (let i = 0; i < lines.length; i++){
        const [d, count] = lines[i].split(' ').map((x, i) => {if(i === 0) return x ;return parseInt(x)}) as [string, number]
        for (let c = 0; c < count ; c++){
            if(d === 'U'){
                currentH[0] += 1
            }
            if(d === 'L'){
                currentH[1] -= 1 
            }
            if(d === 'R'){
                currentH[1] += 1 
            }
            if(d === 'D'){
                currentH[0] -=1
            }

            let movedV = false 
            let movedH = false 
            if(Math.abs(currentH[0] - currentT[0]) > 1){
                if(d === 'U'){
                    currentT[0] += 1
                    movedV = true 
                }
                if(d === 'D'){
                    currentT[0] -= 1
                    movedV = true 
                }

                if(movedV && currentT[1] !== currentH[1]){
                    currentT[1] = currentH[1]
                }
            }
            if(Math.abs(currentH[1] - currentT[1]) > 1){
                if(d === 'R'){
                    currentT[1] += 1
                    movedH = true 
                }
                if(d === 'L'){
                    currentT[1] -= 1
                    movedH = true 
                }

                if(movedH && currentT[0] !== currentH[0]){
                    currentT[0] = currentH[0]
                }
            }

            visited.add(`${currentT[0]},${currentT[1]}`)
            console.log({d, count, currentH, currentT, visitedCount: visited.size})

        }


    }

    return visited.size
}
