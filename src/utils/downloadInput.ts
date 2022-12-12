import { writeFileSync } from 'fs'
import * as dotenv from 'dotenv'
import path from 'path'
dotenv.config()

const headers = new Headers({ 'Cookie': `session=${process.env.SESSION}` || '' })
const year = process.cwd().match(/(\d{4})/g)![0]
const day = process.argv[2]
const url = `https://adventofcode.com/${year}/day/${day}/input` 

fetch(url, { 
    credentials: 'include', 
    headers 
}).then(res => {
    return res.text()
}).then(data => {
    writeFileSync(path.join(process.cwd(), 'src', day, 'input.txt'), data)

}).catch(err => process.stdout.write(`${err}\n`))
