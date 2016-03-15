angular

.module('cardCast.services', [])

.factory('scaleCard', function() {
	return function () {
		var scale = $('.card').parent().width() / 336;

		$('.card').css({
			'zoom': scale
			// '-webkit-transform'	: 'scale(' + scale + ')',
			// '-moz-transform'	: 'scale(' + scale + ')',
			// '-ms-transform'		: 'scale(' + scale + ')',
			// '-o-transform'		: 'scale(' + scale + ')',
			// 'transform'			: 'scale(' + scale + ')'
		});
	};;
})

.factory('AJAX', ['$http', function ($http) {
	var url = 'http://cardcast.ourdevhost.com/logic/';

	return {
		post: function (data) {
			return $http.post(url, data);
		},
		postFile: function (data) {
			return $http.post(url, data, {
				headers: { 'Content-Type': undefined },
				transformRequest: angular.identity
			});
		}
	}
}])

.factory('fileReader', ['$q', function ($q) {
	var onLoad = function (reader, deferred, scope) {
		return function () {
			scope.$apply(function () {
				deferred.resolve(reader.result);
			});
		};
	};

	var onError = function (reader, deferred, scope) {
		return function () {
			scope.$apply(function () {
				deferred.reject(reader.result);
			});
		};
	};

	var onProgress = function (reader, scope) {
		return function (event) {
			scope.$broadcast('fileProgress', {
				total: event.total,
				loaded: event.loaded
			});
		};
	};

	var getReader = function(deferred, scope) {
		var reader = new FileReader();

		reader.onload = onLoad(reader, deferred, scope);
		reader.onerror = onError(reader, deferred, scope);
		reader.onprogress = onProgress(reader, scope);

		return reader;
	};
 
	var readAsDataURL = function (file, scope) {
		var deferred = $q.defer();
		var reader = getReader(deferred, scope);

		reader.readAsDataURL(file);
		 
		return deferred.promise;
	};

	return {
		readAsDataUrl: readAsDataURL  
	};
}])

.factory('alerts', [function () {
	return function (notifications) {
		var alerts = {
			request: {},
			share: {},
			requestNoAnswerCount: 0,
			shareNoAnswerCount: 0,
			noReadCount: 0,
			min: 999999999,
			max: 0
		};

		angular.forEach(notifications, function (alert) {
			if(alert.isRead == 0) {
				alerts.noReadCount++;
			}

			if(parseInt(alert.id) < alerts.min) {
				alerts.min = alert.id;
			}

			if(parseInt(alert.id) > alerts.max) {
				alerts.max = alert.id;
			}

			if(alert.type == 'cardRequest' || alert.type == 'cardRequestAccepted' || alert.type == 'cardRequestRejected') {
				alerts['request'][alert.id] = alert;

				if(alert.type == 'cardRequest' && alert.isAnswer == 0) {
					alerts.requestNoAnswerCount++;
				}
			} else if(alert.type == 'shareFromMyCards' || alert.type == 'shareFromMyCardsAccepted' || alert.type == 'shareFromMyCardsRejected') {
				alerts['share'][alert.id] = alert;

				if(alert.type == 'shareFromMyCards' && alert.isAnswer == 0) {
					alerts.requestNoAnswerCount++;
				}
			}
		});

		return alerts;
	};
}]);