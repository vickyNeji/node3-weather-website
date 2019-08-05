const request=require('request')


const forecast=function(latitude,longitude,callback){
    
    const url='https://api.darksky.net/forecast/1ac1d4ae7ab3c1953e674f6a41205173/' + latitude + ',' + longitude +'?units=si'
       request({url:url,json:true},function(error,response){

        if(error){
            callback("No network connection",undefined)
        }else if(response.body.error){

            callback("No coordinate found",undefined)

        }else{
            callback(undefined,"It is currently "+response.body.currently.temperature+" degrees out,"+"there is "+response.body.currently.precipProbability*100 +"% chance of rain")


        }

       }) 

}
module.exports=forecast