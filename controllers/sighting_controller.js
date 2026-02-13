const {Sightings} = require('../models');
const types = ['Dog', 'Cat', 'Other'];

module.exports.forum = async function(req, res) {
    res.render('forum');
}