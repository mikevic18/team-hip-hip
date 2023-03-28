const Complaint = require("../models/Complaint");

async function index(req, res) {
    try {
        const complaints = await Complaint.getAll();
        res.json(complaints);
    } catch (err) {
        res.status(500).json({"error": err.message });
    }
}

async function update(req, res) {
    try {
        const id = parseInt(req.params.id);
        const complaint = await Complaint.getById(id);
        console.log(complaint)
        const data = req.body;
        console.log(data)
        let result;
        if(data.is_approved){
            result = await complaint.updateApproval(data);

        } else if (data.admin_comment) {
            result = await complaint.updateAdminComment(data);

        }
        res.status(200).json(result);
    } catch (err) {
        res.status(404).json({ "error": err.message });
    }
}

module.exports = {index, update};
