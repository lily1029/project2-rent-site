const HouseModel = require('../models/house')
module.exports = {
    new: newHouse,
    create: create, 
    index, 
    
}

async function index(req, res){
    try {
        const houseDocumentsFromDB = await HouseModel.find({})
        console.log(houseDocumentsFromDB)
        res.render('houses/index', {houseDocs: houseDocumentsFromDB})

    } catch(err){
        console.log(err)
        res.redirect('/')
    }

    res.render('houses/index')
}

async function create(req, res){
    for (let key in req.body) {
        if(req.body[key] === "") delete req.body[key];
    }
    
    try{
        const houseFromTheDatabase = await HouseModel.create(req.body);

        console.log(houseFromTheDatabase);
        res.redirect(`/houses/${houseFromTheDatabase._id}`)

    } catch (err) {
        console.log(err);
        res.render("houses/new", {errorMsg: err.message});

    }
}

function newHouse(req, res){
    //res.render looks in our
    //views folder for the ejs pages
    res.render('houses/new')
}