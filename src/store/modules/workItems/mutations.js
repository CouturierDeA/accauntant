import {ItemsClass} from '../../../data/data.items'

export function add(state, item) {
  state.all.push(item);
}

export function workItems(state, workItems) {
  state.workItems = new ItemsClass(workItems);
}

export default {
  add,
  workItems,
};
