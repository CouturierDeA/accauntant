import TasksApi from '../../../api/Tasks';

function fetchAll(store) {
    return TasksApi.getAll().then((tasks) => {
        store.commit('setTasks', tasks);

        return tasks;
    });
}

function updateAll(store, tasks) {

    return TasksApi.updateAll(tasks)
        .then((task) => {
            store.commit('setAuthorized', task);
            return task;
        });
}

function resetAuthorization(store,) {
    store.commit('setAuthorized', null);
}


export default {
    fetchAll,
    updateAll,
};
