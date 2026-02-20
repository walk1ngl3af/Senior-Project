const {Sightings} = require('../models');
const types = ['Dog', 'Cat', 'Other'];

module.exports.forum = async function(req, res) {
    let searchtypes = ['All']
    for(i=0; i<types.length; i++){
        searchtypes.push(types[i]);
    }
    let sightings;
    let searchtype = req.query.type || 'All';
    if(searchtype === 'All'){
        sightings = await Sightings.findAll();
    } else {
        sightings = await Sightings.findAll({
            where: {
                type: searchtype
            }
        });
    }
    res.render('forum', {sightings, types:searchtypes, searchtype});
}

module.exports.renderAddSighting = function(req, res){
    let searchtypes = [];
    for(let i = 0; i<types.length; i++) {
        searchtypes.push(types[i]);
    }
    res.render('sightings/addSightings', {types:searchtypes});
}

module.exports.addSighting = async function(req, res) {
    console.log(`STUFF HERE ${req.user.id}`)
    await Sightings.create(
        {
            type: req.body.type,
            image: req.body.image,
            description: req.body.description,
            date: req.body.date,
            uzer_id: req.user.id
        }
    );
    res.redirect('/');
}

module.exports.renderEditSighting = async function(req, res) {
    const sighting = await Sightings.findByPk(req.params.id);
    res.render('editSighting', {sighting});
}