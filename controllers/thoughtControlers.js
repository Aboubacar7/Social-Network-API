const { User, Thought } = require('../models');

//getThoughts, getSingleThought, createThought, updateThought, deleteThought

module.exports = {

    async getThoughts(req, res) {
        try {
            const thoughtsData = await Thought.find();
            res.json(thoughtsData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    },

    async getSingleThought(req, res) {
        try {
            const thoughtData = await Thought.findOne({ _id: req.params.thoughtId })
            res.json(thoughtData);
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    },

    async createThought(req, res) {
        try {
            const thoughtData = await Thought.create(req.body)
            res.json(thoughtData);
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    },

    async updateThought(req, res) {
        try {
            const thoughtData = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true })
            res.json(thoughtData);
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    },

    async deleteThought(req, res) {
        try {
            const thoughtData = await Thought.findOneAndDelete({ _id: req.params.thoughtId })
            res.json({ message: "Thought has been deleted!" })
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    },

    async addReactions(req, res) {
        try {
           
            const thoughtData = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $addToSet: { reactions: req.body }},  {new: true })
            res.json(thoughtData);

        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    async removeReactions(req, res) {

        try {
            const thoughtData = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: { reactions: req.body} })
            res.json(" Reactions Deleted 🎉")

        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }
}