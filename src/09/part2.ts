import { match } from 'assert'
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
	console.log(
		`Example Input Solution - Expected: ${expected}, Got: ${result}, ${
			result === expected ? 'PASS' : 'FAIL'
		}`
	)
})

//console.log('Full Input Solution', solve(readFileSync('./input.txt', { encoding: 'utf-8' })))

function solve(input: string): any {
	const lines = input.split('\n')
	const visited = new Set()

	// const getDestination = ([r,c], d, cnt) = {

	// }
	const current = new Array(10)
	for (let ti = 0; ti < current.length; ti++) {
		current[ti] = [0, 0]
	}

	for (let i = 0; i < lines.length; i++) {
		const [d, count] = lines[i].split(' ').map((x, ind) => {
			if (ind === 0) return x
			return parseInt(x)
		}) as [string, number]

		console.log({ d, count })

		for (let c = 0; c < count; c++) {
			if (d === 'U') {
				// console.log(`moving head to [${current[0][0] + 1},${current[0][1]}]`)
				current[0][0] += 1
			}
			if (d === 'L') {
				// console.log(`moving head to [${current[0][0]},${current[0][1] - 1}]`)
				current[0][1] -= 1
			}
			if (d === 'R') {
				// console.log(`moving head to [${current[0][0]},${current[0][1] + 1}]`)
				current[0][1] += 1
			}
			if (d === 'D') {
				// console.log(`moving head to [${current[0][0] - 1},${current[0][1]}]`)
				current[0][0] -= 1
			}
			console.group('--> start iteration over knots <--')
			for (let t = 1; t < current.length; t++) {
				let movedV = false
				let movedH = false

				if (
					Math.abs(current[t - 1][0] - current[t][0]) > 1 &&
					Math.abs(current[t - 1][1] - current[t][1]) > 1
				) {
					current[t] = [
						Math.floor((current[t - 1][0] + current[t][0]) / 2),
						Math.floor((current[t - 1][1] + current[t][1]) / 2),
					]
				}

				if (Math.abs(current[t - 1][0] - current[t][0]) > 1) {
					current[t] = [
						Math.floor((current[t - 1][0] + current[t][0]) / 2),
						current[t][1],
					]
				}

				if (Math.abs(current[t - 1][1] - current[t][1]) > 1) {
					current[t] = [
						current[t][0],
						Math.floor((current[t - 1][1] + current[t][1]) / 2),
					]
				}

				visited.add(`${current[9][0]},${current[9][1]}`)
				if (t === 9) {
					console.log({ pos: current[9], visted: visited.size })
				}
				// console.log({
				// 	d,
				// 	count,
				// 	currentH: current[t - 1],
				// 	current: current[t],
				// 	visitedCount: visited.size,
				// })
			}
			console.log('--> end iteration over knots <--')
			console.groupEnd()
			// console.log(current)
		}
	}

	return visited.size
}
