{module, inject} = require('angular-mock')

assert = chai.assert


describe 'h:directives', ->
  before ->
    angular.module('h', [])
    require('../directives')

  beforeEach module('h')

  describe '.match', ->
    $compile = null
    $element = null
    $isolateScope = null
    $scope = null

    beforeEach inject (_$compile_, _$rootScope_) ->
      $compile = _$compile_
      $scope = _$rootScope_.$new()

    beforeEach ->
      $scope.model = {a: 1, b: 1}

      $element = $compile('<input name="confirmation" ng-model="model.b" match="model.a" />')($scope)
      $isolateScope = $element.isolateScope()
      $scope.$digest()

    it 'is valid if both properties have the same value', ->
      controller = $element.controller('ngModel')
      assert.isFalse(controller.$error.match)

    it 'is invalid if the local property differs', ->
      $isolateScope.match = 2
      $isolateScope.$digest()

      controller = $element.controller('ngModel')
      assert.isTrue(controller.$error.match)

    it 'is invalid if the matched property differs', ->
      $scope.model.a = 2
      $scope.$digest()

      controller = $element.controller('ngModel')
      assert.isTrue(controller.$error.match)

    it 'is invalid if the input itself is changed', ->
      $element.val('2').trigger('input').keyup()
      $scope.$digest()

      controller = $element.controller('ngModel')
      assert.isTrue(controller.$error.match)
