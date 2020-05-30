const express = require('express');
const projects = require('./project-model.js');
const router = express.Router();

router.get('/', (req, res) => {
    projects.getProjects().then(projects =>{
        res.json(projects);
    })
    .catch(err =>{
        res.status(500).json({message: 'Failed to get projects'})
    })
});
router.get('/resources', (req, res) => {
    projects.getResources().then(resources =>{
        res.json(resources)
    })
    .catch(err =>{
        res.status(500).json({message: 'Failed to get projects'})
    })
});
router.get('/tasks', (req, res) => {
    projects.getTasks().then(tasks =>{
        res.json(tasks)
    })
    .catch(err =>{
        res.status(500).json({message: 'Failed to get projects'})
    })
});
router.post('/', (req, res) => {
    const project = req.body;
    projects.addProject(project).then(response =>{
        if(response){
            res.json(response);
        } else {
            res.status(400).json({message: 'please provide valid params'})
        }
    })
    .catch(err =>{
        res.status(500).json({message: 'Failed to add project'})
    })
});
router.post('/resources', (req, res) => {
    const resource = req.body;
    projects.addResources(resource).then(resources =>{
        if(resources){
            res.json(resources);
        } else {
            res.status(400).json({message: 'please provide valid params'})
        }
    })
    .catch(err =>{
        res.status(500).json({message: 'Failed to add resources'})
    })
});

//Add a resource to a project

router.post('/:id/resources', (req,res) =>{
    const { id } = req.params;
    const resource = req.body;

    projects.addResourceToProject(resource.resource_id, id).then(resource =>{
        if(resource){
            res.json(resource);
        } else {
            res.status(400).json({message: 'please provide valid params'})
        }
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({message: 'Failed to add resource to specified project'})
    })
})


router.post('/:id/tasks', (req, res) => {
    const task = req.body;
    const { id } = req.params;
    projects.addTasks(task, id).then(task =>{
        if(task){
            res.json(task)
        } else {
            res.status(400).json({message: 'please provide valid params'})
        }
        
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({message: 'Failed to add task'})
    })
});

module.exports = router;