import API from '../api';

function deleteTask(id) {
  return API.post('/deleteTask', id).then((response) => {
    return response.data;

  }).catch(error => {
    return Promise.reject(1);
  });

}

function saveTask(task) {
  return API.post('/saveTask',
    task).then((response) => {
    return response.data;

  }).catch(error => {
    return Promise.reject(1);
  });
}

export default {
  saveTask,
  deleteTask,

}
