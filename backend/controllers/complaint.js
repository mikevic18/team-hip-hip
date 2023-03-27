const Complaint = require("../models/Complaint");

async function index(req, res) {
    try {
        const complaints = await Complaint.getAll();
        res.status(200).json(complaints);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function show(req, res) {
    try {
        const id = parseInt(req.params.id);
        const complaint = await Complaint.getOneById(id);
        res.status(200).json(complaint);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

async function getMostRecent(req, res) {
    try {
        const complaint = await Complaint.getByRecent();
        res.status(200).json(complaint);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

async function create(req, res) {
    try {
        const data = req.body;
        const complaint = await Complaint.create(data);
        res.json(complaint);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

async function update(req, res) {
    try {
        const id = parseInt(req.params.id);
        const complaint = await Complaint.getOneById(id);
        const data = req.body;
        if(data.votes){
            const result = await complaint.updateVote(data);

        }else{
            const result = await complaint.update(data);

        }
        res.status(200).json(result);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}
async function destroy(req, res) {
    try {
        const id = parseInt(req.params.id);
        const complaint = await Complaint.getOneById(id);
        const result = await complaint.destroy();
        res.json(result);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

module.exports = {
    index,
    show,
    getMostRecent,
    create,
    destroy,
    update,
};
