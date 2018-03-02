//fitTextToBox - Change font-size to div plugin
{
  name:'fitTextToBox',
  init:function(){
    var $this = $(this);
    $(window).on('resize', function(){
      $this.fitTextToBox();
    });
    $this.fitTextToBox();
  },
  run:function(){
    return this.each(function(){
      var height = $(this).height();

      var formerOverflow = this.style.overflowY;
      this.style.overflowY = 'scroll';

      var fs, lines = 0;
      do{
        ++lines;
        fs = (height/lines)+'px';
        this.style.fontSize = fs;
        this.style.lineHeight = fs;
      }while(this.clientHeight < this.scrollHeight);

      //for unusual bits of text that cause a blank line
      if(lines > 1){
        this.style.lineHeight = (height/(lines-1))+'px';
        if(this.clientHeight < this.scrollHeight){
          this.style.lineHeight = fs;
        }
      }

      this.style.overflowY = formerOverflow;
    });
  }
}
