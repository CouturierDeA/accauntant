import defaultTasks from '../../../data/data.tasks';

const localStorageHas = ($item)=> {
    return (localStorage && localStorage.getItem($item)) ? JSON.parse(localStorage.getItem($item)) : defaultTasks;
};
// localStorage.clear();

export default {
    all: localStorageHas('tasks'),
}
