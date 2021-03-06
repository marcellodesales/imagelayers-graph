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
        var position = element.position(),
            speed = 400;

        scope.bindEvents = function(menu) {
          menu.bind('mouseover', function() {
              scope.menuActive = true;
          });
          menu.bind('mouseleave', function() {
            scope.menuActive = false;
            scope.hideMenu(menu);
          });
        };

        scope.unbindEvents = function(menu) {
          menu.unbind('mouseover');
          menu.unbind('mouseleave');
        };

        scope.showMenu = function(aboutMenu) {
          if (!scope.menuVisible) {
            scope.bindEvents(aboutMenu);

            aboutMenu.css('display', 'block');
            aboutMenu.animate({
              'top': 59 + 'px',
              'opacity': 1
            }, speed, function() {
              scope.menuVisible = true;
            });
          }
        };

        scope.hideMenu = function(aboutMenu) {
          if (scope.menuVisible && !scope.menuActive) {
            scope.unbindEvents(aboutMenu);

            aboutMenu.animate({
              'top': (position.top + 90) + 'px',
              'opacity': 0
            }, speed, function() { 
              aboutMenu.css('display','none'); 
              scope.menuVisible = false;
            });
          }
        };

        scope.menuVisible = false;
        scope.menuActive = false;

        element.bind('mouseover', function() {
          var aboutMenu = $('div.about');
          scope.showMenu(aboutMenu);
        });

        element.bind('mouseleave', function() {
          var aboutMenu = $('div.about');
          $timeout(function() {
            scope.hideMenu(aboutMenu);
          }, 120);
        });
      } 
    };
  }
})();
