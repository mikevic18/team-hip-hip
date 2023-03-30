const Complaint = require("../models/Complaint");
const Post = require("../models/Post");
const User = require("../models/User");
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
        if (!complaintId) throw new Error("id required");
        const complaint = await Complaint.getById(complaintId);
        if (
            !User.checkIfAdmin(req.body.user_id) &&
            req.body.user_id != complaint.user_id
        )
            throw new Error("Unauthorized");
        let data = req.body;
        let result;
        result = await complaint.updateComplaint(data);
        res.status(200).json(result);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}
async function vote(req, res) {
    try{
        let complaintId = req.params.id;
        let data = req.body;
        if(!complaintId || !req.body.user_id) throw new Error("id required")
        const complaint = await Complaint.getById(req.params.id)
        const result = await complaint.vote(data)
        res.status(200).json(result);
    }
    catch (err) {
        res.status(404).json({ error: err.message });
    }
}

async function approveComplaint(req,res){
    try{
        let complaintId = req.params.id;
        let data = req.body;
        if(!complaintId || !req.body.user_id) throw new Error("id required")
        const complaint = await Complaint.getById(req.params.id);
        const result = complaint.updateApproval(data);
        res.status(200).send(result);
    }
    catch(err){
        res.status(404).json({ error: err.message });
    }
}

async function destroy(req, res) {
    try {
        let complaintId = req.params.id;
        if (!complaintId) throw new Error("id required");
        const complaint = await Complaint.getById(req.params.id);
        if (
            !User.checkIfAdmin(req.body.user_id) &&
            complaint.user_id != req.body.user_id
        )
            throw new Error("User not authenticated");

        await Post.destroyAllComplaintPosts(req.params.id);
        const result = await complaint.destroy();
        res.status(200).json(result);
    } catch (err) {
        res.status(404).json({ error: err.message });
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

module.exports = { index, update, indexUnapproved, create, destroy, vote, approveComplaint };
