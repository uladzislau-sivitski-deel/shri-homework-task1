gemini.suite('test', (suite) => {
	suite.setUrl('/shri-homework-task1/')
			.setCaptureElements('.view')
			.capture('plain')
			.capture('loaded', function(actions) {
				actions.wait(2000);
		});
});