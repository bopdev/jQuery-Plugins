//animated - animated.css toggling plugin
//requires Modernizr csstransforms3d csstransforms cssanimations
(function($, M){
  $.bop.plugin({
    name:'animated',
    init:function(opts){
      if(!M.csstransforms3d || !M.csstransforms || !M.cssanimations){
        return this;
      }

      var $this = $(this),
        status = {moving:'moving', stopped:'static'},
        animationEndEvent = 'webkitAnimationEnd mozAnimationEnd oAnimationEnd animationend';

      $this.removeClass(opts.noAnimationClass);
      $this.addClass('animated');

      $this.each(function(){
        this.animatedStatus = status.stopped;
      });

      $this.on(animationEndEvent, function(){
        var $this = $(this);
        if($this.hasClass(opts.animateIn)){
          $this.addClass(opts.inClass).removeClass(opts.animateIn);
        }else if($this.hasClass(opts.animateOut)){
          $this.addClass(opts.outClass).removeClass(opts.animateOut);
        }
        this.animatedStatus = status.stopped;
      });

      if(opts.start == 'out'){
        $this.addClass(opts.outClass).removeClass(opts.animateOut+' '+opts.animateIn+' '+opts.inClass);
      }else{
        $this.addClass(opts.inClass).removeClass(opts.animateOut+' '+opts.animateIn+' '+opts.outClass);
      }
    },
    actionEach:function(action, opts){
      var status = {moving:'moving', stopped:'static'};

      if(typeof this.animatedStatus == 'undefined' || this.animatedStatus == status.moving){
        return this;
      }
      var $this = $(this);

      switch(action){
        case 'in':
          this.animatedStatus == status.moving;
          $this.addClass(opts.animateIn).removeClass(opts.outClass);
        break;
        case 'out':
          this.animatedStatus == status.moving;
          $this.addClass(opts.animateOut).removeClass(opts.inClass);
        break;
        case 'toggle':
          if($this.hasClass(opts.inClass)){
            $this.animated('out');
          }else{
            $this.animated('in');
          }
        break;
      }
    },
    defaults:{
      animateIn:'slideInLeft',
      animateOut:'slideOutLeft',
      inClass:'in',
      outClass:'out',
      noAnimationClass:'no-animation',
      start:'out'
    }
  },
  {
    name:'animatedControl',
    init:function(opts){
      if(!opts.target || !$(opts.target).length){
        return this;
      }
      var $this = $(this);
      $this.on(opts.trigger, function(){
        $(opts.target).animated(opts.action);
      });
    },
    defaults:{
      trigger:'click',
      action:'toggle'
    }
  }
})(jQuery, Modernizr);
