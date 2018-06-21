import {Item} from './data.ItemClass'

export const ItemsClass = (data)=> {
  const items = [];
  if (data) {
    for (let i = 0; i < data.length; i++) {
      items.push(new Item(data[i]))
    }
  }
  return items;
};






