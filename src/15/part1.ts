import { readFileSync } from 'fs'

const tests: [string, any][] = [[`Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3`, 26]]

tests.forEach(([testData, expected]) => {
    const result = solve(testData)
    console.log(`Example Input Solution - Expected: ${expected}, Got: ${result}, ${result === expected ? 'PASS' : 'FAIL'}`)
})

console.log('Full Input Solution', solve(readFileSync('./input.txt', { encoding: 'utf-8' })))

function solve(input: string): any {
    const sensors = new Set()
    const beacons = new Set()
    const gridBounds = [[0,0], [1999999,0]]

    const notHere = new Set()

    const transforms = [[1, 0], [1, 1], [1, -1], [0, -1], [0, 1], [-1, 0], [-1, -1], [-1, 1]]
    input.split('\n').forEach(line => {
        const [sC, sR, bC, bR] = line.match(/\d{1,}/g)!.map(d => parseInt(d))!
        sensors.add([sR, sC].toString())
        beacons.add([bR, bC].toString())
        gridBounds[0][0] = Math.min(gridBounds[0][0], sR, bR)
        gridBounds[0][1] = Math.min(gridBounds[0][1], sC, bC)
        gridBounds[1][0] = Math.max(gridBounds[1][0], sR, bR)
        gridBounds[1][1] = Math.max(gridBounds[1][1], sC, bC)

        const distance = (Math.max(sR, bR) - Math.min(sR, bR)) + (Math.max(sC, bC) - Math.min(sC, bC))
        let newPos = [sR, bR]
        for(let r = 1; r < distance + 1; r++){
            for(const t of transforms){

            }
            

            if(sensors.has([sR + 1].toString())){}
        }

    })

    const rows = gridBounds[1][0] - gridBounds[0][0]
    const cols = gridBounds[1][1] - gridBounds[0][1]

    return 0 
}
