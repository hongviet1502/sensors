const express = require("express")

const ejs = require("ejs")

const app = new express()


//cấu hình public file
app.use(express.static('public'))

//cấu hinh template engine
app.set('view engine', 'ejs')

// app.get("/", (req, res) => {
//     res.render('sensor')
// })

app.listen(3000, function(){
    console.log("Server listen on port: 3000")
})


//MQTT Client Subscribe
const mqtt = require('mqtt')

const options = {
    // Clean session
    clean: true,
    connectTimeout: 4000,
    // Auth
    clientId: 'mqttjstest',
    username: '',
    password: '',
  }
const topic = 'test'
const client = mqtt.connect('mqtt:localhost:1883',options)
let sensorData = []

client.on("connect", function() {
    console.log("connected to MQTT Broker")
})

// Subscribe to a topic with QoS 0
client.on('message', function (topic, payload) {
    // Payload is Buffer
    // console.log(`Topic: ${topic}, Message: ${payload.toString()}`)
    // console.log(typeof payload.toString())
    sensorData.push(JSON.parse(payload.toString()))
    //console.log(sensorData)
})

//route
app.get("/", function(req, res){
    res.render("sensor.ejs", { data: sensorData })
    sensorData = [];
})


client.on("connect", function(){
    client.subscribe(topic)
})











