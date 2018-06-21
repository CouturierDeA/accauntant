import Utils from 'src/utils/util'

export function add(state, user) {
  state.all.push(user);
}

export function setAuthorized(state, user) {
  if (user === null) {
    Utils.deleteCookie('Authorized','/');

  } else {
    if (user.password) {
      delete user.password;
    }
    const date = new Date;
    date.setDate(date.getDate() + 2);
    // Utils.setCookieValue('Authorized', user, date, '/');
    Utils.setCookieValue('Authorized', user, null, '/')
  }

  state.authorized = user
}

export function setList(state, users) {
  state.all = users;
}

export default {
  add,
  setAuthorized,
  setList,
};
