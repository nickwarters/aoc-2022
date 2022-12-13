import { readFileSync } from 'fs'

const tests: [string, any][] = [[`[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`, 13]]

tests.forEach(([testData, expected]) => {
    const result = solve(testData)
    console.log(`Example Input Solution - Expected: ${expected}, Got: ${result}, ${result === expected ? 'PASS' : 'FAIL'}`)
})

console.log('Full Input Solution', solve(readFileSync('./input.txt', { encoding: 'utf-8' })))
type PacketPart = number[] | PacketPart[] | number


function solve(input: string): any {

    const compare = (left: PacketPart, right: PacketPart): number => {

        if(typeof left === 'number' && typeof right === 'number'){
            //console.log('Comparing number -> number', {left, right})
            return left - right 
        } else if(Array.isArray(left) && typeof right === 'number'){
            //console.log('Comparing array -> number', {left, right})
            return compare(left, [right])
        } else if(typeof left === 'number' && Array.isArray(right)){
            //console.log('Comparing number -> array', {left, right})
            return compare([left], right)
        }
        if(Array.isArray(left) && Array.isArray(right)){
            //console.log('Comparing array -> array', {left, right})

            for (let i = 0; i < left.length; i++){

                if(right[i] === undefined) break
                let outcome = compare(left[i], right[i])

                if(outcome) return outcome 
            }

            return left.length - right.length
        }
        return 0 
    }
    
    const packets = input.split('\n\n')
    
    let output = 0

    for(let i = 0; i < packets.length; i++){
        //console.log(packets[i])
        let isCorrect = 0 
        const [left, right] = packets[i].split('\n').map(l => {
            //console.log(l)
            return eval(l)
        })
        //console.log('----')
        //console.log({left, right, packet: packets[i]})
        isCorrect = compare(left, right)
        //console.log({left, right, isCorrect})
        //console.log('----')
        if(isCorrect < 0){output += i + 1}
    }



    return output 
}
