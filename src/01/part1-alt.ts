import { readFileSync } from 'fs'

const tests: [string, any][] = [[`1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`, 24000]]

tests.forEach(([input, expected], i) => {
    const result = solve(input)
    console.log(`Example Input Solution
----
Expected: ${expected}
Got: ${result}
----
Test ${i + 1} ${result === expected ? 'Pass': 'Fail'}`)
})

console.log(`Full Input Solution\n----\n${solve(readFileSync('./input.txt', { encoding: 'utf-8' }))}`)

function solve(input: string): number {
	const lines = input.split('\n')
    
    let retVal = 0
    let groupTotal = 0

    for(const line of lines){
        if(line === ''){
            retVal = Math.max(groupTotal, retVal)
            groupTotal = 0
            continue
        }
        groupTotal += parseInt(line)
    }

    return retVal
}
