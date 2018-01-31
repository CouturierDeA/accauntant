import defaultTasks from '../../../data/data.tasks';

function localStorageHas($item) {
    return localStorage ? (localStorage.getItem($item)? JSON.parse(localStorage.getItem($item)) : defaultTasks) : defaultTasks;
}

export default {
    all: localStorageHas('tasks'),
}
