const { User, Thought } = require('../models');

const userController = {
    getUsers(req, res) {
        User.find()
            .then(userData => {
                res.json(userData)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    },

    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .populate('friends')
            .populate('thoughts')
            .then(userData => {
                res.json(userData)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    },

    createUser(req, res) {
        User.create(req.body)
            .then(userData => {
                res.json(userData)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    },

    addFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } })
            .then(userData => {
                res.json(userData)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    },

    updateUser(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body }, { runValidators: true, new: true })
            .then(userData => {
                res.json(userData)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    },

    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((userData) => {
                Thought.deleteMany({ _id: { $in: userData.thoughts } })
            })
            .then(() => {
                res.json({ message: "user has been deleted!" })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    },

    removeFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } })
            .then(userData => {
                res.json(userData)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    }
}

module.exports = userController