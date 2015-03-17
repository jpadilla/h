{module, inject} = require('angular-mock')

assert = chai.assert
sinon.assert.expose assert, prefix: null


describe 'h.session', ->
  fakeDocument = null
  fakeToastr = null
  fakeXsrf = null
  sandbox = null

  before ->
    angular.module('h.session', ['ngResource'])
    require('../session-service')

  beforeEach module('h.session')

  beforeEach module ($provide, sessionProvider) ->
    sandbox = sinon.sandbox.create()

    fakeToastr = error: sandbox.spy()
    fakeDocument = {prop: -> '/session'}
    fakeXsrf = {token: 'faketoken'}

    $provide.value '$document', fakeDocument
    $provide.value 'toastr', fakeToastr
    $provide.value 'xsrf', fakeXsrf

    sessionProvider.actions =
      login:
        url: '/login'
        method: 'POST'

    return

  afterEach ->
    sandbox.restore()

  describe 'sessionService', ->
    $httpBackend = null
    session = null

    beforeEach inject (_$httpBackend_, _session_) ->
      $httpBackend = _$httpBackend_
      session = _session_

    describe '#<action>()', ->
      url = '/login'

      it 'should send an HTTP POST to the action', ->
        $httpBackend.expectPOST(url, code: 123).respond({})
        result = session.login(code: 123)
        $httpBackend.flush()

      it 'should invoke the toastr service with any flash messages', ->
        response =
          flash:
            error: ['fail']
        $httpBackend.expectPOST(url).respond(response)
        result = session.login({})
        $httpBackend.flush()
        assert.calledWith fakeToastr.error, 'fail'

      it 'should assign errors and status reasons to the model', ->
        response =
          model:
            userid: 'alice'
          errors:
            password: 'missing'
          reason: 'bad credentials'
        $httpBackend.expectPOST(url).respond(response)
        result = session.login({})
        $httpBackend.flush()
        assert.match result, response.model, 'the model is present'
        assert.match result.errors, response.errors, 'the errors are present'
        assert.match result.reason, response.reason, 'the reason is present'

      it 'should capture and send the xsrf token', ->
        token = 'deadbeef'
        headers =
          'Accept': 'application/json, text/plain, */*'
          'Content-Type': 'application/json;charset=utf-8'
          'X-XSRF-TOKEN': token
        model = {csrf: token}
        request = $httpBackend.expectPOST(url).respond({model})
        result = session.login({})
        $httpBackend.flush()
        assert.equal fakeXsrf.token, token

        $httpBackend.expectPOST(url, {}, headers).respond({})
        session.login({})
        $httpBackend.flush()
