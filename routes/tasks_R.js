const express = require('express');
const router = express.Router();

const { getAll, createAll, getOne, updateOne, createOne, deleteOne, deleteAll } = require('../controllers/task_CF');

// router.get('/', getAll);

router.route('/').get(getAll).post(createAll).delete(deleteAll);
router.route('/:id').get(getOne).post(createOne).patch(updateOne).delete(deleteOne);
module.exports = router;
