(function() {
  'use strict';

  /**
   * @ngdoc directive
   * @name iLayers.directive:sticky
   * @description
   * # sticky
   */
  angular.module('iLayers')
    .directive('sticky', Sticky); 

  function Sticky() {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        var main = element.closest('main'),
            offset = (attrs.offset) ? attrs.offset : 0;

        main.bind('scroll', function() {
          if (main.scrollTop() >= offset) {
            element.addClass('sticky');
          } else {
            element.removeClass('sticky');
          }
        });
      }
    };
  }
})();
