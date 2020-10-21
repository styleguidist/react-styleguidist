module.exports = function () {
	return {
		name: 'goatcounter-plugin',
		injectHtmlTags() {
			return {
				headTags: [
					`<script>
if ('history' in window) {
	function trackView() {
		if ('goatcounter' in window) {
			window.goatcounter.count({
				path: location.pathname + location.search,
			});
		}
	}

	// Monkey patch browser pushState
	const pushState = history.pushState;
	history.pushState = function() {
		const returnValue = pushState.apply(history, arguments);
		trackView();
 		return returnValue;
	}
}
					</script>`,
					{
						tagName: 'script',
						attributes: {
							'data-goatcounter': 'https://react-styleguidist.goatcounter.com/count',
							async: true,
							src: '//gc.zgo.at/count.js',
						},
					},
				],
			};
		},
	};
};
