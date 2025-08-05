const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projects');
const { authenticateToken } = require('../middleware/auth')

router.post('/createProject', authenticateToken, projectController.createProject);
router.get('/getProjects', authenticateToken, projectController.getProjects);
router.get('/getUserProjects', authenticateToken, projectController.getUserProjects)

module.exports = router;
