import { readFile } from 'fs/promises'

readFile('./input.txt', { encoding: 'utf-8' }).then((data) =>
	console.log(solution(data))
)

function solution(data: string) {
	const reindeers = data
		.split('\n\n')
		.map((r) => r.split('\n').map((c) => parseInt(c)))
		.map((r) => {
			const sum = r.reduce((cals, c) => (cals += c), 0)
			return sum
		})
		.sort((a, b) => b - a)

	let total: number = 0

	for (let i = 0; i < 3; i++) {
		total += reindeers[i]
	}

	return total
}
