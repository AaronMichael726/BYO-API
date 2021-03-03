const express = require('express')
const axios = require('axios')

const app = express()
const PORT = process.env.PORT || 3000
const db = require('./models')
let url =  'https://pokeapi.co/api/v2/pokemon'

app.get('/pokemon', async (req, res) => {
    let response = await axios.get(url)
    response = response.data.results
    
    for(let i = 0; i < 10; i++){
        const { name, url } = response[i]
        db.Pokemon.create({
            name,
            url,
        }, (err, response) => {
            if (err) { return  console.log(err)}
            console.log(response)
        })
    }
    res.send(response)
})

app.get('/pokemon/:name', async (req, res) => {
    // pass params and upate the url
    const name = req.params
    url = url + `/${name.name}`

    // call the data
    let response = await axios.get(url)
    response = response.data.abilities

    const foundPokemon = await db.Pokemon.findOne({ name: name.name }) 

    console.log(foundPokemon)

    for (let i = 0; i < response.length; i++){
        const { ability, isHidden, slot } = response[i]
        // const { name, url } = ability
        foundPokemon.ability.push({
            name: ability.name,
            isHidden, 
            slot
        }, (err, response) => {
            if (err) { return console.log(err) }
            console.log(response)
        })
    }
    res.send(response)
})

app.post('/')

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`)
})