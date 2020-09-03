const request= require('request');
const forcast=(latitude,longitude,callback)=>{
	const url='http://api.weatherstack.com/current?access_key=1535589b43141ddcb155d1fd49a07d08&query=' + latitude + ',' + longitude + '&units=m'
	request({url,json:true},(error,{body})=>{
		if(error){
			callback('unable to connect to the Internet',undefined)
		}
		else if(body.error)
		{
			callback('dont know what to do',undefined)
		}
		else{
			callback(undefined,'it is currently ' + body.current.temperature + ' degree out. It feels like ' + body.current.weather_descriptions
				
			)
		}
	})


}
module.exports=forcast
