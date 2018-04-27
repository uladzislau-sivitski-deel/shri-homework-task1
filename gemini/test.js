gemini.suite('test', (suite) => {
	suite.setUrl('/shri-homework-task1/')
		.setCaptureElements(['.card', '.header'])
		.before(function(actions, find) {
			actions.setWindowSize(2000, 1080);
			actions.waitForElementToShow('.card', 2000);
		})
		.capture('Loaded page header for desktop')
		.capture('Loaded page header for medium desktop', function(actions) {
			actions.setWindowSize(1500, 800);
		})
		.capture('Loaded page header for small desktop', function(actions) {
			actions.setWindowSize(1080, 700);
		})
		.capture('Loaded page header for portrait mobile', function(actions) {
			actions.setWindowSize(700, 1000);
		})
		.capture('Loaded page header for landscape mobile', function(actions) {
			actions.setWindowSize(900, 700);
		});
});