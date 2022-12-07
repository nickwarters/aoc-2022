import { readFileSync } from 'fs'

const tests: [string, any][] = [[`$ cd /
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
7214296 k`, 0]]

tests.forEach(([testData, expected]) => {
    const result = solve(testData)
    console.log(`Example Input Solution - Expected: ${expected}, Got: ${result}, ${result === expected ? 'PASS' : 'FAIL'}`)
})

console.log('Full Input Solution', solve(readFileSync('./input.txt', { encoding: 'utf-8' })))

type Dir = {[key: string]: Dir | number}

function solve(input: string): any {
    const threshold = 10_000
    let path: string[] = []
    return Object.entries(input.trimEnd().split('\n').reduce((dirs: Dir , line) => {
        console.log('line -->', line)
        if(line=== '$ cd /'){
            path = ['/']
            return dirs

        }

        if(line === '$ cd ..'){
            if(path.length === 1 && path[0] === '/') return dirs

            path.pop()
            return dirs
        }

        if(line.startsWith('$ cd ')){
            line = line.replace('$ cd ', '')
            
            if(!(line in dirs)){
                let t_dir: Dir | null = null
                let t_name: string
                for(let i = 0; i < path.length; i++){
                    t_name = path[i]
                    t_dir = t_dir !== null ? t_dir[t_name] as Dir : dirs[t_name] as Dir

                }

                if(!(line in t_dir!)){
                    t_dir![line] = {}
                }
            }

            path.push(line)
            return dirs
        }

        if(line === '$ ls' || line.startsWith('dir ')) return dirs

        const [size, name] = line.match(/\d{1,}|[a-zA-Z\.]{1,}/g)!
        console.log('size:', size, 'name:', name)
        let t_dir: Dir | null = null
        let t_name: string
        console.log(path)
        for(let i = 0; i < path.length; i++){
            t_name = path[i]
            t_dir = t_dir !== null ? t_dir[t_name] as Dir : dirs[t_name] as Dir
            console.log(path[i], t_name, t_dir)
        }

        
        t_dir![name] = parseInt(size)
         

        return dirs
    }, {'/': {}})).length

    
}
