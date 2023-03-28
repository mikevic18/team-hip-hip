const Complaint = require("../models/Complaint");

async function update(req, res) {
    try {
        const id = parseInt(req.params.id);
        const complaint = await Complaint.getOneById(id);
        const data = req.body;
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

module.exports = update;
