import { readFileSync } from 'fs'

const tests: [string, any][] = [
	[
		`$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`,
		24933642,
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

type Dir = {
	[key: string]: Dir | number
}

function solve(input: string): any {
	const threshold = 100_000
	let files: { [key: string]: number } = {}
	let dirs = new Set(['/'])
	const lines = input.trimEnd().split('\n')

	let inList = false
	let dirName = ''
	let path = ['']

	for (const line of lines.slice(1)) {
		if (inList && line.startsWith('$')) {
			inList = false
		}

		if (inList && line.startsWith('dir ')) {
			dirName = line.split(' ')[1]

			dirs.add([...path, dirName].join('/'))
			continue
		}

		if (inList) {
			let [size, fileName] = line.split(' ')
			let n = [...path, fileName].join('/')

			files[n] = parseInt(size)
			continue
		}

		if (line == '$ ls') {
			inList = true
		} else if (line == '$ cd ..') {
			path.pop()
			dirName = path.length === 0 ? '/' : path.join('/')
		} else if (line.startsWith('$ cd ')) {
			let n = line.split(' ')[2]

			path.push(n)
			dirName = [...path, line.split(' ')[2]].join('/')
		} else {
			throw Error("This should'ne 'appen")
		}
	}

	function fileSize(dirName: string) {
		let s = 0
		Object.entries(files).forEach(([k, v]) => {
			if (k.startsWith(`${dirName}/`)) {
				s += v
			}
		})
		// if (s > threshold) return 0

		return s
	}

	const totalAvailable = 70_000_000
	let required = 30_000_000
	let currentSize = Object.values(files).reduce(
		(prev, next) => (prev += next),
		0
	)
	let target = required - (totalAvailable - currentSize)

	console.log({ target, required, totalAvailable, currentSize, files })

	// console.log({ dirs, files })

	return [...dirs.values()]
		.map((d) => fileSize(d))
		.filter((d) => {
			return d > target
		})
		.sort((a, b) => a - b)[0]
}
