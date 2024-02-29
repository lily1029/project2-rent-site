const HouseModel = require('../models/house')

module.exports = {
    create, 
    delete: deleteOne
}

async function deleteOne(req, res){
    try {
        // find the house with the review
        const houseDoc = await HouseModel.findOne({'reviews._id': req.params.id, 'reviews.user': req.user._id })

        // if houseDoc is undefined, we return /houses page
        if(!houseDoc) return res.redirect('/houses')

        // then remove the review from the array
		// .remove takes an id and removes it from the array
		// .remove is a mongoose method on a document (https://mongoosejs.com/docs/subdocs.html)
        houseDoc.reviews.remove(req.params.id)

        //tell the database we removed the review
        houseDoc.save()
        // responsd to the client (tell the browser to make a request to the /houses/specific_id_from_httprequest) (show page)
        res.redirect(`/houses/${houseDoc._id}`)

    } catch(err){
        console.log(err)
        res.send(err)
    }
}

async function create(req, res){
    // To find the house!
	console.log('====================================')
	console.log(req.user, "< ---- req.user")
	console.log('====================================')
    try {
        // req.params.id comes from the http request from the reviews form on the 
		// houses show page (.id name comes from the routes/reviews route)
        const houseDoc = await HouseModel.findById(req.params.id)
        // houseDoc is the house info from the database

        // Add the users information the review
        req.body.user = req.user._id
        req.body.userName = req.user.name 
        req.body.userAvatar = req.user.avatar 
        // the left side, keys must match 
		// the review schema

		// the req.user has the keys of the the userSchema

        // Then add the review to the house's reviews array
        // add the contents of the review form (req.body),
        // this tells the db we added a review to the house we found!
        houseDoc.reviews.push(req.body);

        // to the reviews array
		// since we're mutating (changing) the houseDoc, we have to tell the database
        // this tells the db we added a review to the movie we found!
        await houseDoc.save()

        //then respond to the client
        res.redirect(`/houses/${req.params.id}`)
        // this tells the browser to make a get request 
		// to /houses/23974981738921
		// res.redirect(`/houses/${houseDoc._id}`)


    } catch(err){
        console.log(err)
        res.send(err)
    }

}