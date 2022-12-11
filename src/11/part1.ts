import { readFileSync } from 'fs'

const tests: [string, any][] = [[`Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1`, 10605]]

tests.forEach(([testData, expected]) => {
    const result = solve(testData)
    console.log(`Example Input Solution - Expected: ${expected}, Got: ${result}, ${result === expected ? 'PASS' : 'FAIL'}`)
})

console.log('Full Input Solution', solve(readFileSync('./input.txt', { encoding: 'utf-8' })))

type Monkey = {
    id: number
    items: number[]
    calculateWorry: (prev: number) => number
    test: (value: number) => boolean
    passTo: number 
    failTo: number
    seen: number
}



function solve(input: string): any {
    const monkeys: Monkey[] = []

    input.split('\n\n').forEach(m => {

        let id: number,
            items: number[],
            calculateWorry: (value: number) => number,
            test: (value: number) => boolean,
            passTo: number,
            failTo: number 

        m.split('\n').forEach(l => {
            if (l.startsWith('Monkey ')) {
                id = parseInt(l.match(/\d{1,}/)![0])
            }
            if (l.trim().startsWith('Starting items:')) {
                items = l.match(/\d{1,}/g)!.map(x => parseInt(x))
            }
            if (l.trim().startsWith('Test: ')) {
                test = (value: number) => value % parseInt(l.match(/\d{1,}/)![0]) === 0
            }
            if (l.trim().startsWith('Operation:')) {
                let [_, op, num] = l.trim().replace('Operation: new = ', '').split(' ')
                if (op === '+') { 
                    calculateWorry = (old: number) => old + (num === 'old' ? old : parseInt(num))
                } else if (op === '-') { 
                    calculateWorry = (old: number) => old - (num === 'old' ? old : parseInt(num))
                } else if (op === '*') {
                    calculateWorry = (old: number) => old * (num === 'old' ? old : parseInt(num))
                } else { 
                    calculateWorry = (old: number) => old / (num === 'old' ? old : parseInt(num))
                }
            }
            if(l.trim().startsWith('If true: ')){
                passTo = parseInt(l.match(/\d{1,}/)![0])
            }
            if(l.trim().startsWith('If false: ')){
                failTo = parseInt(l.match(/\d{1,}/)![0])
            }
        })

        monkeys.push({
            id: id!,
            items: items!,
            calculateWorry: calculateWorry!,
            test: test!,
            passTo: passTo!,
            failTo: failTo!,
            seen: 0
        })
    })


    const rounds = 20

    const calmDown = (value: number) => Math.floor(value / 3)

    const monkeyTurn = (m: Monkey): void => {
        for(let i = 0; i < m.items.length; i++){
            let newItem = calmDown(m.calculateWorry(m.items[i]))
            monkeys[m.test(newItem) ? m.passTo : m.failTo].items.push(newItem)
            m.seen += 1
        }
        m.items = []
    } 

    for(let r = 0; r < rounds; r++){
        for(let m = 0; m < monkeys.length; m++){
            monkeyTurn(monkeys[m])
        }
    }

    return monkeys.sort((a, b) => b.seen - a.seen).slice(0, 2).reduce((prev, next) => prev * next.seen,1)

}
