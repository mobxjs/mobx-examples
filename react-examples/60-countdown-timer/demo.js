var slideModelFactory = function (text, slideShow) {
	// id is not observable
	var slide = {
		id: _.uniqueId('slide_')
	};
	return mobx.extendObservable(slide, {
		// observable fields
		imageText: text,
		// computed
		get active () {
			return slideShow.activeSlide === this;
		},
		get imageMain () {
			return 'https://placeholdit.imgix.net/~text?txtsize=33&txt=' + slide.imageText + '&w=350&h=150';
		},
		get imageThumb () {
			return 'https://placeholdit.imgix.net/~text?txtsize=22&txt=' + slide.imageText + '&w=400&h=50';
		}
	});
};

var slideShowModelFactory = function (rawSlides) {
	var slideShow = mobx.observable({
		// observable array
		slides: _.map(rawSlides, function (slide) {
			return slideModelFactory(slide.text, slideShow);
		}),
		activeSlide: null,
		findSlideById: function (slideId) {
			_.find(this.slides, {id: slideId});
		},
		// actions
		setActiveSlide: mobx.action('set active slide', function (slide) {
			this.activeSlide = slide;
		})
	});
	slideShow.setActiveSlide(slideShow.slides[0]);
	return slideShow;
};

var slideShowModel = slideShowModelFactory([
	{
		text: 'Heloo!',
		active: true
	}, {
		text: 'Cool!'
	}, {
		text: 'MobX!'
	}
]);

var mainRenderer = mobxReact.observer(function (props) {
	var slides = props.slideShow.slides;
	var slideClickHandler = _.bind(props.slideShow.setActiveSlide, props.slideShow);
	return React.DOM.div({
			className: 'slideShow'
		},
		React.DOM.div({
				className: 'mainImage'
			},
			React.DOM.img({
				src: props.slideShow.activeSlide.imageMain
			})
		),
		_.map(props.slideShow.slides, function (slide) {
			return React.createElement(thumbRenderer, {
				slide: slide,
				setActiveSwatch: slideClickHandler
			});
		})
	);
});

var thumbRenderer = mobxReact.observer(React.createClass({
	render: function () {
		var slide = this.props.slide;
		return React.DOM.div({
				className: 'slide' + (slide.active ? ' active' : ''),
				onClick: this.clickHandler
			},
			React.DOM.img({
				src: slide.imageThumb
			})
		);
	},
	clickHandler: function () {
		this.props.setActiveSwatch(this.props.slide.id);
	}
}));

ReactDOM.render(React.createElement(mainRenderer, {
	slideShow: slideShowModel
}), document.getElementById('reactOutput'));