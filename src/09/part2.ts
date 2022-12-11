import { readFileSync } from 'fs'

const tests: [string, any][] = [
	// 	[
	// 		`R 4
	// U 4
	// L 3
	// D 1
	// R 4
	// D 1
	// L 5
	// R 2`,
	// 		1,
	// 	],
	[
		`R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`,
		36,
	],
]

tests.forEach(([testData, expected]) => {
	const result = solve(testData)
	process.stdout.write(
		`Example Input Solution - Expected: ${expected}, Got: ${result}, ${
			result === expected ? 'PASS' : 'FAIL'
		}\n`
	)
})

process.stdout.write(`Full Input Solution: ${solve(readFileSync('./input.txt', { encoding: 'utf-8' }))}\n`)

type S = [number, number]

function solve(input: string): any {
	const lines = input.split('\n')
	const visited = new Set()

	const current: S[] = new Array(10)
	for (let i = 0; i < current.length; i++) {
		current[i] = [0, 0]
	}

    process.stdout.write(`${JSON.stringify(current)}\n`)

    const transforms = {U: [1,0], D: [-1,0], L: [0,-1], R: [0, 1]}

    const shouldMove = (prev: S, next: S): boolean => {
        return Math.abs(prev[0] - next[0]) > 1 || Math.abs(prev[1] - next[1]) > 1
    }

    const moveHead = (head: S, d: 'U'|'D'|'L'|'R'): S => {
        const t = transforms[d]!

        return [head[0] + t[0], head[1] + t[1]]
    }

    const moveKnot = (prev: S, next: S): S => {
        if(!shouldMove(prev, next)) return next 

        if(Math.abs(prev[0] - next[0]) === 2 && Math.abs(prev[1] - next[1]) === 2){
            return [Math.floor((prev[0] + next[0]) / 2),Math.floor((prev[1] + next[1]) / 2)  ]
        }

        if(Math.abs(prev[0] - next[0]) === 2){
                return [Math.floor((prev[0] + next[0]) / 2), prev[1]]
        } 
        if(Math.abs(prev[1] - next[1]) === 2){
            return [prev[0], Math.floor((prev[1] + next[1]) / 2)]
        } 

        return next
    }

	for (let i = 0; i < lines.length; i++) {
        if(lines[i] === '') continue

		const d = lines[i].charAt(0) as keyof typeof transforms
        let count = parseInt(lines[i].split(' ')[1])

        while (count){
           current[0] = moveHead(current[0], d) 

           for(let c = 1; c < current.length; c++){
               current[c] = moveKnot(current[c-1], current[c])

               if(c === 9){

               visited.add(`[${current[c][0]},${current[c][1]}]`)}
           }
           count--
        }
	}
	return visited.size
}


