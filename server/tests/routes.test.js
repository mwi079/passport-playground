const server = require('../index');
const supertest =require('supertest');
const mongoose =require('mongoose');
const db_url='mongodb://localhost:27017/demo_test';
const request = supertest(server);

describe("Routes",()=>{
    beforeAll(()=>{
        mongoose.connect(db_url, () => console.log('connectioned to test db server'),
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        )
        
    });
    afterAll(async() => {
        await mongoose.connection.dropDatabase();
        await mongoose.disconnect();
        server.close()
    });
    let dwarfId;
    it("should allow you to add a dwarf",async()=>{
        const response=await request
            .post("/addDwarf")
            .set("content-type", "application/json")
            .send({name:'test',allow:true})
        expect(response.body.name).toBe('test');
        expect(response.body.score).toBe(0);
        dwarfId=response.body._id
    })

    it("should now allow you to add a dwarf if you are not authenticated",async()=>{
        const response=await request
            .post("/addDwarf")
            .set("content-type", "application/json")
            .send({name:'test',allow:false})
        expect(response.status).toBe(401);
    })

    it("should allow you to get the dwarfs",async()=>{
        const response=await request
            .get("/")
        expect(response.status).toBe(200);
        expect(response.text.includes('test')).toBe(true)
    })
    it("should allow you to delete a dwarf",async()=>{
        const deleteResponse=await request
            .delete("/deleteDwarf")
            .set("content-type", "application/json")
            .send({name:'test',_id:dwarfId,allow:true})
        expect(deleteResponse.status).toBe(200);
        expect(deleteResponse.text.includes('test')).toBe(true)

        const getResponse=await request
            .get("/")
        expect(getResponse.status).toBe(200);
        expect(getResponse.text.includes('test')).toBe(false)
    })
})