const axios = require('axios');
const Dev = require('../models/Dev');

const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {

    async update(req, res) {

        const { techs, latitude, longitude, name, avatar_url, bio } = req.body;
        const techsArray = parseStringAsArray(techs);

        const location = {
            type: "Point",
            coordinates: [longitude, latitude]
        };

        let dev = await Dev.updateOne({ github_username: req.params.github_username }, {
            avatar_url,
            bio,
            name,
            techs: techsArray,
            location,
        });

        return res.json(dev);
    },

    async delete(req, res) {
        let dev = await Dev.deleteOne({
            github_username: req.params.github_username
        });

        return res.json(dev);
    },

    async index(req, res) {
        const devs = await Dev.find();

        return res.json(devs);
    },

    async store(req, res) {
        const { github_username, techs, latitude, longitude } = req.body;

        let dev = await Dev.findOne({ github_username });

        if (!dev) {

            const response = await axios.get(`https://api.github.com/users/${github_username}`);

            const { name = login, avatar_url, bio } = response.data

            techsArray = parseStringAsArray(techs);

            const location = {
                type: "Point",
                coordinates: [longitude, latitude]
            };

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            });

            return res.json(dev);

        }


        return res.json(dev);
    }
};