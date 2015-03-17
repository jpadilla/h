class AuthController
  this.$inject = ['$scope', '$timeout', 'session', 'toastr', 'formHelpers']
  constructor:   ( $scope,   $timeout,   session,   toastr,   formHelpers ) ->
    timeout = null

    success = (data) ->
      if data.userid
        $scope.$emit 'auth', null, data

      $scope.account.tab =
        switch $scope.account.tab
          when 'register' then 'login'
          when 'forgot_password' then 'reset_password'
          when 'reset_password' then 'login'
          else $scope.account.tab

      angular.copy {}, $scope.model
      $scope.form?.$setPristine()

    failure = (form, response) ->
      {errors, reason} = response.data
      formHelpers.applyValidationErrors(form, errors, reason)

    this.submit = (form) ->
      formHelpers.applyValidationErrors(form)
      return unless form.$valid

      $scope.$broadcast 'formState', form.$name, 'loading'
      session[form.$name] $scope.model, success,
        angular.bind(this, failure, form)
      .$promise.finally -> $scope.$broadcast 'formState', form.$name, ''

    $scope.account ?= tab: 'login'
    $scope.model ?= {}

    $scope.$on 'auth', do ->
      preventCancel = $scope.$on '$destroy', ->
        if timeout then $timeout.cancel timeout
        $scope.$emit 'auth', 'cancel'

    $scope.$watchCollection 'model', (value) ->
      # Reset the auth forms after five minutes of inactivity
      if timeout
        $timeout.cancel timeout

      # If the model is not empty, start the timeout
      if value and not angular.equals(value, {})
        timeout = $timeout ->
          angular.copy {}, $scope.model
          $scope.form?.$setPristine()
          toastr.info(
            'For your security, the forms have been reset due to inactivity.'
          )
        , 300000


angular.module('h')
.controller('AuthController', AuthController)
