import { readFileSync } from 'fs'

const tests: [string, any][] = [
	[
		`30373
25512
65332
33549
35390`,
		8,
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

console.log(
	'Full Input Solution',
	solve(readFileSync('./input.txt', { encoding: 'utf-8' }))
)

function solve(input: string): any {
	const lineLength = input.split('\n')[0].length
	const trees = input
		.replace(/\n|\r/, '')
		.trim()
		.split('')
		.filter((x) => !isNaN(parseInt(x)))
		.map((x) => parseInt(x))

	const getRow = (ind: number) => Math.floor(ind / lineLength)
	const getCol = (ind: number) => ind - getRow(ind) * lineLength

	let tInd = 0
	let tree: number
	let c = 0,
		r = 0

	let topScore: number = 0
	let visibleTop = false,
		visibleBottom = false,
		visibleLeft = false,
		visibleRight = false

	for (; tInd < trees.length; tInd++) {
		tree = trees[tInd]
		r = getRow(tInd)
		c = getCol(tInd)

		const compL = trees.filter((_, i) => getRow(i) === r && getCol(i) < c)
		const compR = trees.filter((_, i) => getRow(i) === r && getCol(i) > c)
		const compT = trees.filter((_, i) => getRow(i) < r && getCol(i) === c)
		const compB = trees.filter((_, i) => getRow(i) > r && getCol(i) === c)
		let countL = 0
		let countR = 0
		let countT = 0
		let countB = 0
		let score = 0
		let stop = false

		compL.reverse().forEach((x: number) => {
			if (stop) return

			if (x === tree || x > tree) {
				stop = true
			}
			console.log('should add')
			countL += 1
		})
		stop = false
		compR.forEach((x: number) => {
			if (stop) return

			if (x === tree || x > tree) {
				stop = true
			}
			console.log('should add')

			countR += 1
		})
		stop = false
		compT.reverse().forEach((x: number) => {
			if (stop) return

			if (x === tree || x > tree) {
				stop = true
			}
			console.log('should add')
			countT += 1
		})
		stop = false
		compB.forEach((x: number) => {
			if (stop) return

			if (x === tree || x > tree) {
				stop = true
			}
			console.log('should add')
			countB += 1
		})

		score = [countL, countR, countT, countB].reduce((prev, next) => {
			if (prev > 0) return prev * next
			return prev
		}, 1)
		if (score > topScore) {
			topScore = score
		}

		console.log({
			tree,
			loc: [r, c],
			score,
			countL,
			countT,
			countB,
			countR,
			compB,
			compL,
			compR,
			compT,
		})

		// console.log({ ind: [r, c], tree, visibleTop, visibleRight, visibleBottom, visibleLeft, compL, compT, compB, compR })
	}

	return topScore
}
