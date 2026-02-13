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

module.exports