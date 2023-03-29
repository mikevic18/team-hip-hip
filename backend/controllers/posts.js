const Post = require("../models/Post");

const categories = ["complaints", "listings", "information", "skill_share"]

async function index(req, res) {
    try {
        const posts = await Post.getAll();
        res.json(posts);
    } catch (err) {
        res.status(500).json({"error": err.message });
    }
}

async function categoryIndex(req, res) {
    try {
        const category = req.params.cat
        if (categories.indexOf(category) == -1) throw new Error("Category does not exist")
        const posts = await Post.getAllOfCategory(category)
        console.log(posts)
        res.json(posts)
    } catch(err) {
        res.status(404).json({"error": err.message})
    }
}

async function show(req, res) {
    try {
        const id = parseInt(req.params.id);
        const post = await Post.getOneById(id);
        res.json(post);
    } catch (err) {
        res.status(404).json({"error": err.message });
    }
}

async function indexByDate(req, res) {
    try {
        const posts = await Post.getByRecent();
        res.json(posts);
    } catch (err) {
        res.status(404).json({"error": err.message });
    }
}

async function categoryIndexByDate(req, res) {
    try {
        const category = req.params.category
        if (categories.indexOf(category) == -1) throw new Error("Category does not exist")
        const posts = await Post.getAllOfCategoryByRecent(category)
        res.json(posts)
    } catch(err) {
        res.status(404).json({"error": err.message})
    }
}

async function create(req, res) {
    try {
        const data = req.body;
        if (categories.indexOf(data.category) == -1) throw new Error("Category does not exist")
        const post = await Post.create(data);
        res.json(post);
    } catch (err) {
        res.status(404).json({"error": err.message });
    }
}

async function update(req, res) {
    try {
        const id = parseInt(req.params.id);
        const post = await Post.getOneById(id);
        const data = req.body;
        let result
        if(data.votes){
            result = await post.updateVotes(data);

        }else{
            result = await post.update(data);

        }
        res.status(200).json(result);
    } catch (err) {
        res.status(404).json({ "error": err.message });
    }
}

async function destroy(req, res) {
    try {
        const id = parseInt(req.params.id);
        const post = await Post.getOneById(id);
        const result = await post.destroy();
        res.json(result);
    } catch (err) {
        res.status(404).json({"error": err.message });
    }
}

module.exports = {
    index,
    categoryIndex,
    show,
    indexByDate,
    categoryIndexByDate,
    create,
    update,
    destroy,
};
