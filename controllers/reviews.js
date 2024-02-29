const HouseModel = require('../models/house')

module.exports = {
    create,
    delete: deleteOne,
    edit: editOne,
    update, 
}

async function deleteOne(req, res) {
    try {
        // find the house with the review
        const houseDoc = await HouseModel.findOne({ 'reviews._id': req.params.id, 'reviews.user': req.user._id })

        // if houseDoc is undefined, we return /houses page
        if (!houseDoc) return res.redirect('/houses')

        // then remove the review from the array
        // .remove takes an id and removes it from the array
        // .remove is a mongoose method on a document (https://mongoosejs.com/docs/subdocs.html)
        houseDoc.reviews.remove(req.params.id)

        //tell the database we removed the review
        houseDoc.save()
        // responsd to the client (tell the browser to make a request to the /houses/specific_id_from_httprequest) (show page)
        res.redirect(`/houses/${houseDoc._id}`)

    } catch (err) {
        console.log(err)
        res.send(err)
    }
}

async function create(req, res) {
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


    } catch (err) {
        console.log(err)
        res.send(err)
    }

}

async function editOne(req, res) {
    // Note the cool "dot" syntax to query on the property of a subdoc
    //const book = await Book.findOne({'comments._id': req.params.id});
    const OneReview = await HouseModel.findOne({ 'reviews._id': req.params.id });
    // Find the comment subdoc using the id method on Mongoose arrays
    // https://mongoosejs.com/docs/subdocs.html
    //const comment = book.comments.id(req.params.id);
    const review = OneReview.reviews.id(req.params.id);


    // Render the comments/edit.ejs template, passing to it the comment
    //res.render('comments/edit', { comment });
    res.render('reviews/edit', { review });
}

async function update(req, res) {
    // Note the cool "dot" syntax to query on the property of a subdoc
    try {
        console.log("req.prames", req.params)
        const OneReview = await HouseModel.findOne({ 'reviews._id': req.params.id });
        // Find the comment subdoc using the id method on Mongoose arrays
        // https://mongoosejs.com/docs/subdocs.html
        //const commentSubdoc = book.comments.id(req.params.id);
        const reviewSubdoc = OneReview.reviews.id(req.params.id);
        // Ensure that the comment was created by the logged in user
        //if (!commentSubdoc.userId.equals(req.user._id)) return res.redirect(`/books/${book._id}`);
        //if (!reviewSubdoc.userId.equals(req.user._id)) return res.redirect(`/reviews/${OneReview._id}`);
        //if (!reviewSubdoc._id.equals(req.user._id)) return res.redirect(`/houses/${OneReview._id}`);
        // Update the text of the comment
        //commentSubdoc.text = req.body.text;
        reviewSubdoc.content = req.body.content;
        //await book.save();
        await OneReview.save()
        res.redirect(`/houses/${OneReview._id}`);
    } catch (e) {
        console.log(e.message);
        res.redirect(`/houses`);
    }
    // Redirect back to the book's show view
    //res.redirect(`/books/${book._id}`);
}

