//showMore - overflow adjustment plugin
(function($){
  $.bop.plugin({
    name:'showMore',
    init:function(opts){
      var $btn = $(this);
      var target = $(opts.target).get(0);
      if(target.clientHeight >= target.scrollHeight){
        $btn.hide();
      }
      $btn.data('text', $btn.text());
      $btn.on(opts.trigger, function(e){
        if(opts.preventDefault){
          e.preventDefault();
        }
        $(this).showMore('toggle');
      });
    },
    actionEach:function(action, opts){
      var $target = $(opts.target);
      var target = $target.get(0);
      var $btn = $(this);
      var hasAlt = typeof opts.altText == 'string' && opts.altText;

      switch(action){
        case 'show':
          $target.height(target.scrollHeight);
          $target.add($btn).addClass('showing-more');
          if(hasAlt){
            $btn.text(opts.altText);
          }
        break;
        case 'hide':
          if(opts.canHide){
            $target.css('height', '');
            $target.add($btn).removeClass('showing-more');
            if(hasAlt){
              $btn.text($btn.data('text'));
            }
          }
        break;
        case 'toggle':
          if(target.clientHeight < target.scrollHeight){
            $btn.showMore('show');
          }else{
            $btn.showMore('hide');
          }
        break;
      }
    },
    defaults:{
      trigger:'click',
      canHide:true,
      preventDefault:true
    }
  });
})(jQuery);
