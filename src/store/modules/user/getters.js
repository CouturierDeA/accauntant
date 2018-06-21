import Utils from "src/utils/util";

export function authorized(state) {
  const cookieAuth = Utils.getCookieValue('Authorized');
  return state.authorized || cookieAuth ? (state.authorized = Utils.getCookieValue('Authorized')): null;
}

export default {
  authorized,
};
