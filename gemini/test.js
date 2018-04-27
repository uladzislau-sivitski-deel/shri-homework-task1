gemini.suite('test', (suite) => {
	suite.setUrl('/shri-homework-task1/')
		.setCaptureElements(['.card', '.header'])
		.before(function(actions, find) {
			actions.setWindowSize(2000, 1080);
			actions.waitForElementToShow('.card', 2000);
			this.card = find('.card');
			this.header = find('.header');
			actions.mouseMove(this.header);
			
		})
		.capture('Loaded page header for desktop')
		.capture('Loaded page header for medium desktop', function(actions) {
			actions.setWindowSize(1500, 800);
		})
		.capture('Card hovered', function(actions, find) {
			actions.mouseMove(this.card);
		})
		.capture('Open modal', function(actions, find) {
			actions.mouseDown(this.card);				
			actions.mouseUp(this.card);				
		})
		.capture('Close modal', function(actions, find) {
			const close = find('.modal__close');
			actions.mouseMove(close);			
			actions.mouseDown(close);				
			actions.mouseUp(close);				
		})
		.capture('Loaded page header for small desktop', function(actions, find) {
			actions.mouseMove(this.header);			
			actions.setWindowSize(1080, 700);
		})
		.capture('Loaded page header for portrait mobile', function(actions) {
			actions.setWindowSize(700, 1200);
		})
		.capture('Open modal portrait mobile', function(actions, find) {
			actions.mouseDown(this.card);				
			actions.mouseUp(this.card);				
		})
		.capture('Close modal portrait mobile', function(actions, find) {
			const close = find('.modal__close');
			actions.mouseMove(close);			
			actions.mouseDown(close);				
			actions.mouseUp(close);				
		})
		.capture('Loaded page header for landscape mobile', function(actions) {
			actions.setWindowSize(900, 700);
		})
		.capture('Open modal landscape mobile', function(actions, find) {
			actions.mouseDown(this.card);				
			actions.mouseUp(this.card);				
		})
		.capture('Close modal landscape mobile', function(actions, find) {
			const close = find('.modal__close');
			actions.mouseMove(close);			
			actions.mouseDown(close);				
			actions.mouseUp(close);				
		})
});