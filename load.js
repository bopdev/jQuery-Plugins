(function($){
  'use strict';
  
  if(!$.hasOwnProperty('bop')) $.bop = {};
  
  /**
   * function $.bop.plugin
   * 
   * version: 1.0.1
   * 
   * bsJQPlugin(plugin [, ...plugins])
   * 
   * @param object plugin - the object definition of the plugin
   * 	(required)
   * @param objects plugins - arbitrary no. of further plugin defintions
   * 	(optional)
   * @return null
   * 
   * @object plugin
   * {
   *   init: function(opts) - run when options(object) are set
   *     this - jquery object (potentially multiple elements)
   *     (optional)
   *   action: function(action, opts) - run when action(string) given
   *     this - jquery object (potentially multiple elements)
   *     (optional)
   *   actionEach: function(action, opts) - run when action(string) given
   *     this - element
   *     (optional) n.b. will not run when action defined
   *   run: function() - run when no arguments are given
   *     this - jquery object (potentially multiple elements)
   *     (optional)
   *   defaults: object - default options
   * }
   */
  $.bop.plugin = function(){
    //allow arbitrary plugins to be set together
    if(arguments.length > 1){
      for(var i=0; i<arguments.length; i++){
        $.bop.plugin(arguments[i]);
      }
      return;
    }
    var plugin = arguments[0];
    
    //set jquery function
    $.fn[plugin.name] = function(optsOrAction){
      
      var obTypeStr = 'object',
        undefTypeStr = 'undefined',
        fnTypeStr = 'function',
        strTypeStr = 'string',
        bopOptsKey = 'bopOpts';
      
      //set options
      if(typeof optsOrAction == obTypeStr){
        var opts = optsOrAction;
        
        var defaults = {};
        if(typeof plugin.defaults == obTypeStr){
          defaults = plugin.defaults;
        }
        
        opts = $.extend({}, defaults, opts);
        this.each(function(){
          if(typeof this[bopOptsKey] == undefTypeStr){
            this[bopOptsKey] = {};
          }
          this[bopOptsKey][plugin.name] = opts;
        });
        
        //run init
        if(typeof plugin.init == fnTypeStr){
          var initFn = plugin.init.bind(this);
          return initFn(opts, plugin);
        }
        
        return this;
      }
      
      //ooo principle
      function getOpts(el){
        var opts = {};
        if(typeof el != undefTypeStr && typeof el[bopOptsKey] != undefTypeStr && typeof el[bopOptsKey][plugin.name] != undefTypeStr){
          opts = el[bopOptsKey][plugin.name];
        }
        return opts;
      }
      
      //run action
      if(typeof optsOrAction == strTypeStr){
        var action = optsOrAction;
        if(typeof plugin.action == fnTypeStr){
          var actionFn = plugin.action.bind(this);
          return actionFn(action, getOpts(this.get(0)), plugin);
        }else if(typeof plugin.actionEach == fnTypeStr){
          this.each(function(){
            var actionFn = plugin.actionEach.bind(this);
            actionFn(action, getOpts(this), plugin);
          });
          return this;
        }
      }
      
      //run with no args
      if(typeof optsOrAction == undefTypeStr && typeof plugin.run == fnTypeStr){
        var runFn = plugin.run.bind(this);
        return runFn(getOpts(this.get(0)), plugin);
      }
    };
  }
  
  $.bop.plugin(
    {
      name:'bindBopDataFns',
      run:function(){
        this.find('[data-bop-fn]').each(function(){
          var $this = $(this);
          var fn = $this.data('bop-fn');
          if(typeof $this[fn] == 'function'){
            $this[fn]($this.data());
          }
        });
      }
    }
  );
  //init data functions
  $(document).ready(function(){
    $(this).bindBopDataFns();
  });
  
})(jQuery);
