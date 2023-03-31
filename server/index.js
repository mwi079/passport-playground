const express=require('express')
const cors=require('cors')
const router=require('./routes')
const passport=require('./passport')
const session= require('express-session')
const mongoose=require('./model/model.index')
const MongoStore=require('connect-mongo')
const cookieParser =require('cookie-parser')

const port=4000;
const app=express()
app.use(cors({ origin: true, credentials: true }));

app.use(express.json())
app.use(express.urlencoded({extended:false}))
try {
    app.use(
        session({
        secret:'Testing123',
        resave: false,
        saveUninitialized: true,
        cookie:{maxAge:1000 * 60 * 60 * 24, secure: false}, //1 day
        store: 
            MongoStore.create({
                client: mongoose.connection.getClient(),
                stringify: false,
             })
      }) 
      )
    }
catch(error){
    console.log('set up express session error',error)
}

app.use(cookieParser());
// Configure passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(router)

const server=app.listen(port,()=>{
    console.log(`Port:${port}`)
})

module.exports= server