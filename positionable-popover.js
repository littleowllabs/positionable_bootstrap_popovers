/* ========================================================================
 * Modified version of Bootstrap popover.js v3.0.0 that can be positioned
 * relative to a parent element with the arrow pointing at the target.
 *
 * Released under the same licence as the original, original details below.
 * ========================================================================
 * Copyright 2013 LittleOwlLabs
 * ======================================================================== */

/* ========================================================================
 * Bootstrap: popover.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#popovers
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var PositionablePopover = function (element, options) {
    this.init('positionablePopover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('PositionablePopover requires tooltip.js')

  PositionablePopover.DEFAULTS = $.extend({} , $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right'
  , trigger: 'click'
  , content: ''
  , template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  , positioningElement: ''
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  PositionablePopover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  PositionablePopover.prototype.constructor = PositionablePopover

  PositionablePopover.prototype.getDefaults = function () {
    return PositionablePopover.DEFAULTS
  }

  PositionablePopover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content')[this.options.html ? 'html' : 'text'](content)

    $tip.removeClass('fade top bottom left right bottomleft in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  PositionablePopover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  PositionablePopover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  PositionablePopover.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find('.arrow')
  }

  PositionablePopover.prototype.positionArrow = function () {
    var $e = this.$element
    var el = $e[0]

    var popoverPos = this.getPosition()

    var myPos = $.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : {
      width: el.offsetWidth
    , height: el.offsetHeight
    }, $e.offset())

    this.arrow().css('left', Math.max(14, myPos.left - popoverPos.left + myPos.width/2))
  }

  PositionablePopover.prototype.applyPlacement = function(offset, placement) {
    $.fn.tooltip.Constructor.prototype.applyPlacement.call(this, offset, placement)
    this.positionArrow()
  }

  PositionablePopover.prototype.tip = function () {
    if (!this.$tip) this.$tip = $(this.options.template)
    return this.$tip
  }

  PositionablePopover.prototype.getPosition = function () {
    var $e = this.$element
    var $posElem = $($e.attr('data-pos-elem'))
    var el = $posElem[0]
    return $.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : {
      width: el.offsetWidth
    , height: el.offsetHeight
    }, $posElem.offset())
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  var old = $.fn.positionablePopover

  $.fn.positionablePopover = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.positionable-popover')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.positionable-popover', (data = new PositionablePopover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.positionablePopover.Constructor = PositionablePopover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.positionablePopover.noConflict = function () {
    $.fn.positionablePopover = old
    return this
  }

}(window.jQuery);