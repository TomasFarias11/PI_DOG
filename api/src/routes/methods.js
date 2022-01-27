const {default: axios} = require("axios");
const YOUR_API_KEY = process.env.YOUR_API_KEY;

module.exports = {
    showAll: () => {
        let dogs = axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`)
            .then(r => r.data)
            .then(results => {
                let dogsData = [];
                results.forEach(e => dogsData.push({
                    ID: e.id,
                    name: e.name,
                    height: e.height.imperial,
                    weight: e.weight.imperial,
                    life_span: e.life_span,
                    image: e.image.url,
                    temperaments: e.temperament,
                }))
                return dogsData;
            })
            .catch(err => console.log(err));
        return dogs;
    },

}