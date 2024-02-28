// import our model so we can talk to the database and performs
// our CRUD operations
const HouseModel = require('../models/house')

module.exports = {
    new: newHouse,
    create: create, 
    index, 
    show
    
}

async function show(req, res){
    try {

        // req.params.id value is coming from the browsers request
		// the name `.id` is defined in the routes/houses show route
		// router.get('/:id', houseCtrl.show);
        const houseFromTheDatabase = await HouseModel.findById(req.params.id)

        console.log(houseFromTheDatabase);

        res.render("houses/show", {
            house: houseFromTheDatabase,
        });
    } catch (err) {
        console.log(err)
        res.send(err);

    }

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