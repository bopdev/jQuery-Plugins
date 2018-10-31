/**
 * Simple swipe funcitonality
 * 
 * Occurs on the body tag (through bubbling). Original targets are
 * available through event data.
 *
 * Events available are 'swipe', 'swipenorth', 'swipeeast',
 * 'swipesouth', 'swipewest'. Direction is the opposite of wind, i.e.,
 * e.g., 'swipewest' is movement from east/right to west/left. 
 * 
 */
$('body').on('touchstart', function(startEvent){
  if(startEvent.originalEvent.touches.length == 1){
    this._bopIsSwiping = true;

    $(this).one('touchend', function(endEvent){
      if(!this._bopIsSwiping) return;

      this._bopIsSwiping = false;

      if(endEvent.originalEvent.touches.length) return;
      if(endEvent.originalEvent.changedTouches.length == 0) return;

      var touchStart = startEvent.originalEvent.touches[0],
        touchEnd = endEvent.originalEvent.changedTouches[0],
        constraints = {
          h:{xmin:30, ymax:30},
          v:{ymin:30, xmax:30}
        },
        events = [],
        eventProps = {relatedTarget:startEvent.target},
        eventData = {startEvent:startEvent, endEvent:endEvent};

      var xmove = touchEnd.screenX - touchStart.screenX,
        ymove = touchEnd.screenY - touchStart.screenY,
        xabs = Math.abs(xmove),
        yabs = Math.abs(ymove);

      if(xabs > constraints.h.xmin && yabs < constraints.h.ymax){
        if(xmove > 0){
          events.push($.Event('swipeeast.bop', eventProps));
        }else{
          events.push($.Event('swipewest.bop', eventProps));
        }
      }else if(yabs > constraints.v.ymin && xabs < constraints.v.xmax){
        if(ymove > 0){
          events.push($.Event('swipesouth.bop', eventProps));
        }else{
          events.push($.Event('swipenorth.bop', eventProps));
        }
      }

      if(events.length)
        events.push($.Event('swipe.bop', eventProps));

      var event;
      while(event = events.pop()){
        $(this).trigger(event, eventData);
      }
    });
  }else{
    this._bopIsSwiping = false;
  }
}).on('touchcancel', function(){
  this._bopIsSwiping = false;
});
