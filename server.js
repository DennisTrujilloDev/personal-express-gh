const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('views'))


const coffeeOrders = {}

app.get('/', (req, res)=>{
  res.render('index.ejs', {coffeeOrders})


})

app.post('/order', (req, res)=> { //req from browser, res is what will be sent back via ejs aka html
  const oneCoffeeOrder = {type: req.body.type, temp: req.body.temp, sweet: req.body.sweet, id: new Date().toString()} 
  coffeeOrders[oneCoffeeOrder.id] = oneCoffeeOrder
  res.redirect('/') // anytime you land on homepage you render index.ejs file w data already

}) 


app.delete('/deleteEm', (req, res) => {
  let plsDelete = req.body.id.split(";")
  plsDelete.forEach(elementToDelete => {
    delete coffeeOrders[elementToDelete]
  })
    res.send('Message deleted!')
})


app.listen(7000, () => console.log('running port 7000'))
