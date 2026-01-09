const { poolPromise } = require('../config/db');

exports.createProject = async(req, res) => {
    try{
        const {name, description, created_by} = req.body
        const pool = await poolPromise;

        //check if the required fields are provided
        if (!name || !created_by) {
            return res.status(400).json({ message: 'Project name and created by are required.' });
        }

        await pool.request()
            .input('name', name)
            .input('description', description)
            .input('created_by', created_by)
            .execute('createProject');

        res.status(201).json({ message: 'Project created successfully'});
    }catch (error){
        console.error('Error creating project:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

exports.getProjects = async(req, res) => {
    try{
        const pool = await poolPromise;

        const result = await pool.request().execute('getProjects');

        const projects = result.recordset.map(project => {
            return {
                ...project,
                members: JSON.parse(project.members || '[]')
            };
        });

        res.status(200).json(projects);
    }catch (error){
        console.error('Error getting projects:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

exports.getUserProjects = async(req, res) => {
    try{
        const user_id = req.query.user_id;

        const pool = await poolPromise;

        const result = await pool.request()
            .input('user_id', user_id)
            .execute('getUserProjects');

        const projects = result.recordset.map(project => {
            return {
                ...project,
                members: JSON.parse(project.members || '[]')
            };
        });

        res.status(200).json(projects);
    }catch (error){
        console.error('Error getting projects:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

exports.getProjectDetails = async (req, res) => {
    try {
        const project_id = req.query.project_id;

        const pool = await poolPromise;

        const result = await pool.request()
            .input('project_id', project_id )
            .execute('getProject');

        const project = result.recordset.map(project => {
            return {
                project,
                members: JSON.parse(project.members || '[]')
            };
        });

        res.status(200).json(project);

    } catch (error) {
        console.error('Error getting project details:', error);
        res.status(500).json({ 
            message: 'Internal Server Error', 
            error: error.message 
        });
    }
};

exports.updateProjectDetails = async (req, res) => {
    try {
        const project_id = req.query.project_id;
        const { name, description } = req.body;

        if (!name && !description) {
            return res.status(400).json({
                message: 'At least one field (name or description) must be provided.'
            });
        }

        const pool = await poolPromise;

        console.log('Executing stored procedure: updateProjectDetails');
        console.log('Parameters:', {
            project_id: project_id,
            name: name ?? null,
            description: description ?? null
        });

        await pool.request()
            .input('project_id', project_id)
            .input('name', name ?? null)
            .input('description', description ?? null)
            .execute('updateProjectDetails');

        res.status(200).json({ message: 'Project updated successfully' });

    } catch (error) {
        console.error('Error updating project:', error);

        if (error.message.includes('Project not found')) {
            return res.status(404).json({ message: error.message});
        }

        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
};


