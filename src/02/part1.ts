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
	X: 1,
	Y: 2,
	Z: 3,
}

console.log('Example Input Solution = 15', solution(testData) === 15)
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
			if (
				(p1 === 'A' && p2 === 'X') ||
				(p1 === 'B' && p2 === 'Y') ||
				(p1 === 'C' && p2 === 'Z')
			) {
				p2Score += 3
			}
			// Win
			if (
				(p1 === 'A' && p2 === 'Y') ||
				(p1 === 'B' && p2 === 'Z') ||
				(p1 === 'C' && p2 === 'X')
			) {
				p2Score += 6
			}

			return prev + p2Score
		}, 0)
}
