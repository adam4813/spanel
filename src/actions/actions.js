// add item
export function addItem(name) {
  return {
    type: "ADD",
    name: name
  };
}

// remove item
export function removeItem(id) {
  return {
    type: "REMOVE",
    id: id
  };
}
