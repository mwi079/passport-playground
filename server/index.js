const express=require('express')
const cors=require('cors')
const router=require('./routes')
const passport=require('./passport')
const session= require('express-session')

const port=4000;
const app=express()

app.use(express.json())
app.use(session({
    secret:'Testing123',
    resave: false,
    saveUninitialized: true,
    cookie:{maxAge:1000 * 60 * 60 * 24} //1 day
}))
app.use(cors())

app.use(router)



// Configure passport middleware
app.set('trust proxy', 1) 
app.use(passport.initialize());
app.use(passport.session());




const server=app.listen(port,()=>{
    console.log(`Port:${port}`)
})

module.exports= server