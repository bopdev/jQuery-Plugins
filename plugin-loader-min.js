!function(t){"use strict";t.hasOwnProperty("bop")||(t.bop={}),t.bop.plugin=function(){if(arguments.length>1)for(var n=0;n<arguments.length;n++)t.bop.plugin(arguments[n]);else{var i=arguments[0];t.fn[i.name]=function(n){var e="object",o="undefined",f="function",a="string",p="bopOpts";if(typeof n==e){var u=n,r={};return typeof i.defaults==e&&(r=i.defaults),u=t.extend({},r,u),this.each(function(){typeof this[p]==o&&(this[p]={}),this[p][i.name]=u}),typeof i.init==f?i.init.bind(this)(u,i):this}function s(t){var n={};return typeof t!=o&&typeof t[p]!=o&&typeof t[p][i.name]!=o&&(n=t[p][i.name]),n}if(typeof n==a){var h=n;if(typeof i.action==f)return i.action.bind(this)(h,s(this.get(0)),i);if(typeof i.actionEach==f)return this.each(function(){i.actionEach.bind(this)(h,s(this),i)}),this}if(typeof n==o&&typeof i.run==f)return i.run.bind(this)(s(this.get(0)),i)}}},t.bop.plugin({name:"bindBopDataFns",run:function(){this.find("[data-bop-fn]").each(function(){var n=t(this),i=n.data("bop-fn");"function"==typeof n[i]&&n[i](n.data())})}}),t(document).ready(function(){t(this).bindBopDataFns()})}(jQuery);
