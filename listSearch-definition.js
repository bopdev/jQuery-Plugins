//listSearch - list text searching plugin
(function($){
  $.bop.plugin({
    name:'listSearch',
    init:function(opts){
      if(!opts.target || !$(opts.target).length){
        return this;
      }
      this.each(function(){
        var $this = $(this);
        if(opts.trigger){
          $this.on(opts.trigger, function(){
            var $this = $(this);
            $this.listSearch($this.val());
          });
        }
      });
      return this;
    },
    actionEach:function(search, opts, plugin){
      if(!opts.target || !$(opts.target).length){
        return this;
      }
      var $this = $(this);
      var needle = search.toLowerCase().split(' ');
      var $items = $(opts.target).find(opts.itemSelector);
      
      var outClass = opts.outClass;
      var outCssProp = 'display', outCssVal = 'none';
      
      var searchFns = {
        firstLetter: function(needle, haystack){
          var bool = true;
          if(!Array.isArray(needle)){
            needle = [needle];
          }
          
          haystack.trim();
          
          var escapedNeedle;
          for(var i=0; i<needle.length; i++){
            escapedNeedle = plugin.regexEsc(needle[i]);
            if(haystack.search(new RegExp('^'+escapedNeedle+'|\\s'+escapedNeedle)) == -1){
              bool = false;
              break;
            }
          }
          
          return bool;
        },
        any: function(needle, haystack){
          var bool = true;
          if(!Array.isArray(needle)){
            needle = [needle];
          }
        
          for(var i=0; i<needle.length; i++){
            if(haystack.indexOf(needle[i]) == -1){
              bool = false;
              break;
            }
          }
          
          return bool;
        }
      };
      
      var fn = searchFns.hasOwnProperty(opts.searchMethod) ? opts.searchMethod : plugin.defaults.searchMethod;
      
      $items.each(function(){
        var $item = $(this);
        var haystack = $item.text().toLowerCase();
        var out = ! searchFns[fn](needle, haystack);
        
        if(out){
          if(outClass){
            $item.addClass(outClass);
          }else{
            $item.css(outCssProp,outCssVal);
          }
        }else{
          if(outClass){
            $item.removeClass(outClass);
          }else{
            $item.css(outCssProp,'');
          }
        }
      });
      return this;
    },
    defaults:{
      trigger:'input',
      outClass:'',
      itemSelector:'li',
      searchMethod:'firstLetter'
    },
    regexEsc: function(string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
  });
})(jQuery);
