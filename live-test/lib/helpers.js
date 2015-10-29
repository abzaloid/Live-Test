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
var clock = 2 * 60 * 60 + 30 * 60;

Meteor.methods({
        getServerTime: function (uid) {
        	if (!LifeTime.findOne({uid: uid})) {
        		LifeTime.insert({
        			uid: uid,
        			startTime: new Date(),
        		});
                // lf = LifeTime.findOne({uid: Meteor.userId()}).startTime;
                // clock += lf.getTime() / 1000;
        	}
            // console.log(clock);
            var _time = (clock + LifeTime.findOne({uid: uid}).startTime.getTime() / 1000) - new Date().getTime() / 1000;
            // console.log(_time);
            return _time;
        }
    });