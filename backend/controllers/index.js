exports.index = (req, res) => {
    const data = {
        title: "Back Bone of the Florin Council's Website! ",
        description: "No peeking!",
    };
    res.status(200).json(data);
};
