angular

.module('cardCast.filters', [])

.filter('orderObjectBy', function () {
	return function(items, field, reverse) {
		var filtered = [];

		angular.forEach(items, function (item) {
			filtered.push(item);
		});

		filtered.sort(function (a, b) {
			return (parseInt(a[field]) > parseInt(b[field]) ? 1 : -1);
		});

		if(reverse) filtered.reverse();

		return filtered;
	};
})

.filter('alertsFilter', function() {
	return function(alerts, type) {
		var filtered = {};

		angular.forEach(alerts, function (alert) {
			if(type == 'request') {
				if(alert.type == 'cardRequest' || alert.type == 'cardRequestAccepted' || alert.type == 'cardRequestRejected') {
					filtered[alert.id] = alert;
				}
			} else if(type == 'share') {
				if(alert.type == 'shareFromMyCards' || alert.type == 'shareFromMyCardsAccepted' || alert.type == 'shareFromMyCardsRejected') {
					filtered[alert.id] = alert;
				}
			}
		});

		return filtered;
	};
})

.filter('alertsFilterAnswer', function() {
	return function(alerts, type) {
		var count = 0;

		angular.forEach(alerts, function (alert) {
			if(type == 'request') {
				if(alert.type == 'cardRequest') {
					if(alert.isAnswer == 0) {
						count++;
					}
				}
			} else if(type == 'share') {
				if(alert.type == 'shareFromMyCards') {
					if(alert.isAnswer == 0) {
						count++;
					}
				}
			}
		});

		return count;
	};
});