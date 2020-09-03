console.log('welcome to the javascript world as you loaded your file so you got the opportunity to join the amazing world of java script')



const weather=document.querySelector('form')
const search=document.querySelector('input')
const message=document.querySelector('#message-1')
const message2=document.querySelector('#message-2')


weather.addEventListener('submit',(e)=>{
	e.preventDefault()
	const location=search.value
	message.textContent='loading...'
	message2.textContent=''
	
fetch(`/products?address=${location}`).then((response)=>{
	response.json().then((data)=>{
		if(data.error){
			message.textContent=data.error

		}
		else{
			message.textContent= data.location
			message2.textContent=data.forecast
			
		}
	})
})
	
})










