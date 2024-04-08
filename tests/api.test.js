const request=require("supertest")
const mongoose=require("mongoose")
const {MongoMemoryServer}=require("mongodb-memory-server")
const createServer=require("../utils/app")
require('dotenv').config()

const app=createServer()

app.listen(3000)

beforeAll(async()=>{
    try{
        const mongodb=await MongoMemoryServer.create()
        await mongoose.connect(mongodb.getUri())
        console.log('Connected to in-memory mongodb database')
    }catch(err){
        console.log(err)
    }
})

afterAll(async()=>{
    try{
        await mongoose.disconnect()
        console.log('Disconnected to in-memory mongodb database')
    }catch(err){
        console.log(err)
    }
})

describe("my first test",()=>{
    test("true is true",()=>{
        expect(true).toBe(true)
    })
})

describe("POST /users",()=>{

    const data={
        name:"shema",
        email:"shemaallansurge@gmail.com",
        password:"flinstones",
        verifyPassword:"flinstones"
    }

    it("creates a new user",async()=>{
        try{
            const response=await request(app)
            .post('/signup')
            .send(data)
            .expect('Content-Type',/json/)
            .expect(200)
            console.log(response.body)
        }catch(err){
            console.log(err)
        }
    })

})


describe('POST /message',()=>{

    const message={
        name:'shema',email:'shemaallansurge@gmail.com',subject:'Hello',message:'Hello,this is my first testing'
    }

    it("creates a new message",async()=>{
        try{
            const response=await request(app)
            .post('/messages/newMessage')
            .send(message)
            .expect('Content-Type',/json/)
            .expect(200)
    
            console.log(response.body)
        }catch(err){
            console.log(err)
        }
    })
})