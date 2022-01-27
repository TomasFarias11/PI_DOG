const { json } = require('body-parser');
const e = require('express');
const { Router } = require('express');
const {Sequelize} = require('sequelize');
const Op = Sequelize.Op;
const {Dog, Temperaments} = require('../db.js');
const {showAll} = require('./methods.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.route('/dogs')
    .get(async (req, res) => {
        const {name} = req.query;
        try{
            let dogs = await showAll();                     
            let dbDogs = await Dog.findAll({
                include: {
                    model: Temperaments
                }
            })                                              
            const doggys=dbDogs.map(e=>{
                 return {
                     ID: e.ID,
                     name: e.name,
                     height: e.height,
                     weight: e.weight,
                     life_span: e.life_span,
                     temperaments: e.temperaments.map(t=>t.name).join(", "),
                     createdInDb: e.createdInDb,
                    //  image: e.image
                 }
            })
            const allDogs= dogs.concat(doggys)
            if(!name){
                if (Array.isArray(allDogs) && allDogs.length === 0) return res.status(404).send("No dogs were found.");
                res.json(allDogs);
                }
            else{
                let dogsName = allDogs.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
                if (dogsName.length === 0) return res.status(404).send('No dogs found with that name.')
                res.json(dogsName)
            }
        }
        catch(error){
            res.json(error)
        }

    })

router.route('/dogs/:id')
    .get(async (req, res) => {
        try {
            const {id} = req.params;
            if(Number(isNaN(id))){
                const dogDb=await Dog.findByPk(id,{include:{model:Temperaments}})

                const doggys={
                    ID: dogDb.ID,
                    name: dogDb.name,
                    height: dogDb.height,
                    weight: dogDb.weight,
                    life_span: dogDb.life_span,
                    temperaments: dogDb.temperaments.map(temperamento=>temperamento.name).join(", ") 
                }
                res.json(doggys)
            }else{
                let dogs = await showAll();
                let dogById = dogs.find(e => e.ID === Number(id));
                res.json(dogById)
            }
        }
        catch (err) {
            res.status(404).json({
                msg: "Error" + err
            })
        }
    })

router.route('/temperament')
    .get(async (req, res) => {
        try {
            // let dogs = await showAll();
            // let temperaments = dogs.map(e => e.temperaments && e.temperaments);
            // let temperamentsDB = temperaments.map(e => e && e.split(', ')).flat();
            // await Promise.all(temperamentsDB.map(e => {
            //     Temperaments.findOrCreate({
            //         where: {name: e}
            //     })
            // }))
            let allTemperaments = await Temperaments.findAll();
            res.send(allTemperaments)
        }
        catch (err) {
            res.json({
                msg: "Error" + err
            })
        }
        
    })

router.route('/dog')
    .post(async (req, res) => {
        try {
            const {name, weight, height, life_span, temperaments, createdInDb, image} = req.body;
    
            let [dogCreated, created] = await Dog.findOrCreate({
                where: {
                    name,
                    weight,
                    height,
                    life_span,
                    createdInDb,
                    // image
                }
            // let dogCreated = await Dog.create({
                
            //         name,
            //         weight,
            //         height,
            //         life_span,
                
            })
    
            let temperamentsDb = await Temperaments.findAll({
                where: {name: temperaments}
            })
    
            let doggy = await dogCreated.addTemperaments(temperamentsDb);
            // res.send('Dog created successfully');
            res.json(dogCreated)
        }
        catch (err) {
            res.json({
                msg: "Error" + err
            })
        }

    })


module.exports = router;
