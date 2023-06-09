const Skill = require("../models/Skills");

const index = async (req, res) => {
    try {
        const skills = await Skill.getAll();
        res.json(skills);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
async function vote(req, res) {
    try {
        let skillId = req.params.id;
        let data = req.body;
        if (!skillId || !req.body.user_id) throw new Error("id required");
        const skill = await Skill.getOneById(req.params.id);
        const result = await skill.updateVotes(data);
        res.status(200).json(result);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}
async function indexUnapproved(req, res) {
    try {
        const complaints = await Skill.getUnapproved();
        res.status(200).json(complaints);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}
const getRecent = async (req, res) => {
    try {
        const skills = await Skill.getByRecent();
        res.json(skills);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const show = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const skill = await Skill.getOneById(id);
        res.json(skill);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

async function create(req, res) {
    try {
        const data = req.body;
        const result = await Skill.create(data);
        res.status(201).send(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

async function update(req, res) {
    try {
        const id = parseInt(req.params.id);
        const data = req.body;
        const skill = await Skill.getOneById(id);
        const result = await skill.update(data);
        res.status(200).json(result);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

async function updateVotes(req, res) {
    try {
        const id = parseInt(req.params.id);
        const data = req.body;
        const skill = await Skill.getOneById(id);
        const result = await skill.updateVotes(data);
        res.status(200).json(result);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

async function destroy(req, res) {
    try {
        const id = parseInt(req.params.id);
        const skill = await Skill.getOneById(id);
        const result = await skill.destroy();
        res.status(204).send(result);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

module.exports = {
    vote,
    index,
    getRecent,
    show,
    create,
    update,
    updateVotes,
    destroy,
    indexUnapproved,
};
