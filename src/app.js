const express=require('express')
const hbs=require('hbs')
const app=express()
const path=require('path')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

//DEfine paths for Express config
const finalPath=path.join(__dirname,'../public')
const partialsPAth=path.join(__dirname,'../templates/partials')
console.log(partialsPAth)
//console.log(finalPath)



//Setup handlebars engine and views location
app.set('views','../templates/views')
app.set('view engine','hbs')
hbs.registerPartials(partialsPAth)


//Setup static directory to serve
app.use(express.static(finalPath))


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Vivek Negi'
    })
})

app.listen(3000,function(){
    console.log("Server is runnung")
})
app.get('/about',function(req,res){
    res.render('about',{
        title:'About PAge',
        name:'Vivek Negi'
    })
})

app.get('/help',function(req,res){
    res.render('help',{
        title:'911 ',
        name:'VIvek Negi'
    })
})


app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Vivek Negi',
        errorMessage:'Help Article Not Found'
    })
})

app.get('/products',function(req,res){
    if(!req.query.search){
        return res.send({
            error:'must include a search term'
        })
    }
    //console.log(req.query)
    res.send({
        products:[]
    })

})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Empty Address'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{

        if(error){
          return res.send({
              error
          })
           }
     
         forecast(latitude,longitude,function(error,newData){
     
           if(error){
              return res.send({
                 error
              })
           }
     
           
           res.send({
               forecast:newData,
               location:location,
               Address:req.query.address
           })
     
         })
        
      })
    // res.send({
    //     forecast: 'It is raining',
    //     location:'Ranikhet',
    //     address:req.query.address
    // })

})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Vivek Negi',
    errorMessage:'PAge not Found'})

})



// app.get('/help',function(req,res){
//     res.send("Cant HElp F**k Off")
// })

// app.get('/about',function(req,res){
//     res.send({name:'Vivek',
// age:22})//We can also Send back objand arrays that will show as JSON obj in Browser
// })


// app.get('/weather',function(req,res){
//     res.send({forecast:'There is gonna be a thunderstorm Run Bitch',
// location:'Delhi'})//Sending back a HTML DATA
// })
