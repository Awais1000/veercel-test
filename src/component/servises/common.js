export function getUser() {
  const user = JSON.parse(localStorage.getItem('User')) || {};
  return user;
}
export function getCart (){
  const cart = JSON.parse(localStorage.getItem('Cart')) || [];
  return cart;
}