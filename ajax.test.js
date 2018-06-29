const sinon = require('sinon');
const cookie = require('./../../cookie');
import Track from "../utils/tracking";
import {redirect} from "./redirect";


import {post} from './ajax';

describe.only('ajax', () => {
  let sandbox;

  beforeEach((done) => {
    sandbox = sinon.sandbox.create();
    done();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should always supply the path, data, and the callback', () => {
    //Arrange
    const path = "https://localhost";
    const data = {addressId: 1001};
    const callback = () => {};

    const spiedPost = sandbox.spy(post);

    //Act
    spiedPost(path, data, callback);

    //Asert
    sinon.assert.calledWith(spiedPost, path, data, callback );
  });

  it('should call cookie to get session', () => {
    //Arrange
    const path = "https://localhost";
    const data = {addressId: 1001};
    const callback = () => {};

    sandbox.spy(cookie, 'session');

    //Act
    post(path, data, callback);

    //Assert
    sinon.assert.calledOnce(cookie.session);
  });

  it('should not callback if the post is failed', () => {
    //Arrange
    const path = "https://localhost";
    const data = {addressId: 1001};
    const callback = sinon.spy;

    //Act
    post(path, data, callback);

    //Assert
    sinon.assert.notCalled(callback);

  });

  it('should redirect to basket page and not callback if there is no session found', () => {
    //Arrange
    const path = "https://localhost";
    const data = {addressId: 1001};
    const callback = sinon.spy;
    sandbox.stub(cookie, "session");
    cookie.session = () => false;

    sandbox.stub(redirect, 'toBasket');
    redirect.toBasket = () => {};
    sandbox.spy(redirect, 'toBasket');

    //Act
    post(path, data, callback);

    //Assert
    sinon.assert.calledOnce(redirect.toBasket);
    sinon.assert.notCalled(callback);
  });

  it('should redirect to basket page and not callback if there is no session found using MOCK', () => {
    //Arrange
    const path = "https://localhost";
    const data = {addressId: 1001};
    const callback = sinon.spy;
    sandbox.stub(cookie, "session");
    cookie.session = () => false;

    let mockedTrack = sandbox.mock(Track);
    mockedTrack.expects('track').once().withArgs(`post ${window.location.href} posting to ${path}`);

    //Act
    post(path, data, callback);

    //Assert
    mockedTrack.verify();
  });

  it('should callback if the post is success', () => {
    //Advanced fake XHR request not cover
  })

});