import { readFileSync } from 'fs'
import { readFile } from 'fs/promises'

const testData = `A Y
B X
C Z`

const scores: {
	[key: string]: number
} = {
	A: 1,
	B: 2,
	C: 3,
	X: 0,
	Y: 3,
	Z: 6,
}

const winPoints: { [key: string]: string } = { A: 'B', B: 'C', C: 'A' }
const losePoints: { [key: string]: string } = { A: 'C', B: 'A', C: 'B' }

console.log('Example Input Solution = 12', solution(testData) === 12)
console.log(
	'Full Input Solution',
	solution(readFileSync('./input.txt', { encoding: 'utf-8' }))
)

function solution(str: string): number {
	return str
		.split('\n')
		.map((line) => line.split(' '))
		.reduce((prev: number, [p1, p2]) => {
			let p2Score = scores[p2]
			// Draw
			if (p2 === 'Y') {
				p2Score += scores[p1]
			}
			// Win
			if (p2 === 'Z') {
				p2Score += scores[winPoints[p1]]
			}

			if (p2 === 'X') {
				p2Score += scores[losePoints[p1]]
			}

			return prev + p2Score
		}, 0)
}
