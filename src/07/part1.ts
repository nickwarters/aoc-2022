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
		95437,
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

	let fileName
	for (const line of lines.slice(1)) {
		console.log({ line, inList, path })
		if (inList && line.startsWith('$')) {
			inList = false
		}

		if (inList && line.startsWith('dir ')) {
			dirName = line.split(' ')[1]
			console.log({ dirName })
			dirs.add([...path, dirName].join('/'))
			continue
		}

		if (inList) {
			let [size, fileName] = line.split(' ')
			let n = [...path, fileName].join('/')
			console.log({ path, dirName, fileName, n })
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
			console.log(n)
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
		if (s > threshold) return 0

		return s
	}

	let start = Object.values(files).reduce((prev, next) => (prev += next), 0)

	if (start > threshold) {
		start = 0
	}

	console.log({ dirs, files })

	return [...dirs.values()].reduce((prev, d) => (prev += fileSize(d)), 0)
}
