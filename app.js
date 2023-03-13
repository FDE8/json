const express = require('express')
const app =express()
const mysql = require('mysql')
const myConnection = require('express-myconnection');
const connection = require('express-myconnection');
const notesRoutes = require('./routes/notesRoutes')
const parkingsRoutes = require('./routes/parkingsRoute')




const optionBd = {
    host :'127.0.0.1',
    user : 'root',
    password : '',
    port : 3306,
    database : 'notes_bd'
};


//extration des donnee du formulaire
app.use(express.urlencoded({extended : false}))

// Définition du middleware 
app.use(myConnection(mysql,optionBd,'pool'))

// définition de l'affichage
app.set('view engine', 'ejs')
app.set('views','IHM')

// definition des routes pour node
app.use(notesRoutes)
app.use(parkingsRoutes)

app.get('/apropos', (req, res)=>{
    res.status(200).render('apropos')
})

app.use((req,res)=>{
    res.status(404).render('pageintrouvable')
})
app.listen(3001)
console.log('Attente des requêtes au port 3001')