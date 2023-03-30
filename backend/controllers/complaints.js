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
        const complaintId = req.params.id;
        if (!complaintId) throw new Error("id required")
        const complaint = await Complaint.getById(complaintId);
        if(req.body.user_id != complaint.user_id) throw new Error("Unauthorized");
        let data = req.body;
        let result;
        result = await complaint.updateComplaint(data);
        // if (data.is_approved) {
        //     result = await complaint.updateApproval(data);
        // }
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
        if(complaint.user_id != req.body.user_id) throw new Error("User not authenticated")
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
