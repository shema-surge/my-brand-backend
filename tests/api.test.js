const request=require("supertest")
const mongoose=require("mongoose")
const {MongoMemoryServer}=require("mongodb-memory-server")
const createServer=require("../utils/app")
require('dotenv').config()

const app=createServer()

beforeAll(async()=>{
    const mongodb=await MongoMemoryServer.create()
    await mongoose.connect(mongodb.getUri())
})

afterAll(async()=>{
    await mongoose.disconnect()
    await mongoose.connection.close()
})

describe("my first test",()=>{
    test("true is true",()=>{
        expect(true).toBe(true)
    })
})

describe("/POST /users",()=>{
    it("creates a new user",()=>{
        request(app).post('/users')
        .send({name:"shema",email:"shemaallansurge@gmail.com",password:"flinstones",verifyPassword:"flinstones"})
        .set('Accept','application/json')
        .expect('Content-Type',/json/)
        .expect(200)
        .end((err,res)=>{
            if(err){
                console.log(err)
                return
            }
            console.log(res.body)
        })
    })
})