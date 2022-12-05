import { readFileSync } from 'fs'

function solve(input: string): any {
    const lines = input.split('\n')

    const firstInstructionLine = lines.findIndex(x => x.startsWith('move'))
    const stackCount = parseInt(lines[firstInstructionLine - 2].match(/\d/g)!.sort((a,b) => parseInt(b) - parseInt(a))[0])
    
    const stacks = new Array(stackCount)

    let stackIndex = 0
    for (let r = 0; r < firstInstructionLine - 2; r++){
        stackIndex = 0
        let stack = new Array()
        let item: string[]|null
        for (let c = 2; c < lines[r].length; c+=4){
            
            item = lines[r].substring(c-2, c).match(/([A-Z])/g)
            if(item){
                if(!stacks[stackIndex]){stacks[stackIndex] = new Array()}
                stacks[stackIndex].unshift(item)
            }
            stackIndex++
        }
    }

    const instructions = lines.slice(firstInstructionLine)

    for(let i = 0; i < instructions.length; i++){
        const [c, f, t] = instructions[i].match(/\d/g)!

        let count = parseInt(c)
        const from = parseInt(f)
        const to = parseInt(t)
        while(count > 0){
            count--;
            if(stacks[from -1].length){
                stacks[to - 1].push(stacks[from - 1].pop())
            }
        }
    }

    const res =  stacks.reduce((prev, next) => {return  prev += next.pop()}, '')

    console.log(res)
    return res 
}

const tests: [string, any][] = [[`    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`, 'CMZ']]

tests.forEach(([testData, expected]) => {
    const result = solve(testData)
    console.log(`Example Input Solution - Expected: ${expected}, Got: ${result}, ${result === expected ? 'PASS' : 'FAIL'}`)
})

console.log('Full Input Solution', solve(readFileSync('./input.txt', { encoding: 'utf-8' })))

