const path=require('path')
const express=require('express')
const app=express()
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forcast')

const htmlfile=path.join(__dirname,'../public')
const viewpath=path.join(__dirname,'../templates/views')
const partialspath=path.join(__dirname,'../templates/partials')


app.set('view engine', 'hbs');
app.set('views',viewpath)
hbs.registerPartials(partialspath)

app.use(express.static(htmlfile))
app.get('',(req,res)=>{
	res.render('index',{
		title:'Weather',
		menu:'Just be yourself and focus on your goals',
		name:'Created by Ankit Dubey'
	})
})
app.get('/about',(req,res)=>{
	res.render('about',{
		title:'About',
		menu:'give me money to get menu',
		name:'Created by Ankit Dubey'
	})
})
app.get('/help',(req,res)=>{
	res.render('help',{
		helptext:'this is a helpful text',
		title:'Help',
		name:'Created by Ankit Dubey'
	})
})

app.get('/weather',(req,res)=>{
	if(!req.query.address){
		return res.send({
			error:'please provide an address'
		})
	}
	res.send({
		forecast:'it is raining',
		location:'Mumbai,India',
		name:req.query.address

	})
})
app.get('/products',(req,res)=>{
	if(!req.query.address){
		return res.send({
			error:'please provide an address'
		})
	}
	else{
	geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
		if(error){
			return res.send({
				error
			})
		}
			forecast(latitude,longitude,(error,forecast)=>{
				if (error){
					return res.send({
						error
					})
				}
			
		res.send({
		location:location,
		forecast:forecast
	})
	})
})
}
	})

	
app.get('/help/*',(req,res)=>{
	res.render('404',{
		errormessage:'no such help article',
		title:'Error',
		name:'Created by Ankit Dubey'
	})

})


app.get('*',(req,res)=>{
	res.render('404',{

		errormessage:'page not found',
		title:'Error',
		name:'Created by Ankit Dubey'
	})

})


app.listen(3000,()=>{
	console.log('server is up on the port')
})
