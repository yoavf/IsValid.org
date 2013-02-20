## What is this?

IsValid automates statistical tests for A/B experiments.  It will calculate significance and confidence intervials.

In short, you can use it to figure out what, if anything, the result of an A/B test means.

## How can I use it?

I host this exact code at [isvalid.org](http://isvalid.org).  If you want, you can host it yourself.

There is also an API (which you could host yourself!) that you can read about [here](https://github.com/evansolomon/IsValid.org/wiki/API).

## Development

IsValid uses [Grunt](http://gruntjs.com/) to concatenate and minify JavaScript.  It also uses [grunt-coffee](https://github.com/avalade/grunt-coffee) to compile CoffeeScript via Grunt.  A simple `npm install` will take care of both dependencies.

## Bookmarklet

You can send data to IsValid with a handy browser bookmarklet using this as the URL:

    javascript:(function(){var e={init:function(){if(window.jQuery)e.ready();else{var t=document.createElement("script");t.type="text/javascript",t.src="//ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js",t.onload=t.onreadystatechange=function(){this.readyState&&"loaded"!=this.readyState&&"complete"!=this.readyState||e.ready()},document.getElementsByTagName("head")[0].appendChild(t)}},ready:function(){e.reset(),e.header.create(),jQuery(document).click(e.click),jQuery("*").hover(e.mouseEnter,e.mouseLeave)},click:function(t){var s=t.target.innerHTML,a=parseInt(s.replace(/,/g,""),10);if(e.selectable(a))return console.log(a),e.selected.push(a),jQuery(t.target).css("background-color","rgba(50, 200, 80, 0.7)").addClass("isvalid-clicked"),jQuery(".isvalid-steps").text(e.nextStep()),4==e.selected.length&&(window.open("http://isvalid.org/?sc="+e.selected[0]+"&cc="+e.selected[1]+"&se="+e.selected[2]+"&ce="+e.selected[3]),e.reset()),t.target.style.cursor="default",e.header.update(),!1},mouseLeave:function(e){var t=jQuery(this);t.hasClass("isvalid-clicked")||t.hasClass("isvalid-steps")||t.css("background-color",""),e.target.style.cursor="default"},mouseEnter:function(t){var s=jQuery(this);if(!s.hasClass("isvalid-clicked")){var a=t.target.innerHTML,r=parseInt(a.replace(/,/g,""),10);e.selectable(r)&&(t.stopPropagation(),s.css("background-color","rgba(50, 200, 80, 0.25)"),t.target.style.cursor="pointer")}},selectable:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},nextStep:function(){var t,s=e.selected.length;return t=0===s?"Control samples":1==s?"Control conversions":2==s?"Experiment samples":3==s?"Experiment conversions":"This should never happen","Select: "+t},header:{create:function(){var e=jQuery("<div>");e.css({top:"0px",left:"0px","background-color":"rgba(50, 200, 80, 0.8)","z-index":"10000",width:"100%",height:"60px",position:"fixed","text-align":"center","padding-top":"20px","font-size":"30px"}),e.addClass("isvalid-steps"),e.prependTo("body"),this.update()},update:function(){jQuery(".isvalid-steps").text(e.nextStep())}},reset:function(){jQuery(".isvalid-clicked").removeClass("isvalid-clicked").css("background-color",""),jQuery(document).unbind("click",e.click),jQuery("*").unbind("mouseleave",e.mouseLeave).unbind("mouseenter",e.mouseEnter),jQuery(".isvalid-steps").remove(),e.selected=[]}};e.init()})();
