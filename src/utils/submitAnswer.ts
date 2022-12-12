import * as dotenv from 'dotenv'
dotenv.config()



export default function submitAnswer({answer, day, part}: {answer: string | number, day: number, part: number}){
const year = process.cwd().match(/(\d{4})/g)![0]
const url = `https://adventofcode.com/${year}/day/${day}/answer` 

const headers = new Headers({ 'Cookie': `session=${process.env.SESSION}` || '' })

fetch(url, {
    method: 'POST',
    credentials: 'include', 
    headers,
    body: JSON.stringify({
        answer,
        level: part
    })
}).then(res => {
    return res.text()
}).then(data => {
    console.log(data)
}).catch(err => process.stdout.write(`${err}\n`))
}
