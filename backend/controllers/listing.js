const Listing = require('../models/Listing')

const index = async (req, res) => {
    try {
        const listing = await Listing.getAll()
        res.json(listing)
    } catch(err) {
        res.status(500).json({"error": err.message})
    }
}
async function indexUnapproved(req, res) {
    try {
        const listing = await Listing.getUnapproved();
        res.status(200).json(listing);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}
const getRecent = async (req, res) => {
    try {
        const listings = await Listing.getByRecent()
        res.json(listings)
    } catch(err) {
        res.status(500).json({"error": err.message})
    }
}

const show = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const listings = await Listing.getOneById(id)
        res.json(listings)
    } catch(err) {
        res.status(404).json({"error": err.message})
    }
}

async function create (req, res) {
    try {
        const data = req.body;
        const result = await Listing.create(data);
        res.status(201).send(result);
    } catch (err) {
        res.status(400).json({"error": err.message})
    }
};

async function update (req, res) {
    try {
        const id = parseInt(req.params.id);
        const data = req.body;
        const listing = await Listing.getOneById(id)
        const result = await listing.update(data);
        res.status(200).json(result);
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
}

async function updateVotes (req, res) {
    try {
        const id = parseInt(req.params.id);
        const data = req.body;
        const listing = await Listing.getOneById(id)
        const result = await listing.updateVotes(data);
        res.status(200).json(result);
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
}

async function destroy (req, res) {
    try {
        const id = parseInt(req.params.id);
        const listing = await Listing.getOneById(id);
        const result = await listing.destroy();
        res.status(204).send(result);
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
}


module.exports = { index, getRecent, show, create, update, updateVotes, destroy, indexUnapproved }