const {Pet} = require('../models');
const types = ['Dog', 'Cat', 'Other']

module.exports.index = async function(req, res) {
    let searchtypes = ['All']
    for(i=0; i<types.length; i++){
        searchtypes.push(types[i]);
    }
    let pets;
    let searchtype = req.query.type || 'All';
    if(searchtype === 'All'){
        pets = await Pet.findAll();
    } else {
        pets = await Pet.findAll({
            where: {
                type: searchtype
            }
        });
    }
    res.render('index', {pets, types:searchtypes, searchtype});
}

module.exports.renderAddLost = function(req, res) {
    let searchtypes = [];
    for(let i = 0; i<types.length; i++) {
        searchtypes.push(types[i]);
    }
    res.render('add', {types:searchtypes});
}

module.exports.addPet = async function(req, res) {
    console.log(`STUFF HERE ${req.user.id}`)
    await Pet.create(
        {
            name: req.body.name,
            description: req.body.description,
            image: req.body.image,
            uzer_id: req.user.id,
            type: req.body.type
        }
    );
    res.redirect('/');
}

module.exports.renderEditPet = async function(req, res) {
    const pet = await Pet.findByPk(req.params.id);
    res.render('edit', {pet});
}

module.exports.updatePet = async function(req, res) {
    await Pet.update(
        {
            name: req.body.name,
            description: req.body.description,
            image: req.body.image
        },
        {
            where: {
                id: req.params.id
            }
        });
    res.redirect('/');
}

module.exports.deletePet = async function(req, res) {
    await Pet.destroy(
        {
            where: {
                id: req.params.id
            }
        });
    res.redirect('/');
}