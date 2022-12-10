import { readFileSync } from 'fs'

const tests: [string, any][] = [[`addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`, 13140]]

tests.forEach(([testData, expected]) => {
    const result = solve(testData)
    console.log(`Example Input Solution - Expected: ${expected}, Got: ${result}, ${result === expected ? 'PASS' : 'FAIL'}`)
})

console.log('Full Input Solution', solve(readFileSync('./input.txt', { encoding: 'utf-8' })))

function solve(input: string): any {

    const sampleCycles = new Set([20, 60, 100, 140, 180, 220])
    let signalStrength = 0 
    let registerValue = 1 
    let currentCycle = 0 
    let shouldSample = false
    let samplePrev = false
    let inc = 1 
    let v = 0 
    input.split('\n').forEach(line => {
        if(line === '') return
        currentCycle += inc 
        const cycleStart = registerValue 
        shouldSample = sampleCycles.has(currentCycle)
        samplePrev = line !== 'noop' && sampleCycles.has(currentCycle)

        if(line !== 'noop'){
            v = parseInt(line.split(' ')[1])
            registerValue += v
            currentCycle += inc 
            shouldSample = sampleCycles.has(currentCycle)
        }
        if(shouldSample && !samplePrev){
            signalStrength += cycleStart * currentCycle
        }
        if(samplePrev){
            signalStrength += cycleStart * (currentCycle - 1) 
        }
        
         //console.log({currentCycle, v, cycleStart, signalStrength,  registerValue, shouldSample, samplePrev})
    })

    return signalStrength
}
