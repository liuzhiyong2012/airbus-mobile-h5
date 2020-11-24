;(function () {
    /**
     * 6.4=设计稿尺寸/100
     * css元素尺寸=设计稿元素尺寸/100;
     */
    var change = 'orientationchange' in window ? 'orientationchange' : 'resize';
    function calculate() {
		// debugger;
		var deviceWidth = document.documentElement.clientWidth;
		if(window.innerWidth >= window.innerHeight){
			document.documentElement.style.fontSize = deviceWidth / 9.6 + 'px';
			if(window.innerWidth > 1440){
				document.documentElement.style.fontSize = 1440/ 9.6 + 'px';
			}
		}else{
			
			if (deviceWidth < 320) {
			    deviceWidth = 320;
			} else if (deviceWidth > 750) {
			    deviceWidth = 750;
			}
			document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';
		}
    };
	
    if('addEventListener' in window){
    	window.addEventListener(change, calculate, false);
    }
    if(document.documentElement.clientWidth){
    	calculate();
    }else{
    	setTimout(calculate,100);
    }
})();