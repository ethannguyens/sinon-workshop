import Track from "../utils/tracking";

const cookie = require('./../../cookie');
import {redirect} from "./redirect";

export function post(path, data, callback) {
  const sessionId = cookie.session();

  if (!sessionId) {
      Track.track(`post ${window.location.href} posting to ${path}`);
      redirect.toBasket();
      return;
  } else {
    const httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === XMLHttpRequest.DONE && httpRequest.status === 200) {
        callback();
      }
    };
    httpRequest.open("POST", path, true);
    httpRequest.setRequestHeader("sessionId", sessionId);
    httpRequest.setRequestHeader('Content-Type', 'application/json');
    httpRequest.send(JSON.stringify(data));
  }
}
