const url = "https://yuser.co/nodes.json";

export function getCards() {
  //return fetch(url)
  //.then(response => response.json())
  return require('../../data/db.json');
}