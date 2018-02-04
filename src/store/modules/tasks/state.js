import defaultTasks from '../../../data/data.tasks.json';

// localStorage.clear();

const localStorageHas = ($item)=> {

    return (localStorage && localStorage.getItem($item)) ? JSON.parse(localStorage.getItem($item)) : defaultTasks;
};

export default {
    all: localStorageHas('tasks'),
}
