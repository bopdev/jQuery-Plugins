(function($){
  'use strict';
  
  /**
	 * function bopJQPlugin
	 * 
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
  function bopJQPlugin(){
    //allow arbitrary plugins to be set together
    if(arguments.length > 1){
      for(var i=0; i<arguments.length; i++){
        bopJQPlugin(arguments[i]);
      }
      return;
    }
    var plugin = arguments[0];
    
    //set jquery function
    $.fn[plugin.name] = function(optsOrAction){
      
      //set options
      if(typeof optsOrAction == 'object'){
        var opts = optsOrAction;
        
        var defaults = {};
        if(typeof plugin.defaults == 'object'){
          defaults = plugin.defaults;
        }
        
        opts = $.extend({}, defaults, opts);
        this.each(function(){
          if(typeof this.bopOpts == 'undefined'){
            this.bopOpts = {};
          }
          this.bopOpts[plugin.name] = opts;
        });
        
        //run init
        if(typeof plugin.init == 'function'){
          var initFn = plugin.init.bind(this);
          return initFn(opts, plugin);
        }
        
        return this;
      }
      
      //ooo principle
      function getOpts(el){
        var opts = {};
        if(typeof el != 'undefined' && typeof el.bopOpts != 'undefined' && typeof el.bopOpts[plugin.name] != 'undefined'){
          opts = el.bopOpts[plugin.name];
        }
        return opts;
      }
      
      //run action
      if(typeof optsOrAction == 'string'){
        var action = optsOrAction;
        if(typeof plugin.action == 'function'){
          var actionFn = plugin.action.bind(this);
          return actionFn(action, getOpts(this.get(0)), plugin);
        }else if(typeof plugin.actionEach == 'function'){
          this.each(function(){
            var actionFn = plugin.actionEach.bind(this);
            actionFn(action, getOpts(this), plugin);
          });
          return this;
        }
      }
      
      //run with no args
      if(typeof optsOrAction == 'undefined' && typeof plugin.run == 'function'){
        var runFn = plugin.run.bind(this);
        return runFn(getOpts(this.get(0)), plugin);
      }
    };
  }
  
  //init data functions
  $(document).ready(function(){
    $('[data-bop-fn]').each(function(){
      var $this = $(this);
      var fn = $this.data('bop-fn');
      if(typeof $this[fn] == 'function'){
        $this[fn]($this.data());
      }
    });
  });
})(jQuery);
