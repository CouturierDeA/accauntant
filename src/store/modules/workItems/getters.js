export function totalCount(state) {
  return state.workItems.length;
}

export function workItems(state) {
  const items = state.workItems;
  let pricesNames = [];
  const summary = {
    count: 0,
    price: 0,
    number: 0,
    prices: {},
    items: []
  };
  for (let i = 0; i < items.length; i++) {
    let item = items[i];

    if (item.name.match(state.searchInput)) {
      const price = items[i].price;
      const quantity = items[i].number;
      const itemQuantityPrice =  quantity * price;

      summary.number += quantity;
      summary.price += itemQuantityPrice;

      if (price) {
        const priceName = `${price}`;

        if (pricesNames.indexOf(priceName) === -1) {
          pricesNames.push(priceName);
          summary.prices[priceName] = {total_price: itemQuantityPrice, total_items: quantity};
        } else {
          summary.prices[priceName].total_price += itemQuantityPrice;
          summary.prices[priceName].total_items += quantity
        }
      }
      summary.items.push(item);
    }
  }
  state.summary = summary;
  return summary.items
}

export default {
  workItems,
  totalCount,
};
