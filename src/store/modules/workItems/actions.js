import API from '../../../api';
import DataBus from '../../../data/data.bus'

function getTasks(store) {
  return API.post('/getTasks').then((response) => {
    store.commit('workItems', response.data);

    return response.data;
  }).catch((e) => {
    console.warn(e);
    return Promise.reject(1);
  });
}

function deleteTask(store, name) {

  return API.post('/deleteTask',
    {name}
  ).then((response) => {
    store.dispatch('getTasks').then(rep => {
      DataBus.$message({
        type: 'success',
        message: 'Delete completed'
      });
      return response.data;
    }).catch(error=>{
      console.error('error', error);
      return Promise.reject(error);
    })


  }).catch(error => {
    console.error('error', error)
    return Promise.reject(1);
  });

}

function saveTask(store, task) {
  return API.post('/saveTask',
    task).then((response) => {
    if (response) {
      store.dispatch('getTasks').then(rep => {
        DataBus.$message({
          type: 'success',
          message: 'Items updated'
        });
      })

    } else {
      DataBus.$message({
        type: 'error',
        message: 'Something went wrong...'
      });
    }
    return response.data;

  }).catch(error => {
    DataBus.$message({
      type: 'error',
      message: error
    });
    return Promise.reject(1);
  });
}

export default {
  getTasks,
  saveTask,
  deleteTask,
};
