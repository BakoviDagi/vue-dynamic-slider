# vue-dynamic-slider

##### 0.6.0
  - `ISSUE#8`: Add `breakpointElement` prop that allows for breakpoints to be reactive to something other than the window

##### 0.5.1
  - Fix bug when scolling by pages in infinite scroll
  - Use a new throttle function

##### 0.5.0
  - Add autoplay functionality
  - Keep track of user scroll direction to always scroll the right way

##### 0.4.0
  - `ISSUE#5`: Fix scrolling behaviour to be smooth when moving at the beginning and end

##### 0.3.2
  - `ISSUE#4`: Add `scrollToPage` slot prop method that scrolls to the current page

##### 0.3.1
  - Fix the publish

##### 0.3.0
  - `ISSUE#1`: Add `pagination` slot prop that has number of pages and current page
  - `ISSUE#2`: Add `scrollIncrement` prop that sets the number of slides that are scrolled at a time
  - `ISSUE#3`: Add `slidesInView` slot prop that's an array of visible slide indices
  - Handle touch devices better

##### 0.2.0
  - Clean up and optimize code
  - Add option to override scrolling function
  - Add demo code for the Github Pages site

##### 0.1.2
  - Fix webpack build by allowing named exports
  - Add classes and stylesheet