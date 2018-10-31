/**
 * Simple slider funcitonality
 * 
 * slide left or right through items (of arbitrary width)
 * 
 * opts:
 *  step - how many items to step through on each next/prev
 * 
 * actions: next, prev
 * 
 */
$.bop.plugin({
  name:'bopSlider',
  init:function(opts){
    var $main = this;
    var main = $main.get(0);
    var $items = $main.find('>.slider-inner>.slider-item');

    main.bopSlider = {pos:0, atStart:true, atEnd:false, isMoving:false, isTransitionMoving:false};

    var indent = 0;
    $items.each(function(){
      var $item = $(this);
      $item.css('left', indent+'px');
      indent += $item.width();
    }).css('position', 'absolute');

    $items.first().on('transitionstart', function(){
      $(this).one('transitionend', function(){
        main.bopSlider.isTransitionMoving = false;
      });
      main.bopSlider.isTransitionMoving = true;
    });
  },
  actionEach:function(action, opts){
    var main = this;

    if(main.bopSlider.isMoving || main.bopSlider.isTransitionMoving){
      return;
    }

    main.bopSlider.isMoving = true;

    var step = opts.step;
    var $main = $(main);
    var $inner = $main.find('>.slider-inner');
    var $items = $inner.find('>.slider-item');

    //move rightward
    function moveItems($items, disp){
      //move it
      $items.each(function(){
        var $item = $(this);
        $item.css('left', $item.position().left - disp);
      });
    }

    switch(action){
      case 'next':
        main.bopSlider.atStart = false;
        if(!main.bopSlider.atEnd){

          if($items.length > main.bopSlider.pos){

            //distance to move
            var moveDist = 0;
            var $firstItems = $items.slice(main.bopSlider.pos, main.bopSlider.pos + step);
            $firstItems.each(function(){
              moveDist += $(this).width();
            });

            //if not enough distance remaining, only move that
            var $lastItem = $items.last();
            var remainder = $lastItem.position().left + $lastItem.width() - $inner.width();
            if(remainder <= moveDist){
              moveDist = remainder;
              main.bopSlider.atEnd = true;
            }

            moveItems($items, moveDist);

            //update where we are
            main.bopSlider.pos += step;
          }

        }
      break;
      case 'prev':
        main.bopSlider.atEnd = false;
        if(!main.bopSlider.atStart){
          if(main.bopSlider.pos > 0){
            if(main.bopSlider.pos < step){
              main.bopSlider.pos = 0;
            }else{
              main.bopSlider.pos -= step;
            }

            var $newFirst = $items.eq(main.bopSlider.pos);

            moveItems($items, $newFirst.position().left);

            main.bopSlider.atStart = main.bopSlider.pos == 0;
          }
        }
      break;
    }

    main.bopSlider.isMoving = false;
  },
  defaults:{
    step:1
  }
});
