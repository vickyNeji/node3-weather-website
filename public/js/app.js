const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const message1=document.querySelector('#first')
const message2=document.querySelector('#second')

weatherForm.addEventListener('submit',function(event){
    event.preventDefault()
    const location=search.value
    message1.textContent='Loading...'
   // console.log(location)
   fetch('http://localhost:3000/weather?address='+location).then(function(response){
    response.json().then(function(data){
        if(data.error){
            message1.textContent=data.error

        }else{
            // console.log(data.location)
            // console.log(data.forecast)
            if(data.location==undefined){
                message1.textContent='Enter valid location'
            }
            message1.textContent=data.location
            message2.textContent=data.forecast
        }
        
    })
})



})