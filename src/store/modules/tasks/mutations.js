export function add(state, task) {
    state.all.push(task);
}

function updateLocalStorage(item_name,item) {
    if (localStorage) {
        localStorage.setItem(item_name, JSON.stringify(item));
    }
}

export function setTasks(state, tasks) {
    state.all = tasks;
    updateLocalStorage('tasks',tasks);
}

export default {
    add,
    setTasks,
};
