const Complaint = require("../models/Complaint");

async function index(req, res) {
    try {
        const complaints = await Complaint.getAll();
        res.json(complaints);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function create(req, res) {
    try {
        const data = req.body;
        const post = await Complaint.create(data);
        res.json(post);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}
async function update(req, res) {
    try {
        const id = parseInt(req.params.id);
        const complaint = await Complaint.getById(id);
        const data = req.body;
        let result;
        if (data.is_approved) {
            result = await complaint.updateApproval(data);
        } else if (data.admin_comment) {
            result = await complaint.updateAdminComment(data);
        }
        res.status(200).json(result);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}
async function destroy(req, res) {
    try {
        let complaintId = req.params.id;
        if (!complaintId) throw new Error("id required")
        const complaint = await Complaint.getById(req.params.id);
        const result = await complaint.destroy();
        res.status(200).json(result);
    } catch (err) {
        res.status(404).json({ error: err.messageS });
    }
}
async function indexUnapproved(req, res) {
    try {
        const complaints = await Complaint.getUnapproved();
        res.status(200).json(complaints);
    } catch (err) {
        res.status(404).json({ error: err.messageS });
    }
}

module.exports = { index, update, indexUnapproved, create, destroy };