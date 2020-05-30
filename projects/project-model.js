const db = require('../data/dbConfig.js');


module.exports = {
    getProjects,
    getResources,
    getTasks,
    addProject,
    addResources,
    addResourceToProject,
    addTasks,
} 


function getProjects(){
     return db('projects')

}
function getResources(){
    return db('resources');
}
function getTasks(){
    return db
    .select('projects.project_description', 'projects.project_name', 'tasks.notes', 'tasks.task_description', 'tasks.task_completed')
    .from('tasks')
    .join('projects', 'projects.id', '=', 'tasks.project_id')
    .then(response =>{
        response.forEach(task =>{
            task.task_completed = !!task.task_completed;
        })
        return response;
    })
}
function addProject(project){
    return db('projects').insert(project)
    .then(response =>{
        return response;
    })
    .catch(err =>{
        console.log(err);
        return null;
    })
}
function addResources(resource){
    return db('resources').insert(resource)
    .then(response =>{
        return response;
    })
    .catch(err =>{
        console.log(err);
        return null;
    })
}

// add resource to a project

function addResourceToProject(resource_id, project_id){
    return db('resource_detail').insert({project_id: project_id, resource_id: resource_id })
    .then(response =>{
        return response;
    })
    .catch(err =>{
        console.log(err);
        return null;
    })
}
////


function addTasks(task, id){
    return db('tasks').insert({...task, project_id:id})
    .then(response =>{
        console.log(response)
        return response;
    })
    .catch(err =>{
        console.log(err);
        return null;
    })
}

