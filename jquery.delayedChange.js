/*
  Plugin for the "delayedChange()" functionality
  
  Instead of listening for an event on keyup or change, we want
  to listen for the user to make a change, delay to see if they have anything else
  to say before acting on it.
  
  Example:
  
    $('#search').delayedChange(function(){
      $.getJSON('/search', {query: $(this).val()}, function(){
        // update search results...
      });
    });
*/
(function($){
  /*
    Plugin functionality
  */
  var methods = {
    
    /*
      Initalize this element with delayed change
      
      Options include:
      
        delay: the amount of time in ms to delay the change
    */
    init: function(fn, options){
      
      var data = {
        changeFunction: fn,
        delay: 500,
        previousValue: '',
        timeout: null,
      }
      
      data = $.extend({}, data, options);
      
      // add the event handlers
      $(this).keyup(methods.timeout)
        .click(methods.timeout)
        .blur(methods.timeout)
        .bind('search', methods.timeout)
        .change(methods.timeout);
      $(this).data('delayedChange', data);
    },
    
    /*
      The input has changed (maybe)
    */
    changed: function(){
      window.console.log(this)
      var data = $(this).data('delayedChange');

      // Only apply the change if there value of the input is different than the previous value
      // This is important since we are using keyup and that can detect things like key presses of modifier
      // keys like shitf, command, etc.
      if(!data.previousValue || data.previousValue != $(this).val()){
        // call our function
        data.changeFunction.apply(this);
        
        // save the previous value
        data.previousValue = $(this).val();
        $(this).data('delayedChange', data);
        $(this).trigger('delayedChange');
      }
    },
    
    /*
      Called when a change is registered. Sets our timeout
    */
    timeout: function(){
      var $this = $(this);
      var data = $this.data('delayedChange');

      // clear the existing timeout, if it exists
      window.clearTimeout(data.timeout);
      
      // create the timeout and save it to the element
      data.timeout = window.setTimeout(
        function(){ methods.changed.apply($this); }, 
        data.delay
      );
      $(this).data('delayedChange', data);
    }
  }
  
  /*
    Register our plugin!
  */
  $.fn.delayedChange = function(method){
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } 
    else if ( typeof method == 'function' || typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } 
    else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.delayedChange' );
    }
  }
  
})(jQuery);