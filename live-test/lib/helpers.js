UI.registerHelper('formatDateFromNow', function(date) {
	return moment(date).fromNow();
});
UI.registerHelper('formatDate', function(date) {
	return moment().startOf('day').seconds(date).format('H:mm:ss');
});

UI.registerHelper("isNotNull", function(value) {
  return value !== null;
});

UI.registerHelper("inc", function (value) {
    return value + 1;
});

var lf = null;
var clock = 210 * 60;

Meteor.methods({
        getServerTime: function (uid, test_id) {
        	if (!LifeTime.findOne({uid: uid})) {
        		LifeTime.insert({
        			uid: uid,
        			startTime: new Date(),
                    test_id: test_id,
        		});
        	}
            var _time = (clock + LifeTime.findOne({uid: uid, test_id}).startTime.getTime() / 1000) - new Date().getTime() / 1000;
            return _time;
        }
    });