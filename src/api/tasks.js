import API from '../api';

function getAll() {
    return API.get('/tasks').then((response) => {
        return response.data;
    });
}

function updateAll(tasks) {
    return API.post('/update_tasks', tasks)
        .then((response) => {
            const tasks = response.data;
            console.log(user);

            if (tasks.length === 0) {
                return Promise.reject(1);
            }

            return tasks;

        }).catch(error => {
            return Promise.reject(1);
        });
}

export default {
    getAll,
    updateAll,

}
