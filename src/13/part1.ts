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

    const compare = (left: PacketPart, right: PacketPart): boolean => {

        if(typeof left === 'number' && typeof right === 'number'){
            //console.log('Comparing number -> number', {left, right})
            return left < right 
        }

        if(Array.isArray(left) && typeof right === 'number'){
            //console.log('Comparing array -> number', {left, right})
            return compare(left, [right])
        }

        if(typeof left === 'number' && Array.isArray(right)){
            //console.log('Comparing number -> array', {left, right})
            return compare([left], right)
        }

        let output = false 
        let shouldReturnFalse = false 
        if(Array.isArray(left) && Array.isArray(right)){
            //console.log('Comparing array -> array', {left, right})
            let l: PacketPart
            let r: PacketPart 

            while(left.length > 0 && right.length > 0 && !output && !shouldReturnFalse){
                l = left.shift()!
                r = right.shift()!
                //console.log({l, r})

                if(typeof l === 'number' && typeof r === 'number'){
                    shouldReturnFalse = l > r 
                }
                output = compare(l, r)
                //console.log({output, shouldReturnFalse})
            }

            if(shouldReturnFalse){
                return false 
            }
            
            output = output || !left.length && right.length !== 0 
            //console.log({leftLength: left.length, leftEmpty: left.length === 0, rightLength: right.length, rightNotEmpty: right.length > 0, output})
        }

        return output 
    }
    
    const packets = input.split('\n\n')
    
    let output = 0

    const finalLine = JSON.parse('[[8,[4,[5,1,5]],5,5,9],[],[[4,4,[]]]]')
    
    for(let i = 0; i < packets.length; i++){
        //console.log(packets[i])
        let isCorrect = false 
        const [left, right] = packets[i].split('\n').map(l => {
            //console.log(l)
            return eval(l)
        })
        //console.log('----')
        //console.log({left, right, packet: packets[i]})
        isCorrect = compare(left, right)
        //console.log({left, right, isCorrect})
        //console.log('----')
        if(isCorrect){output += i + 1}
    }



    return output 
}
