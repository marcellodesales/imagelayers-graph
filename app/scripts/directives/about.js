(function() {
  'use strict';

  /**
   * @ngdoc directive
   * @name iLayers.directive:about
   * @description
   * # about
   */
  angular.module('iLayers')
    .directive('about', About);

  About.$inject = ['$timeout', '$templateRequest'];

  function About($timeout, $templateRequest) {
    return {
      restrict: 'A',
      scope: {},
      controller: function() {
        $templateRequest('views/about-menu.html');
      },
      link: function postLink(scope, element) {
        var main = element.closest('main'),
            headerHeight = $('header').height();

        scope.menuVisible = false;

        element.bind('click', function() {
          var aboutMenu = $('ul.about');
          aboutMenu.slideToggle();
          scope.menuVisible = !scope.menuVisible;
        });

        scope.toggleMenu = function(aboutMenu) {
          aboutMenu.slideToggle();
          scope.menuVisible = !scope.menuVisible;
        };

          main.bind('scroll', function () {
          if (scope.menuVisible) {
            if (headerHeight < $('main').scrollTop()) {
              var aboutMenu = $('ul.about');
              scope.toggleMenu(aboutMenu);
            }
          }
        })
      } 
    };
  }
})();
