const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projects');
const { authenticateToken } = require('../middleware/auth')

router.post('/createProject', authenticateToken, projectController.createProject);
router.get('/getProjects', projectController.getProjects);

module.exports = router;
