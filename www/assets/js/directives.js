angular

.module('cardCast.directives', [])

.directive('ngFileSelect', function () {
	return {
		link: function($scope, el) {
			el.bind('change', function (e) {
				$scope.getFile(el[0].files[0]);
			});
		}
	}
})