const router = require('express').Router();

const { getThoughts, getSingleThought, createThought, updateThought, deleteThought, addReactions, removeReactions } = require('../../controllers/thoughtControlers')

router.route('/').get(getThoughts).post(createThought)

router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought)


router.route('/:thoughtId/reactions').post(addReactions).delete(removeReactions)





module.exports = router;