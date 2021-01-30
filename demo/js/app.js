/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/demo.js","chunk-vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/SliderFrame.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/SliderFrame.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scss_vue_dynamic_slider_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/vue-dynamic-slider.scss */ \"./src/scss/vue-dynamic-slider.scss\");\n/* harmony import */ var _scss_vue_dynamic_slider_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_scss_vue_dynamic_slider_scss__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _utils_range_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/range-util */ \"./src/components/utils/range-util.js\");\n/* harmony import */ var _utils_scroll__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/scroll */ \"./src/components/utils/scroll.js\");\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  props: {\n    /**\n     * The number of slides to show at a time\n     */\n    slidesPerView: {\n      type: Number,\n      default: 5\n    },\n\n    /**\n     * True to enable infinite scrolling\n     */\n    infiniteScroll: {\n      type: Boolean,\n      default: false\n    },\n\n    /**\n     * The breakpoints to change slides per view\n     * @see breakpoint-mixin.js\n     */\n    breakpoints: {\n      type: Object,\n      default: null\n    },\n\n    /**\n     * Override for the scrolling function.\n     * @see easeOutCubic\n     */\n    scrollingFunction: {\n      type: Function,\n      default: _utils_scroll__WEBPACK_IMPORTED_MODULE_2__[\"easeOutCubic\"]\n    }\n  },\n  data: function data() {\n    return {\n      activeIndex: 0,\n      totalSlides: 0,\n      currentSlidesPerView: this.slidesPerView\n    };\n  },\n  provide: function provide() {\n    var _this = this;\n\n    var props = {};\n    Object.defineProperty(props, 'slidesPerView', {\n      enumerable: true,\n      get: function get() {\n        return _this.slidesPerView;\n      },\n      set: function set(slidesPerView) {\n        _this.slidesPerView = slidesPerView;\n      }\n    });\n    Object.defineProperty(props, 'currentSlidesPerView', {\n      enumerable: true,\n      get: function get() {\n        return _this.currentSlidesPerView;\n      },\n      set: function set(currentSlidesPerView) {\n        _this.currentSlidesPerView = currentSlidesPerView;\n      }\n    });\n    Object.defineProperty(props, 'activeIndex', {\n      enumerable: true,\n      get: function get() {\n        return _this.activeIndex;\n      },\n      set: this.setActiveIndex\n    });\n    Object.defineProperty(props, 'totalSlides', {\n      enumerable: true,\n      get: function get() {\n        return _this.totalSlides;\n      },\n      set: function set(totalSlides) {\n        _this.totalSlides = totalSlides;\n      }\n    }); // Read-only\n\n    Object.defineProperty(props, 'infiniteScroll', {\n      enumerable: true,\n      get: function get() {\n        return _this.shouldInfiniteScroll;\n      }\n    });\n    Object.defineProperty(props, 'breakpoints', {\n      enumerable: true,\n      get: function get() {\n        return _this.breakpoints;\n      }\n    });\n    Object.defineProperty(props, 'scrollingFunction', {\n      enumerable: true,\n      get: function get() {\n        return _this.scrollingFunction;\n      }\n    });\n    return {\n      props: props\n    };\n  },\n  computed: {\n    canScrollNext: function canScrollNext() {\n      return this.shouldInfiniteScroll || this.activeIndex < this.totalSlides - 1;\n    },\n    canScrollPrev: function canScrollPrev() {\n      return this.shouldInfiniteScroll || this.activeIndex > 0;\n    },\n    shouldInfiniteScroll: function shouldInfiniteScroll() {\n      return this.infiniteScroll && this.totalSlides > this.currentSlidesPerView;\n    }\n  },\n  watch: {\n    activeIndex: function activeIndex(_activeIndex) {\n      this.$emit('change', _activeIndex);\n    }\n  },\n  methods: {\n    goToIndex: function goToIndex(index) {\n      this.activeIndex = index;\n    },\n    next: function next() {\n      if (this.canScrollNext) {\n        this.activeIndex++;\n      }\n    },\n    prev: function prev() {\n      if (this.canScrollPrev) {\n        this.activeIndex--;\n      }\n    },\n    setActiveIndex: function setActiveIndex(activeIndex) {\n      if (this.shouldInfiniteScroll) {\n        // TODO first scroll to slide outside of range, then update offset to absolute\n        this.activeIndex = activeIndex % this.totalSlides;\n      } else {\n        this.activeIndex = Object(_utils_range_util__WEBPACK_IMPORTED_MODULE_1__[\"keepInRange\"])(activeIndex, 0, this.totalSlides - 1);\n      }\n    }\n  },\n  render: function render() {\n    return this.$scopedSlots.default({\n      // Data\n\n      /** The current slide */\n      activeIndex: this.activeIndex,\n\n      /** Whether or not there is a next slide to scroll to */\n      canScrollNext: this.canScrollNext,\n\n      /** Whether or not there is a previous slide to scroll to */\n      canScrollPrev: this.canScrollPrev,\n      // Methods\n\n      /** Function to scroll to the given slide */\n      scrollToSlide: this.goToIndex,\n\n      /** Function to scroll to the next slide */\n      next: this.next,\n\n      /** Function to scroll to the previous slide */\n      prev: this.prev\n    });\n  }\n});\n\n//# sourceURL=webpack:///./src/components/SliderFrame.vue?./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/SliderSlide.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/SliderSlide.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'SliderSlide',\n  props: {\n    slideClass: {\n      type: [String, Object, Array],\n      default: 'dynamic-slider-slide'\n    }\n  },\n  data: function data() {\n    return {\n      active: true\n    };\n  },\n  inject: ['props'],\n  computed: {\n    widthPercent: function widthPercent() {\n      return 100 / this.props.currentSlidesPerView + '%';\n    }\n  }\n});\n\n//# sourceURL=webpack:///./src/components/SliderSlide.vue?./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/SliderSlides.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/SliderSlides.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_vue_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/vue-util */ \"./src/components/utils/vue-util.js\");\n/* harmony import */ var _utils_throttle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/throttle */ \"./src/components/utils/throttle.js\");\n/* harmony import */ var _utils_mutations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/mutations */ \"./src/components/utils/mutations.js\");\n/* harmony import */ var _mixins_scrollable_mixin__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mixins/scrollable-mixin */ \"./src/components/mixins/scrollable-mixin.js\");\n/* harmony import */ var _mixins_draggable_mixin__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mixins/draggable-mixin */ \"./src/components/mixins/draggable-mixin.js\");\n/* harmony import */ var _mixins_breakpoint_mixin__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./mixins/breakpoint-mixin */ \"./src/components/mixins/breakpoint-mixin.js\");\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && Symbol.iterator in Object(iter)) return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\n\n\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'SliderSlides',\n  mixins: [_mixins_scrollable_mixin__WEBPACK_IMPORTED_MODULE_3__[\"default\"], _mixins_draggable_mixin__WEBPACK_IMPORTED_MODULE_4__[\"default\"], _mixins_breakpoint_mixin__WEBPACK_IMPORTED_MODULE_5__[\"default\"]],\n  data: function data() {\n    return {\n      elementWidth: -1,\n      currentOffset: 0,\n      scrollPercentage: 0,\n      observer: null\n    };\n  },\n  inject: ['props'],\n  computed: {\n    duplicateRightStart: function duplicateRightStart() {\n      return this.totalWidth * -2;\n    },\n    slideWidth: function slideWidth() {\n      return this.elementWidth / this.props.currentSlidesPerView;\n    },\n    totalWidth: function totalWidth() {\n      return this.slideWidth * this.props.totalSlides;\n    },\n\n    /**\n     * On infinite scroll, with 5 slides 100px wide, index 3 would normally be -300 offset,\n     * but since there's duplicate slides, that should really be -800 offset (5*100)\n     */\n    slideOffsetModifier: function slideOffsetModifier() {\n      if (this.props.infiniteScroll) {\n        return -this.totalWidth;\n      }\n\n      return 0;\n    }\n  },\n  render: function render(createElement) {\n    var slides = [this.$slots.default];\n    this.props.totalSlides = this.$slots.default.length; // Duplicate slides for infinite sliding, but only if there's more slides than in view\n\n    if (this.props.infiniteScroll) {\n      slides.unshift.apply(slides, _toConsumableArray(Object(_utils_vue_util__WEBPACK_IMPORTED_MODULE_0__[\"deepClone\"])(this.$slots.default, createElement, 'prevDup')));\n      slides.push.apply(slides, _toConsumableArray(Object(_utils_vue_util__WEBPACK_IMPORTED_MODULE_0__[\"deepClone\"])(this.$slots.default, createElement, 'nextDup')));\n    }\n\n    return createElement('div', {\n      class: 'dynamic-slider'\n    }, [createElement('div', {\n      class: 'dynamic-slider-slides',\n      style: \"left: \".concat(this.currentOffset, \"px\"),\n      // Add a \"capture\" click listener https://vuejs.org/v2/guide/render-function.html#Event-amp-Key-Modifiers\n      on: {\n        '!click': this.cancelClicks\n      }\n    }, slides)]);\n  },\n  mounted: function mounted() {\n    window.addEventListener('scroll', this.updateWidth);\n    window.addEventListener('resize', this.updateWidth);\n    window.addEventListener('resize', this.updateOffsetToBeAbsolute); // Add a new mutation observer to update the width on DOM changes\n    // TODO look into the efficiency of this\n\n    this.observer = new MutationObserver(Object(_utils_throttle__WEBPACK_IMPORTED_MODULE_1__[\"throttle\"])(this.mutationObserverCallback, 20));\n    this.observer.observe(this.$el, {\n      attributes: true,\n      childList: true,\n      subtree: true\n    });\n    this.updateWidth();\n  },\n  watch: {\n    currentOffset: function currentOffset(_currentOffset) {\n      // Save the scroll percentage so that the current position can be held when resizing\n      // Use nextTick so that the resize listener uses the old percentage\n      var offset = this.props.infiniteScroll ? -(_currentOffset % this.totalWidth) : -_currentOffset;\n      this.scrollPercentage = offset / this.totalWidth;\n    },\n    'props.currentSlidesPerView': function propsCurrentSlidesPerView() {\n      this.jumpToSlide(this.props.activeIndex);\n    },\n    'props.totalSlides': function propsTotalSlides() {\n      this.jumpToSlide(this.props.activeIndex);\n    },\n    'props.activeIndex': function propsActiveIndex(activeIndex) {\n      // Move the slides back to the non-duplicated\n      this.updateOffsetToBeAbsolute();\n      this.scrollToSlide(activeIndex);\n    }\n  },\n  beforeDestroy: function beforeDestroy() {\n    this.observer.disconnect();\n  },\n  methods: {\n    updateWidth: function updateWidth() {\n      this.elementWidth = this.$el.offsetWidth;\n    },\n    updateOffsetToBeAbsolute: function updateOffsetToBeAbsolute() {\n      this.currentOffset = -this.scrollPercentage * this.totalWidth + this.slideOffsetModifier;\n    },\n    getSlideOffset: function getSlideOffset(slideIndex) {\n      return -slideIndex * this.slideWidth + this.slideOffsetModifier;\n    },\n    mutationObserverCallback: function mutationObserverCallback(mutationsList) {\n      var _this = this;\n\n      this.$nextTick(function () {\n        _this.updateWidth();\n      });\n      Object(_utils_mutations__WEBPACK_IMPORTED_MODULE_2__[\"listenToImagesLoad\"])(mutationsList, function () {\n        // TODO update these to be automated (shouldn't have to call keep position?)\n        _this.updateWidth();\n\n        _this.updateOffsetToBeAbsolute();\n      });\n    }\n  }\n});\n\n//# sourceURL=webpack:///./src/components/SliderSlides.vue?./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/demo/Demo.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/demo/Demo.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _DemoBasicSlider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DemoBasicSlider */ \"./src/demo/DemoBasicSlider.vue\");\n/* harmony import */ var _DemoBasicInfiniteSlider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DemoBasicInfiniteSlider */ \"./src/demo/DemoBasicInfiniteSlider.vue\");\n/* harmony import */ var _DemoSliderPagination__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DemoSliderPagination */ \"./src/demo/DemoSliderPagination.vue\");\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'Demo',\n  components: {\n    DemoSliderPagination: _DemoSliderPagination__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n    DemoBasicInfiniteSlider: _DemoBasicInfiniteSlider__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n    DemoBasicSlider: _DemoBasicSlider__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n  },\n  data: function data() {\n    return {\n      infiniteScroll: false,\n      numSlides: 7\n    };\n  }\n});\n\n//# sourceURL=webpack:///./src/demo/Demo.vue?./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/demo/DemoBasicInfiniteSlider.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/demo/DemoBasicInfiniteSlider.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_SliderFrame__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/SliderFrame */ \"./src/components/SliderFrame.vue\");\n/* harmony import */ var _components_SliderSlide_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/SliderSlide.vue */ \"./src/components/SliderSlide.vue\");\n/* harmony import */ var _components_SliderSlides_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/SliderSlides.vue */ \"./src/components/SliderSlides.vue\");\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'DemoBasicInfiniteSlider',\n  components: {\n    SliderFrame: _components_SliderFrame__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n    SliderSlide: _components_SliderSlide_vue__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n    SliderSlides: _components_SliderSlides_vue__WEBPACK_IMPORTED_MODULE_2__[\"default\"]\n  },\n  data: function data() {\n    return {\n      numSlides: 7,\n      slidesPerView: 5\n    };\n  }\n});\n\n//# sourceURL=webpack:///./src/demo/DemoBasicInfiniteSlider.vue?./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/demo/DemoBasicSlider.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/demo/DemoBasicSlider.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_SliderFrame__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/SliderFrame */ \"./src/components/SliderFrame.vue\");\n/* harmony import */ var _components_SliderSlide_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/SliderSlide.vue */ \"./src/components/SliderSlide.vue\");\n/* harmony import */ var _components_SliderSlides_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/SliderSlides.vue */ \"./src/components/SliderSlides.vue\");\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'DemoBasicSlider',\n  components: {\n    SliderFrame: _components_SliderFrame__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n    SliderSlide: _components_SliderSlide_vue__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n    SliderSlides: _components_SliderSlides_vue__WEBPACK_IMPORTED_MODULE_2__[\"default\"]\n  },\n  data: function data() {\n    return {\n      numSlides: 7,\n      slidesPerView: 5\n    };\n  }\n});\n\n//# sourceURL=webpack:///./src/demo/DemoBasicSlider.vue?./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/demo/DemoSliderPagination.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/demo/DemoSliderPagination.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_SliderFrame__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/SliderFrame */ \"./src/components/SliderFrame.vue\");\n/* harmony import */ var _components_SliderSlide_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/SliderSlide.vue */ \"./src/components/SliderSlide.vue\");\n/* harmony import */ var _components_SliderSlides_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/SliderSlides.vue */ \"./src/components/SliderSlides.vue\");\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'DemoSliderPagination',\n  components: {\n    SliderFrame: _components_SliderFrame__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n    SliderSlide: _components_SliderSlide_vue__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n    SliderSlides: _components_SliderSlides_vue__WEBPACK_IMPORTED_MODULE_2__[\"default\"]\n  },\n  data: function data() {\n    return {\n      infiniteScroll: false,\n      numSlides: 10\n    };\n  }\n});\n\n//# sourceURL=webpack:///./src/demo/DemoSliderPagination.vue?./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./src/scss/vue-dynamic-slider.scss":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-3-1!./node_modules/postcss-loader/src??ref--8-oneOf-3-2!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-3-3!./src/scss/vue-dynamic-slider.scss ***!
  \***************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \".dynamic-slider {\\n  white-space: nowrap;\\n  overflow: hidden; }\\n  .dynamic-slider .dynamic-slider-slide {\\n    display: inline-block;\\n    white-space: normal; }\\n  .dynamic-slider .dynamic-slider-slides {\\n    position: relative; }\\n\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./src/scss/vue-dynamic-slider.scss?./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-3-1!./node_modules/postcss-loader/src??ref--8-oneOf-3-2!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-3-3");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/demo/Demo.vue?vue&type=style&index=0&lang=scss&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/demo/Demo.vue?vue&type=style&index=0&lang=scss& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \".slider {\\n  padding: .5rem;\\n  border: 1px solid #dee2e6;\\n}\\n.active-slide {\\n  border: 1px solid #343a40;\\n}\\n.button {\\n  background-color: white;\\n  border: none;\\n  padding: 0;\\n  margin: 0;\\n}\\n.d-inline-flex {\\n  display: -webkit-inline-box;\\n  display: -ms-inline-flexbox;\\n  display: inline-flex;\\n}\\n.my-auto {\\n  margin-top: auto;\\n  margin-bottom: auto;\\n}\\n.mr-2 {\\n  margin-right: .5rem;\\n}\\n.ml-2 {\\n  margin-left: .5rem;\\n}\\n.px-1 {\\n  padding-left: .25rem;\\n  padding-right: .25rem;\\n}\\n.py-3 {\\n  padding-bottom: 1rem;\\n  padding-top: 1rem;\\n}\\n.w-100 {\\n  width: 100%;\\n}\\n.border {\\n  border: 1px solid #dee2e6;\\n}\\n.font-weight-bold {\\n  font-weight: bold;\\n}\\n*, ::after, ::before {\\n  -webkit-box-sizing: border-box;\\n          box-sizing: border-box;\\n}\\n\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./src/demo/Demo.vue?./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/SliderSlide.vue?vue&type=template&id=3d6b4f50&":
/*!*******************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/SliderSlide.vue?vue&type=template&id=3d6b4f50& ***!
  \*******************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"div\",\n    {\n      directives: [\n        {\n          name: \"show\",\n          rawName: \"v-show\",\n          value: _vm.active,\n          expression: \"active\"\n        }\n      ],\n      class: _vm.slideClass,\n      style: { width: _vm.widthPercent }\n    },\n    [_vm._t(\"default\")],\n    2\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/components/SliderSlide.vue?./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/demo/Demo.vue?vue&type=template&id=3acb7fa6&":
/*!******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/demo/Demo.vue?vue&type=template&id=3acb7fa6& ***!
  \******************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\"div\", [\n    _c(\"h1\", [_vm._v(\"vue-dynamic-slider Examples\")]),\n    _vm._v(\" \"),\n    _c(\n      \"section\",\n      [\n        _c(\"h2\", [_vm._v(\"Basic Touch Slider\")]),\n        _vm._v(\" \"),\n        _vm._m(0),\n        _vm._v(\" \"),\n        _c(\"demo-basic-slider\"),\n        _vm._v(\" \"),\n        _c(\"h2\", [_vm._v(\"Basic Touch Infinite Slider\")]),\n        _vm._v(\" \"),\n        _vm._m(1),\n        _vm._v(\" \"),\n        _c(\"demo-basic-infinite-slider\"),\n        _vm._v(\" \"),\n        _c(\"h2\", [_vm._v(\"Adding pagination\")]),\n        _vm._v(\" \"),\n        _c(\"div\", [\n          _vm._v(\n            \"\\n      Using the variables and functions exposed via slot props, implementing custom pagination is simple.\\n    \"\n          )\n        ]),\n        _vm._v(\" \"),\n        _vm._m(2),\n        _vm._v(\" \"),\n        _c(\"demo-slider-pagination\")\n      ],\n      1\n    )\n  ])\n}\nvar staticRenderFns = [\n  function() {\n    var _vm = this\n    var _h = _vm.$createElement\n    var _c = _vm._self._c || _h\n    return _c(\"div\", [\n      _c(\"div\", [\n        _vm._v(\n          \"\\n        The slider is made up of three components:\\n        \"\n        ),\n        _c(\"ul\", [\n          _c(\"li\", [\n            _vm._v(\n              \"SliderFrame as a way of setting props and exposing key variables and functions\"\n            )\n          ]),\n          _vm._v(\" \"),\n          _c(\"li\", [\n            _vm._v(\n              \"SliderSlides which does most of the work of scrolling, figuring out breakpoints, etc\"\n            )\n          ]),\n          _vm._v(\" \"),\n          _c(\"li\", [\n            _vm._v(\n              \"SliderSlide which is to provide additional markup to the slide and keep the correct width\"\n            )\n          ])\n        ])\n      ]),\n      _vm._v(\" \"),\n      _c(\"div\", [\n        _c(\"pre\", { staticClass: \"border\" }, [\n          _c(\"code\", [\n            _vm._v(\n              '\\n          <slider-frame :slides-per-view=\"5\">\\n            <div class=\"slider\" slot-scope=\"{ activeIndex }\">\\n              <slider-slides>\\n                <slider-slide\\n                  :key=\"ix\"\\n                  v-for=\"ix in numSlides\"\\n                >\\n                  <img\\n                    :src=\"`https://via.placeholder.com/300x300.png?text=${ix}`\"\\n                    :alt=\"`Image ${ix}`\"\\n                    class=\"w-100 px-1\"\\n                  >\\n                </slider-slide>\\n              </slider-slides>\\n            </div>\\n          </slider-frame>\\n        '\n            )\n          ])\n        ])\n      ])\n    ])\n  },\n  function() {\n    var _vm = this\n    var _h = _vm.$createElement\n    var _c = _vm._self._c || _h\n    return _c(\"div\", [\n      _vm._v(\n        \"\\n      To enable infinite scrolling, all that needs to be done is to enable it via the prop on <slider-frame>\\n      \"\n      ),\n      _c(\"pre\", [\n        _c(\"code\", [\n          _vm._v(\n            '\\n        <slider-frame :slides-per-view=\"5\" :infinite-scroll=\"true\">\\n      '\n          )\n        ])\n      ])\n    ])\n  },\n  function() {\n    var _vm = this\n    var _h = _vm.$createElement\n    var _c = _vm._self._c || _h\n    return _c(\"pre\", { staticClass: \"border\" }, [\n      _c(\"code\", [\n        _vm._v(\n          '\\n      <slider-frame\\n        :slides-per-view=\"5\"\\n        :breakpoints=\"{sm: 1, md: 2, lg: 3, xl: 4}\"\\n      >\\n        <div class=\"slider d-inline-flex\" slot-scope=\"{ next, prev, scrollToSlide, activeIndex, canScrollNext, canScrollPrev }\">\\n          <button\\n            class=\"mr-2 my-auto button\"\\n            :disabled=\"!canScrollPrev\"\\n            @click=\"prev\"\\n          >\\n            <i aria-hidden=\"true\" class=\"fas fa-3x fa-chevron-left\"></i>\\n            <span class=\"sr-only\">Previous</span>\\n          </button>\\n          <slider-slides>\\n            <slider-slide\\n              :key=\"ix\"\\n              v-for=\"(ix, iter) in numSlides\"\\n            >\\n              <img\\n                :src=\"`https://via.placeholder.com/300x300.png?text=${ix}`\"\\n                :alt=\"`Image ${ix}`\"\\n                :class=\"{\\n                          \\'active-slide\\' : activeIndex === iter,\\n                          \\'px-1\\': activeIndex !== iter\\n                        }\"\\n                class=\"w-100\"\\n                @click=\"scrollToSlide(iter)\"\\n              >\\n            </slider-slide>\\n          </slider-slides>\\n          <button\\n            class=\"button ml-2 my-auto\"\\n            :disabled=\"!canScrollNext\"\\n            @click=\"next\"\\n          >\\n            <i aria-hidden=\"true\" class=\"fas fa-3x fa-chevron-right\"></i>\\n            <span class=\"sr-only\">Next</span>\\n          </button>\\n        </div>\\n      </slider-frame>\\n    '\n        )\n      ])\n    ])\n  }\n]\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/demo/Demo.vue?./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/demo/DemoBasicInfiniteSlider.vue?vue&type=template&id=16e7550d&":
/*!*************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/demo/DemoBasicInfiniteSlider.vue?vue&type=template&id=16e7550d& ***!
  \*************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"div\",\n    [\n      _c(\"slider-frame\", {\n        attrs: {\n          \"slides-per-view\": _vm.slidesPerView,\n          \"infinite-scroll\": true\n        },\n        scopedSlots: _vm._u([\n          {\n            key: \"default\",\n            fn: function(ref) {\n              var activeIndex = ref.activeIndex\n              return _c(\n                \"div\",\n                { staticClass: \"slider\" },\n                [\n                  _c(\n                    \"slider-slides\",\n                    _vm._l(_vm.numSlides, function(ix) {\n                      return _c(\"slider-slide\", { key: ix }, [\n                        _c(\"img\", {\n                          staticClass: \"w-100 px-1\",\n                          attrs: {\n                            src:\n                              \"https://via.placeholder.com/300x300.png?text=\" +\n                              ix,\n                            alt: \"Image \" + ix\n                          }\n                        })\n                      ])\n                    }),\n                    1\n                  ),\n                  _vm._v(\" \"),\n                  _c(\"div\", { staticClass: \"font-weight-bold\" }, [\n                    _vm._v(\n                      \"\\n        Active slide: \" +\n                        _vm._s(activeIndex + 1) +\n                        \"\\n      \"\n                    )\n                  ])\n                ],\n                1\n              )\n            }\n          }\n        ])\n      }),\n      _vm._v(\" \"),\n      _c(\"div\", { staticClass: \"py-3\" }, [\n        _c(\"div\", [\n          _c(\n            \"label\",\n            { staticClass: \"font-weight-bold\", attrs: { for: \"numSlides\" } },\n            [_vm._v(\"\\n        Number of slides\\n      \")]\n          ),\n          _vm._v(\" \"),\n          _c(\"input\", {\n            directives: [\n              {\n                name: \"model\",\n                rawName: \"v-model.number\",\n                value: _vm.numSlides,\n                expression: \"numSlides\",\n                modifiers: { number: true }\n              }\n            ],\n            attrs: { id: \"numSlides\", type: \"number\" },\n            domProps: { value: _vm.numSlides },\n            on: {\n              input: function($event) {\n                if ($event.target.composing) {\n                  return\n                }\n                _vm.numSlides = _vm._n($event.target.value)\n              },\n              blur: function($event) {\n                return _vm.$forceUpdate()\n              }\n            }\n          }),\n          _vm._v(\" \"),\n          _c(\n            \"label\",\n            {\n              staticClass: \"font-weight-bold\",\n              attrs: { for: \"slidesPerView\" }\n            },\n            [_vm._v(\"\\n        Slides per Page\\n      \")]\n          ),\n          _vm._v(\" \"),\n          _c(\"input\", {\n            directives: [\n              {\n                name: \"model\",\n                rawName: \"v-model.number\",\n                value: _vm.slidesPerView,\n                expression: \"slidesPerView\",\n                modifiers: { number: true }\n              }\n            ],\n            attrs: { id: \"slidesPerView\", type: \"number\" },\n            domProps: { value: _vm.slidesPerView },\n            on: {\n              input: function($event) {\n                if ($event.target.composing) {\n                  return\n                }\n                _vm.slidesPerView = _vm._n($event.target.value)\n              },\n              blur: function($event) {\n                return _vm.$forceUpdate()\n              }\n            }\n          })\n        ])\n      ])\n    ],\n    1\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/demo/DemoBasicInfiniteSlider.vue?./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/demo/DemoBasicSlider.vue?vue&type=template&id=5937104e&":
/*!*****************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/demo/DemoBasicSlider.vue?vue&type=template&id=5937104e& ***!
  \*****************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"div\",\n    [\n      _c(\"slider-frame\", {\n        attrs: { \"slides-per-view\": _vm.slidesPerView },\n        scopedSlots: _vm._u([\n          {\n            key: \"default\",\n            fn: function(ref) {\n              var activeIndex = ref.activeIndex\n              return _c(\n                \"div\",\n                { staticClass: \"slider\" },\n                [\n                  _c(\n                    \"slider-slides\",\n                    _vm._l(_vm.numSlides, function(ix) {\n                      return _c(\"slider-slide\", { key: ix }, [\n                        _c(\"img\", {\n                          staticClass: \"w-100 px-1\",\n                          attrs: {\n                            src:\n                              \"https://via.placeholder.com/300x300.png?text=\" +\n                              ix,\n                            alt: \"Image \" + ix\n                          }\n                        })\n                      ])\n                    }),\n                    1\n                  ),\n                  _vm._v(\" \"),\n                  _c(\"div\", { staticClass: \"font-weight-bold\" }, [\n                    _vm._v(\n                      \"\\n        Active slide: \" +\n                        _vm._s(activeIndex + 1) +\n                        \"\\n      \"\n                    )\n                  ])\n                ],\n                1\n              )\n            }\n          }\n        ])\n      }),\n      _vm._v(\" \"),\n      _c(\"div\", { staticClass: \"py-3\" }, [\n        _c(\n          \"label\",\n          { staticClass: \"font-weight-bold\", attrs: { for: \"numSlides\" } },\n          [_vm._v(\"\\n      Number of slides\\n    \")]\n        ),\n        _vm._v(\" \"),\n        _c(\"input\", {\n          directives: [\n            {\n              name: \"model\",\n              rawName: \"v-model.number\",\n              value: _vm.numSlides,\n              expression: \"numSlides\",\n              modifiers: { number: true }\n            }\n          ],\n          attrs: { id: \"numSlides\", type: \"number\" },\n          domProps: { value: _vm.numSlides },\n          on: {\n            input: function($event) {\n              if ($event.target.composing) {\n                return\n              }\n              _vm.numSlides = _vm._n($event.target.value)\n            },\n            blur: function($event) {\n              return _vm.$forceUpdate()\n            }\n          }\n        }),\n        _vm._v(\" \"),\n        _c(\n          \"label\",\n          { staticClass: \"font-weight-bold\", attrs: { for: \"slidesPerView\" } },\n          [_vm._v(\"\\n      Slides per Page\\n    \")]\n        ),\n        _vm._v(\" \"),\n        _c(\"input\", {\n          directives: [\n            {\n              name: \"model\",\n              rawName: \"v-model.number\",\n              value: _vm.slidesPerView,\n              expression: \"slidesPerView\",\n              modifiers: { number: true }\n            }\n          ],\n          attrs: { id: \"slidesPerView\", type: \"number\" },\n          domProps: { value: _vm.slidesPerView },\n          on: {\n            input: function($event) {\n              if ($event.target.composing) {\n                return\n              }\n              _vm.slidesPerView = _vm._n($event.target.value)\n            },\n            blur: function($event) {\n              return _vm.$forceUpdate()\n            }\n          }\n        })\n      ])\n    ],\n    1\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/demo/DemoBasicSlider.vue?./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/demo/DemoSliderPagination.vue?vue&type=template&id=dd634cbe&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/demo/DemoSliderPagination.vue?vue&type=template&id=dd634cbe&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\"slider-frame\", {\n    attrs: {\n      \"slides-per-view\": 5,\n      breakpoints: { sm: 1, md: 2, lg: 3, xl: 4 }\n    },\n    scopedSlots: _vm._u([\n      {\n        key: \"default\",\n        fn: function(ref) {\n          var next = ref.next\n          var prev = ref.prev\n          var scrollToSlide = ref.scrollToSlide\n          var activeIndex = ref.activeIndex\n          var canScrollNext = ref.canScrollNext\n          var canScrollPrev = ref.canScrollPrev\n          return _c(\n            \"div\",\n            { staticClass: \"slider d-inline-flex\" },\n            [\n              _c(\n                \"button\",\n                {\n                  staticClass: \"mr-2 my-auto button\",\n                  attrs: { disabled: !canScrollPrev },\n                  on: { click: prev }\n                },\n                [\n                  _c(\"i\", {\n                    staticClass: \"fas fa-3x fa-chevron-left\",\n                    attrs: { \"aria-hidden\": \"true\" }\n                  }),\n                  _vm._v(\" \"),\n                  _c(\"span\", { staticClass: \"sr-only\" }, [_vm._v(\"Previous\")])\n                ]\n              ),\n              _vm._v(\" \"),\n              _c(\n                \"slider-slides\",\n                _vm._l(_vm.numSlides, function(ix, iter) {\n                  return _c(\"slider-slide\", { key: ix }, [\n                    _c(\"img\", {\n                      staticClass: \"w-100\",\n                      class: {\n                        \"active-slide\": activeIndex === iter,\n                        \"px-1\": activeIndex !== iter\n                      },\n                      attrs: {\n                        src:\n                          \"https://via.placeholder.com/300x300.png?text=\" + ix,\n                        alt: \"Image \" + ix\n                      },\n                      on: {\n                        click: function($event) {\n                          return scrollToSlide(iter)\n                        }\n                      }\n                    })\n                  ])\n                }),\n                1\n              ),\n              _vm._v(\" \"),\n              _c(\n                \"button\",\n                {\n                  staticClass: \"button ml-2 my-auto\",\n                  attrs: { disabled: !canScrollNext },\n                  on: { click: next }\n                },\n                [\n                  _c(\"i\", {\n                    staticClass: \"fas fa-3x fa-chevron-right\",\n                    attrs: { \"aria-hidden\": \"true\" }\n                  }),\n                  _vm._v(\" \"),\n                  _c(\"span\", { staticClass: \"sr-only\" }, [_vm._v(\"Next\")])\n                ]\n              )\n            ],\n            1\n          )\n        }\n      }\n    ])\n  })\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/demo/DemoSliderPagination.vue?./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/demo/Demo.vue?vue&type=style&index=0&lang=scss&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/demo/Demo.vue?vue&type=style&index=0&lang=scss& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--8-oneOf-1-2!../../node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-3!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./Demo.vue?vue&type=style&index=0&lang=scss& */ \"./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/demo/Demo.vue?vue&type=style&index=0&lang=scss&\");\nif(typeof content === 'string') content = [[module.i, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = __webpack_require__(/*! ../../node_modules/vue-style-loader/lib/addStylesClient.js */ \"./node_modules/vue-style-loader/lib/addStylesClient.js\").default\nvar update = add(\"2b07736f\", content, false, {\"sourceMap\":false,\"shadowMode\":false});\n// Hot Module Replacement\nif(false) {}\n\n//# sourceURL=webpack:///./src/demo/Demo.vue?./node_modules/vue-style-loader??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./src/components/SliderFrame.vue":
/*!****************************************!*\
  !*** ./src/components/SliderFrame.vue ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _SliderFrame_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SliderFrame.vue?vue&type=script&lang=js& */ \"./src/components/SliderFrame.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\nvar render, staticRenderFns\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(\n  _SliderFrame_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  render,\n  staticRenderFns,\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/components/SliderFrame.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/components/SliderFrame.vue?");

/***/ }),

/***/ "./src/components/SliderFrame.vue?vue&type=script&lang=js&":
/*!*****************************************************************!*\
  !*** ./src/components/SliderFrame.vue?vue&type=script&lang=js& ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SliderFrame_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/babel-loader/lib!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./SliderFrame.vue?vue&type=script&lang=js& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/SliderFrame.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SliderFrame_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/components/SliderFrame.vue?");

/***/ }),

/***/ "./src/components/SliderSlide.vue":
/*!****************************************!*\
  !*** ./src/components/SliderSlide.vue ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _SliderSlide_vue_vue_type_template_id_3d6b4f50___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SliderSlide.vue?vue&type=template&id=3d6b4f50& */ \"./src/components/SliderSlide.vue?vue&type=template&id=3d6b4f50&\");\n/* harmony import */ var _SliderSlide_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SliderSlide.vue?vue&type=script&lang=js& */ \"./src/components/SliderSlide.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _SliderSlide_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _SliderSlide_vue_vue_type_template_id_3d6b4f50___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _SliderSlide_vue_vue_type_template_id_3d6b4f50___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/components/SliderSlide.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/components/SliderSlide.vue?");

/***/ }),

/***/ "./src/components/SliderSlide.vue?vue&type=script&lang=js&":
/*!*****************************************************************!*\
  !*** ./src/components/SliderSlide.vue?vue&type=script&lang=js& ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SliderSlide_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/babel-loader/lib!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./SliderSlide.vue?vue&type=script&lang=js& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/SliderSlide.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SliderSlide_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/components/SliderSlide.vue?");

/***/ }),

/***/ "./src/components/SliderSlide.vue?vue&type=template&id=3d6b4f50&":
/*!***********************************************************************!*\
  !*** ./src/components/SliderSlide.vue?vue&type=template&id=3d6b4f50& ***!
  \***********************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SliderSlide_vue_vue_type_template_id_3d6b4f50___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./SliderSlide.vue?vue&type=template&id=3d6b4f50& */ \"./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/SliderSlide.vue?vue&type=template&id=3d6b4f50&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SliderSlide_vue_vue_type_template_id_3d6b4f50___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SliderSlide_vue_vue_type_template_id_3d6b4f50___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/components/SliderSlide.vue?");

/***/ }),

/***/ "./src/components/SliderSlides.vue":
/*!*****************************************!*\
  !*** ./src/components/SliderSlides.vue ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _SliderSlides_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SliderSlides.vue?vue&type=script&lang=js& */ \"./src/components/SliderSlides.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\nvar render, staticRenderFns\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(\n  _SliderSlides_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  render,\n  staticRenderFns,\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/components/SliderSlides.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/components/SliderSlides.vue?");

/***/ }),

/***/ "./src/components/SliderSlides.vue?vue&type=script&lang=js&":
/*!******************************************************************!*\
  !*** ./src/components/SliderSlides.vue?vue&type=script&lang=js& ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SliderSlides_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/babel-loader/lib!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./SliderSlides.vue?vue&type=script&lang=js& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/SliderSlides.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SliderSlides_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/components/SliderSlides.vue?");

/***/ }),

/***/ "./src/components/mixins/breakpoint-mixin.js":
/*!***************************************************!*\
  !*** ./src/components/mixins/breakpoint-mixin.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_throttle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/throttle */ \"./src/components/utils/throttle.js\");\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === \"undefined\" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\n\nvar SIZES = {\n  sm: 640,\n  md: 768,\n  lg: 1024,\n  xl: 1280\n};\n/**\r\n *\r\n */\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  data: function data() {\n    return {\n      windowWidth: window.innerWidth,\n      windowHeight: window.innerHeight\n    };\n  },\n  mounted: function mounted() {\n    var vm = this;\n    window.addEventListener('resize', Object(_utils_throttle__WEBPACK_IMPORTED_MODULE_0__[\"throttle\"])(function () {\n      vm.windowWidth = window.innerWidth;\n      vm.windowHeight = window.innerHeight;\n    }, 100), false);\n\n    if (this.props.breakpoints) {\n      this.props.currentSlidesPerView = this.getBreakpointValue(this.props.breakpoints, this.props.slidesPerView);\n    }\n  },\n  watch: {\n    windowWidth: function windowWidth() {\n      if (this.props.breakpoints) {\n        this.props.currentSlidesPerView = this.getBreakpointValue(this.props.breakpoints, this.props.slidesPerView);\n      }\n    },\n    'props.slidesPerView': function propsSlidesPerView(slidesPerView) {\n      this.props.currentSlidesPerView = this.getBreakpointValue(this.props.breakpoints, slidesPerView);\n    }\n  },\n  methods: {\n    getBreakpointValue: function getBreakpointValue(breakpointMap, defaultValue) {\n      if (!breakpointMap) {\n        return defaultValue;\n      }\n\n      var computedBreakpoints = {}; // If the breakpoints are 'xl', 'md' etc instead of numbers, get their corresponding numbers\n\n      Object.keys(breakpointMap).forEach(function (breakpoint) {\n        var size = SIZES[breakpoint];\n\n        if (size) {\n          computedBreakpoints[size] = breakpointMap[breakpoint];\n        } else {\n          computedBreakpoints[breakpoint] = breakpointMap[breakpoint];\n        }\n      });\n\n      var _iterator = _createForOfIteratorHelper(Object.keys(computedBreakpoints).sort(breakpointComparator)),\n          _step;\n\n      try {\n        for (_iterator.s(); !(_step = _iterator.n()).done;) {\n          var breakpoint = _step.value;\n\n          if (this.windowWidth <= breakpoint) {\n            return computedBreakpoints[breakpoint];\n          }\n        }\n      } catch (err) {\n        _iterator.e(err);\n      } finally {\n        _iterator.f();\n      }\n\n      return defaultValue;\n    }\n  }\n});\n\nfunction breakpointComparator(a, b) {\n  return a - b;\n}\n\n//# sourceURL=webpack:///./src/components/mixins/breakpoint-mixin.js?");

/***/ }),

/***/ "./src/components/mixins/draggable-mixin.js":
/*!**************************************************!*\
  !*** ./src/components/mixins/draggable-mixin.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_range_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/range-util */ \"./src/components/utils/range-util.js\");\n\nvar VELOCITY_THRESHOLD = .1;\nvar DRAG_TOLERANCE = 2;\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  data: function data() {\n    return {\n      currentOffset: 0,\n      previousClientX: 0,\n      startClientX: 0,\n      velocity: 0,\n      scrolling: false,\n      previousTime: Date.now()\n    };\n  },\n  computed: {\n    closestSlideIndex: function closestSlideIndex() {\n      var roundType = 'round';\n\n      if (this.velocity >= VELOCITY_THRESHOLD) {\n        roundType = 'floor';\n      } else if (this.velocity <= -VELOCITY_THRESHOLD) {\n        roundType = 'ceil';\n      } // Move the slides back to the non-duplicated\n\n\n      var index = Math[roundType](this.scrollPercentage * this.props.totalSlides);\n\n      if (!this.props.infiniteScroll) {\n        index = Object(_utils_range_util__WEBPACK_IMPORTED_MODULE_0__[\"keepInRange\"])(index, 0, this.props.totalSlides - 1);\n      }\n\n      return index;\n    }\n  },\n  mounted: function mounted() {\n    this.$el.addEventListener('touchstart', this.dragStart);\n    this.$el.addEventListener('touchend', this.dragEnd);\n    this.$el.addEventListener('touchmove', this.dragAction);\n    this.$el.addEventListener('mousedown', this.dragStart);\n  },\n  beforeDestroy: function beforeDestroy() {\n    this.$el.removeEventListener('touchstart', this.dragStart);\n    this.$el.removeEventListener('touchend', this.dragEnd);\n    this.$el.removeEventListener('touchmove', this.dragAction);\n    this.$el.removeEventListener('mousedown', this.dragStart); // In case the component is destroyed before dragEnd\n\n    document.removeEventListener('mousemove', this.dragAction);\n    document.removeEventListener('mouseup', this.dragEnd);\n  },\n  methods: {\n    // https://www.cssscript.com/draggable-touch-slider-carousel/\n    dragStart: function dragStart(e) {\n      // Cancel any previous scrolling\n      this.scrolling = false;\n      e.preventDefault();\n\n      if (e.type === 'touchstart') {\n        this.previousClientX = e.touches[0].clientX;\n      } else {\n        this.previousClientX = e.clientX;\n        document.addEventListener('mousemove', this.dragAction);\n        document.addEventListener('mouseup', this.dragEnd);\n      }\n\n      this.startClientX = this.previousClientX;\n    },\n    dragAction: function dragAction(e) {\n      var currentPosition = this.currentPosition(e); // Calculate velocity so we can go to the next slide if the user slides fast enough\n\n      var currentTime = Date.now();\n      this.velocity = (currentPosition - this.previousClientX) / (currentTime - this.previousTime);\n      this.previousTime = currentTime;\n      this.currentOffset -= this.previousClientX - currentPosition;\n      this.previousClientX = currentPosition;\n\n      if (this.props.infiniteScroll) {\n        if (this.currentOffset >= 0) {\n          this.currentOffset -= this.totalWidth;\n        } else if (this.currentOffset <= this.duplicateRightStart) {\n          this.currentOffset += this.totalWidth;\n        }\n      }\n    },\n    dragEnd: function dragEnd(e) {\n      document.removeEventListener('mousemove', this.dragAction);\n      document.removeEventListener('mouseup', this.dragEnd);\n\n      if (this.didDrag(this.currentPosition(e))) {\n        this.props.activeIndex = this.closestSlideIndex;\n        this.scrollToSlide(this.closestSlideIndex);\n      }\n\n      this.velocity = 0;\n    },\n\n    /**\r\n     * If the user dragged, they likely don't want to click a link, so cancel any click listeners on children\r\n     * @param e\r\n     */\n    cancelClicks: function cancelClicks(e) {\n      // If moved more than 2px, cancel click events on children\n      if (this.didDrag(this.currentPosition(e))) {\n        e.stopPropagation();\n      }\n    },\n    didDrag: function didDrag(currentClientX) {\n      return Math.abs(currentClientX - this.startClientX) > DRAG_TOLERANCE;\n    },\n    currentPosition: function currentPosition(e) {\n      return e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;\n    }\n  }\n});\n\n//# sourceURL=webpack:///./src/components/mixins/draggable-mixin.js?");

/***/ }),

/***/ "./src/components/mixins/scrollable-mixin.js":
/*!***************************************************!*\
  !*** ./src/components/mixins/scrollable-mixin.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/**\r\n * A mixin to handle scrolling login in a Vue component.\r\n * Expects: a 'props.activeIndex', and 'getSlideOffset' method\r\n *\r\n * @type {{}}\r\n */\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  data: function data() {\n    return {\n      scrolling: false,\n      currentOffset: 0,\n      scrollStartTime: 0\n    };\n  },\n  methods: {\n    jumpToSlide: function jumpToSlide(slideIndex) {\n      this.props.activeIndex = slideIndex;\n      this.currentOffset = this.getSlideOffset(slideIndex);\n    },\n    scrollToSlide: function scrollToSlide(slideIndex) {\n      var vm = this; // Calculate the position, and then shift it over to the non-duplicated slides\n\n      var slideOffset = vm.getSlideOffset(slideIndex);\n\n      if (slideOffset === vm.currentOffset) {\n        return;\n      }\n\n      requestAnimationFrame(function (timestamp) {\n        vm.scrolling = true;\n        vm.scrollStartTime = timestamp;\n        vm.scroll(vm.currentOffset, slideOffset, vm.scrollStartTime, 500);\n      });\n    },\n    scroll: function scroll(from, to, currentTime, duration) {\n      var vm = this;\n\n      if (!vm.scrolling) {\n        return;\n      }\n\n      vm.currentOffset = this.props.scrollingFunction(currentTime - vm.scrollStartTime, from, to, duration);\n      requestAnimationFrame(function (timestamp) {\n        if (currentTime < vm.scrollStartTime + duration) {\n          vm.scroll(from, to, timestamp, duration);\n        } else {\n          vm.currentOffset = to;\n        }\n      });\n    }\n  }\n});\n\n//# sourceURL=webpack:///./src/components/mixins/scrollable-mixin.js?");

/***/ }),

/***/ "./src/components/utils/mutations.js":
/*!*******************************************!*\
  !*** ./src/components/utils/mutations.js ***!
  \*******************************************/
/*! exports provided: listenToImagesLoad */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"listenToImagesLoad\", function() { return listenToImagesLoad; });\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && Symbol.iterator in Object(iter)) return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\n\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === \"undefined\" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\n/**\r\n * Attach event listeners to all images inside a mutated div to run when they load (e.g. to re-calculate size)\r\n *\r\n * @param mutationList\r\n * @param callback\r\n */\nfunction listenToImagesLoad(mutationList, callback) {\n  var _iterator = _createForOfIteratorHelper(mutationList),\n      _step;\n\n  try {\n    for (_iterator.s(); !(_step = _iterator.n()).done;) {\n      var mutation = _step.value;\n      var images = mutation.target.querySelectorAll('img');\n\n      if (images && images.length > 0) {\n        _toConsumableArray(images).filter(function (image) {\n          return !image.complete;\n        }).forEach(function (image) {\n          return image.addEventListener('load', callback);\n        });\n      }\n    }\n  } catch (err) {\n    _iterator.e(err);\n  } finally {\n    _iterator.f();\n  }\n}\n\n//# sourceURL=webpack:///./src/components/utils/mutations.js?");

/***/ }),

/***/ "./src/components/utils/range-util.js":
/*!********************************************!*\
  !*** ./src/components/utils/range-util.js ***!
  \********************************************/
/*! exports provided: keepInRange */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"keepInRange\", function() { return keepInRange; });\n/**\r\n * Keep the given number within the given upper and lower bounds\r\n *\r\n * @param num {Number} number to keep in range\r\n * @param lower {Number} lower bound of the range\r\n * @param upper {Number} upper bound of the range\r\n * @returns {Number} the lower bound when num is below it, the upper bound when num is above it, or num if it's between them\r\n */\nfunction keepInRange(num, lower, upper) {\n  if (num < lower) {\n    return lower;\n  } else if (num > upper) {\n    return upper;\n  }\n\n  return num;\n}\n\n//# sourceURL=webpack:///./src/components/utils/range-util.js?");

/***/ }),

/***/ "./src/components/utils/scroll.js":
/*!****************************************!*\
  !*** ./src/components/utils/scroll.js ***!
  \****************************************/
/*! exports provided: easeOutCubic */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"easeOutCubic\", function() { return easeOutCubic; });\n/**\r\n * Cubic function for scrolling\r\n *\r\n * @param currentTime {Number} time (ms) of the function (time elapsed since starting to scroll)\r\n * @param initialValue {Number} initial value (initial slider offset)\r\n * @param finalValue {Number} final value (desired slider offset)\r\n * @param duration {Number} total duration (ms) of the function (how long to scroll for)\r\n * @returns {Number} the current \"position\" between initial and final value based on current time\r\n */\nfunction easeOutCubic(currentTime, initialValue, finalValue, duration) {\n  var changeInValue = finalValue - initialValue;\n  currentTime /= duration;\n  currentTime--;\n  return changeInValue * (currentTime * currentTime * currentTime + 1) + initialValue;\n}\n\n//# sourceURL=webpack:///./src/components/utils/scroll.js?");

/***/ }),

/***/ "./src/components/utils/throttle.js":
/*!******************************************!*\
  !*** ./src/components/utils/throttle.js ***!
  \******************************************/
/*! exports provided: throttle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"throttle\", function() { return throttle; });\n/**\r\n * https://github.com/lodash/lodash/blob/master/throttle.js\r\n */\nfunction throttle(func, wait) {\n  if (typeof func !== 'function') {\n    throw new TypeError('Expected a function');\n  }\n\n  return debounce(func, wait, {\n    leading: true,\n    trailing: true,\n    'maxWait': wait\n  });\n}\n/**\r\n * https://github.com/lodash/lodash/blob/master/debounce.js\r\n */\n\nfunction debounce(func, wait, options) {\n  var lastArgs, lastThis, maxWait, result, timerId, lastCallTime;\n  var lastInvokeTime = 0; // Bypass `requestAnimationFrame` by explicitly setting `wait=0`.\n\n  var useRAF = !wait && wait !== 0 && typeof requestAnimationFrame === 'function';\n\n  if (typeof func !== 'function') {\n    throw new TypeError('Expected a function');\n  }\n\n  wait = +wait || 0;\n  var leading = !!options.leading;\n  var maxing = ('maxWait' in options);\n  maxWait = maxing ? Math.max(+options.maxWait || 0, wait) : maxWait;\n  var trailing = 'trailing' in options ? !!options.trailing : trailing;\n\n  function invokeFunc(time) {\n    var args = lastArgs;\n    var thisArg = lastThis;\n    lastArgs = lastThis = undefined;\n    lastInvokeTime = time;\n    result = func.apply(thisArg, args);\n    return result;\n  }\n\n  function startTimer(pendingFunc, wait) {\n    if (useRAF) {\n      cancelAnimationFrame(timerId);\n      return requestAnimationFrame(pendingFunc);\n    }\n\n    return setTimeout(pendingFunc, wait);\n  }\n\n  function cancelTimer(id) {\n    if (useRAF) {\n      return cancelAnimationFrame(id);\n    }\n\n    clearTimeout(id);\n  }\n\n  function leadingEdge(time) {\n    // Reset any `maxWait` timer.\n    lastInvokeTime = time; // Start the timer for the trailing edge.\n\n    timerId = startTimer(timerExpired, wait); // Invoke the leading edge.\n\n    return leading ? invokeFunc(time) : result;\n  }\n\n  function remainingWait(time) {\n    var timeSinceLastCall = time - lastCallTime;\n    var timeSinceLastInvoke = time - lastInvokeTime;\n    var timeWaiting = wait - timeSinceLastCall;\n    return maxing ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;\n  }\n\n  function shouldInvoke(time) {\n    var timeSinceLastCall = time - lastCallTime;\n    var timeSinceLastInvoke = time - lastInvokeTime; // Either this is the first call, activity has stopped and we're at the\n    // trailing edge, the system time has gone backwards and we're treating\n    // it as the trailing edge, or we've hit the `maxWait` limit.\n\n    return lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;\n  }\n\n  function timerExpired() {\n    var time = Date.now();\n\n    if (shouldInvoke(time)) {\n      return trailingEdge(time);\n    } // Restart the timer.\n\n\n    timerId = startTimer(timerExpired, remainingWait(time));\n  }\n\n  function trailingEdge(time) {\n    timerId = undefined; // Only invoke if we have `lastArgs` which means `func` has been\n    // debounced at least once.\n\n    if (trailing && lastArgs) {\n      return invokeFunc(time);\n    }\n\n    lastArgs = lastThis = undefined;\n    return result;\n  }\n\n  function cancel() {\n    if (timerId !== undefined) {\n      cancelTimer(timerId);\n    }\n\n    lastInvokeTime = 0;\n    lastArgs = lastCallTime = lastThis = timerId = undefined;\n  }\n\n  function flush() {\n    return timerId === undefined ? result : trailingEdge(Date.now());\n  }\n\n  function pending() {\n    return timerId !== undefined;\n  }\n\n  function debounced() {\n    var time = Date.now();\n    var isInvoking = shouldInvoke(time);\n\n    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {\n      args[_key] = arguments[_key];\n    }\n\n    lastArgs = args;\n    lastThis = this;\n    lastCallTime = time;\n\n    if (isInvoking) {\n      if (timerId === undefined) {\n        return leadingEdge(lastCallTime);\n      }\n\n      if (maxing) {\n        // Handle invocations in a tight loop.\n        timerId = startTimer(timerExpired, wait);\n        return invokeFunc(lastCallTime);\n      }\n    }\n\n    if (timerId === undefined) {\n      timerId = startTimer(timerExpired, wait);\n    }\n\n    return result;\n  }\n\n  debounced.cancel = cancel;\n  debounced.flush = flush;\n  debounced.pending = pending;\n  return debounced;\n}\n\n//# sourceURL=webpack:///./src/components/utils/throttle.js?");

/***/ }),

/***/ "./src/components/utils/vue-util.js":
/*!******************************************!*\
  !*** ./src/components/utils/vue-util.js ***!
  \******************************************/
/*! exports provided: deepClone */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"deepClone\", function() { return deepClone; });\n// https://stackoverflow.com/a/51066092\nfunction deepClone(vnodes, createElement, id) {\n  function cloneVNode(vnode) {\n    var clonedChildren = vnode.children && vnode.children.map(function (vnode) {\n      return cloneVNode(vnode);\n    });\n    var cloned = createElement(vnode.tag, vnode.data, clonedChildren);\n    cloned.text = vnode.text;\n    cloned.isComment = vnode.isComment;\n    cloned.componentOptions = vnode.componentOptions;\n    cloned.elm = vnode.elm;\n    cloned.context = vnode.context;\n    cloned.ns = vnode.ns;\n    cloned.isStatic = vnode.isStatic; //TODO this kinda works but is horrible broken...\n    // if (!descendant) {\n    //     cloned.data.staticClass = vnode.data.staticClass || '';\n    //     cloned.data.staticClass = cloned.data.staticClass.toString();\n    //     cloned.data.staticClass+= ' clone'\n    // }\n    // cloned.data = vnode.data;\n    // cloned.child = vnode.child;\n    //eslint-disable-next-line\n    // console.log(vnode.$child._uid);\n    //eslint-disable-next-line\n    // console.log('cloning', vnode, cloned);\n\n    if (vnode.key !== null && vnode.key !== undefined && vnode.key !== '') {\n      cloned.key = \"\".concat(vnode.key, \"-\").concat(id);\n    }\n\n    return cloned;\n  }\n\n  return vnodes.map(function (vnode) {\n    return cloneVNode(vnode);\n  });\n}\n\n//# sourceURL=webpack:///./src/components/utils/vue-util.js?");

/***/ }),

/***/ "./src/demo.js":
/*!*********************!*\
  !*** ./src/demo.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.common.js\");\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _demo_Demo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./demo/Demo */ \"./src/demo/Demo.vue\");\n\n\nvue__WEBPACK_IMPORTED_MODULE_0___default.a.config.productionTip = false;\nvar faScript = document.createElement('script');\nfaScript.src = 'https://kit.fontawesome.com/290d2b5cc0.js';\nfaScript.crossOrigin = 'anonymous';\ndocument.body.append(faScript);\nnew vue__WEBPACK_IMPORTED_MODULE_0___default.a({\n  render: function render(h) {\n    return h(_demo_Demo__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n  }\n}).$mount('#app');\n\n//# sourceURL=webpack:///./src/demo.js?");

/***/ }),

/***/ "./src/demo/Demo.vue":
/*!***************************!*\
  !*** ./src/demo/Demo.vue ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Demo_vue_vue_type_template_id_3acb7fa6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Demo.vue?vue&type=template&id=3acb7fa6& */ \"./src/demo/Demo.vue?vue&type=template&id=3acb7fa6&\");\n/* harmony import */ var _Demo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Demo.vue?vue&type=script&lang=js& */ \"./src/demo/Demo.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _Demo_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Demo.vue?vue&type=style&index=0&lang=scss& */ \"./src/demo/Demo.vue?vue&type=style&index=0&lang=scss&\");\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(\n  _Demo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _Demo_vue_vue_type_template_id_3acb7fa6___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _Demo_vue_vue_type_template_id_3acb7fa6___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/demo/Demo.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/demo/Demo.vue?");

/***/ }),

/***/ "./src/demo/Demo.vue?vue&type=script&lang=js&":
/*!****************************************************!*\
  !*** ./src/demo/Demo.vue?vue&type=script&lang=js& ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Demo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/babel-loader/lib!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./Demo.vue?vue&type=script&lang=js& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/demo/Demo.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Demo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/demo/Demo.vue?");

/***/ }),

/***/ "./src/demo/Demo.vue?vue&type=style&index=0&lang=scss&":
/*!*************************************************************!*\
  !*** ./src/demo/Demo.vue?vue&type=style&index=0&lang=scss& ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Demo_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader??ref--8-oneOf-1-0!../../node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--8-oneOf-1-2!../../node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-3!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./Demo.vue?vue&type=style&index=0&lang=scss& */ \"./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/demo/Demo.vue?vue&type=style&index=0&lang=scss&\");\n/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Demo_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Demo_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Demo_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if([\"default\"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Demo_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Demo_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); \n\n//# sourceURL=webpack:///./src/demo/Demo.vue?");

/***/ }),

/***/ "./src/demo/Demo.vue?vue&type=template&id=3acb7fa6&":
/*!**********************************************************!*\
  !*** ./src/demo/Demo.vue?vue&type=template&id=3acb7fa6& ***!
  \**********************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Demo_vue_vue_type_template_id_3acb7fa6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./Demo.vue?vue&type=template&id=3acb7fa6& */ \"./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/demo/Demo.vue?vue&type=template&id=3acb7fa6&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Demo_vue_vue_type_template_id_3acb7fa6___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Demo_vue_vue_type_template_id_3acb7fa6___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/demo/Demo.vue?");

/***/ }),

/***/ "./src/demo/DemoBasicInfiniteSlider.vue":
/*!**********************************************!*\
  !*** ./src/demo/DemoBasicInfiniteSlider.vue ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _DemoBasicInfiniteSlider_vue_vue_type_template_id_16e7550d___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DemoBasicInfiniteSlider.vue?vue&type=template&id=16e7550d& */ \"./src/demo/DemoBasicInfiniteSlider.vue?vue&type=template&id=16e7550d&\");\n/* harmony import */ var _DemoBasicInfiniteSlider_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DemoBasicInfiniteSlider.vue?vue&type=script&lang=js& */ \"./src/demo/DemoBasicInfiniteSlider.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _DemoBasicInfiniteSlider_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _DemoBasicInfiniteSlider_vue_vue_type_template_id_16e7550d___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _DemoBasicInfiniteSlider_vue_vue_type_template_id_16e7550d___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/demo/DemoBasicInfiniteSlider.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/demo/DemoBasicInfiniteSlider.vue?");

/***/ }),

/***/ "./src/demo/DemoBasicInfiniteSlider.vue?vue&type=script&lang=js&":
/*!***********************************************************************!*\
  !*** ./src/demo/DemoBasicInfiniteSlider.vue?vue&type=script&lang=js& ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DemoBasicInfiniteSlider_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/babel-loader/lib!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./DemoBasicInfiniteSlider.vue?vue&type=script&lang=js& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/demo/DemoBasicInfiniteSlider.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DemoBasicInfiniteSlider_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/demo/DemoBasicInfiniteSlider.vue?");

/***/ }),

/***/ "./src/demo/DemoBasicInfiniteSlider.vue?vue&type=template&id=16e7550d&":
/*!*****************************************************************************!*\
  !*** ./src/demo/DemoBasicInfiniteSlider.vue?vue&type=template&id=16e7550d& ***!
  \*****************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DemoBasicInfiniteSlider_vue_vue_type_template_id_16e7550d___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./DemoBasicInfiniteSlider.vue?vue&type=template&id=16e7550d& */ \"./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/demo/DemoBasicInfiniteSlider.vue?vue&type=template&id=16e7550d&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DemoBasicInfiniteSlider_vue_vue_type_template_id_16e7550d___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DemoBasicInfiniteSlider_vue_vue_type_template_id_16e7550d___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/demo/DemoBasicInfiniteSlider.vue?");

/***/ }),

/***/ "./src/demo/DemoBasicSlider.vue":
/*!**************************************!*\
  !*** ./src/demo/DemoBasicSlider.vue ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _DemoBasicSlider_vue_vue_type_template_id_5937104e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DemoBasicSlider.vue?vue&type=template&id=5937104e& */ \"./src/demo/DemoBasicSlider.vue?vue&type=template&id=5937104e&\");\n/* harmony import */ var _DemoBasicSlider_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DemoBasicSlider.vue?vue&type=script&lang=js& */ \"./src/demo/DemoBasicSlider.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _DemoBasicSlider_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _DemoBasicSlider_vue_vue_type_template_id_5937104e___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _DemoBasicSlider_vue_vue_type_template_id_5937104e___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/demo/DemoBasicSlider.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/demo/DemoBasicSlider.vue?");

/***/ }),

/***/ "./src/demo/DemoBasicSlider.vue?vue&type=script&lang=js&":
/*!***************************************************************!*\
  !*** ./src/demo/DemoBasicSlider.vue?vue&type=script&lang=js& ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DemoBasicSlider_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/babel-loader/lib!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./DemoBasicSlider.vue?vue&type=script&lang=js& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/demo/DemoBasicSlider.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DemoBasicSlider_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/demo/DemoBasicSlider.vue?");

/***/ }),

/***/ "./src/demo/DemoBasicSlider.vue?vue&type=template&id=5937104e&":
/*!*********************************************************************!*\
  !*** ./src/demo/DemoBasicSlider.vue?vue&type=template&id=5937104e& ***!
  \*********************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DemoBasicSlider_vue_vue_type_template_id_5937104e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./DemoBasicSlider.vue?vue&type=template&id=5937104e& */ \"./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/demo/DemoBasicSlider.vue?vue&type=template&id=5937104e&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DemoBasicSlider_vue_vue_type_template_id_5937104e___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DemoBasicSlider_vue_vue_type_template_id_5937104e___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/demo/DemoBasicSlider.vue?");

/***/ }),

/***/ "./src/demo/DemoSliderPagination.vue":
/*!*******************************************!*\
  !*** ./src/demo/DemoSliderPagination.vue ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _DemoSliderPagination_vue_vue_type_template_id_dd634cbe_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DemoSliderPagination.vue?vue&type=template&id=dd634cbe&scoped=true& */ \"./src/demo/DemoSliderPagination.vue?vue&type=template&id=dd634cbe&scoped=true&\");\n/* harmony import */ var _DemoSliderPagination_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DemoSliderPagination.vue?vue&type=script&lang=js& */ \"./src/demo/DemoSliderPagination.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _DemoSliderPagination_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _DemoSliderPagination_vue_vue_type_template_id_dd634cbe_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _DemoSliderPagination_vue_vue_type_template_id_dd634cbe_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  \"dd634cbe\",\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/demo/DemoSliderPagination.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/demo/DemoSliderPagination.vue?");

/***/ }),

/***/ "./src/demo/DemoSliderPagination.vue?vue&type=script&lang=js&":
/*!********************************************************************!*\
  !*** ./src/demo/DemoSliderPagination.vue?vue&type=script&lang=js& ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DemoSliderPagination_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/babel-loader/lib!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./DemoSliderPagination.vue?vue&type=script&lang=js& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/demo/DemoSliderPagination.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DemoSliderPagination_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/demo/DemoSliderPagination.vue?");

/***/ }),

/***/ "./src/demo/DemoSliderPagination.vue?vue&type=template&id=dd634cbe&scoped=true&":
/*!**************************************************************************************!*\
  !*** ./src/demo/DemoSliderPagination.vue?vue&type=template&id=dd634cbe&scoped=true& ***!
  \**************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DemoSliderPagination_vue_vue_type_template_id_dd634cbe_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./DemoSliderPagination.vue?vue&type=template&id=dd634cbe&scoped=true& */ \"./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/demo/DemoSliderPagination.vue?vue&type=template&id=dd634cbe&scoped=true&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DemoSliderPagination_vue_vue_type_template_id_dd634cbe_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DemoSliderPagination_vue_vue_type_template_id_dd634cbe_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/demo/DemoSliderPagination.vue?");

/***/ }),

/***/ "./src/scss/vue-dynamic-slider.scss":
/*!******************************************!*\
  !*** ./src/scss/vue-dynamic-slider.scss ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--8-oneOf-3-1!../../node_modules/postcss-loader/src??ref--8-oneOf-3-2!../../node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-3-3!./vue-dynamic-slider.scss */ \"./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./src/scss/vue-dynamic-slider.scss\");\nif(typeof content === 'string') content = [[module.i, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = __webpack_require__(/*! ../../node_modules/vue-style-loader/lib/addStylesClient.js */ \"./node_modules/vue-style-loader/lib/addStylesClient.js\").default\nvar update = add(\"cd872200\", content, false, {\"sourceMap\":false,\"shadowMode\":false});\n// Hot Module Replacement\nif(false) {}\n\n//# sourceURL=webpack:///./src/scss/vue-dynamic-slider.scss?");

/***/ })

/******/ });