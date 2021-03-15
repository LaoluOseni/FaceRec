const Clarifai = require('clarifai');
//another problem with clarifai. There was a dot infront of Clarifai below

const app = new Clarifai.App({
    apiKey: '517997cb8ff044d8bcdfcb32c22c9422'
    //api key and image detection is implemented at backend for security
});

const handleApiCall =(req, res) => {
    app.models.predict('c0c0ac362b03416da06ab3fa36fb58e3', req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.json(err))
    //.catch(err => res.status(400).json('unable to work with API'))
}
const handleImage = (req, res, knex) => {
    const { id } = req.body;
    knex('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'))
}


module.exports = {
    handleImage,
    handleApiCall
}