//fade in on scroll into view
//requires animated css library
(function($){
  $.bop.plugin({
    name: 'opacityScroll',
    init: function(opts){
      var $el = this;
      $el.css('opacity', '0');
      document.opacityScrollPaused = false;
      $(window).on('scroll', function(){
        $el.opacityScroll();
      });
      $el.opacityScroll();
    },
    run: function(opts, plugin){
      this.each(function(){
        var $this = $(this);
        if($this.is(':visible') && plugin.isElementInViewport(this) && !document.opacityScrollPaused){
          $this.css('opacity', '');
          $this.addClass('animated fadeIn');
        }
      });
    },
    //https://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport/7557433#7557433
    //modified for if partly in view
    isElementInViewport: function(el){
      var rect = el.getBoundingClientRect(),
        vh = (window.innerHeight || document.documentElement.clientHeight),
        vw = (window.innerWidth || document.documentElement.clientWidth);
      return (
        //in vertically
        (
          (rect.top <= vh && rect.top >= 0) ||
          (rect.bottom <= vh && rect.bottom >= 0)
        ) &&
        //in horizontally
        (
          (rect.left <= vw && rect.left >= 0) ||
          (rect.right <= vw && rect.right >= 0)
        )
      );
    }
  });
})(jQuery);
