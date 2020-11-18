;(function () {
    /**
     * 6.4=设计稿尺寸/100
     * css元素尺寸=设计稿元素尺寸/100;
     */
    var change = 'orientationchange' in window ? 'orientationchange' : 'resize';
    function calculate() {
		// debugger;
        var deviceWidth = document.documentElement.clientWidth;
       /* if (deviceWidth <= 1024) {
            deviceWidth = 1024;
            document.documentElement.style.fontSize = deviceWidth / 10.24 + 'px';
        } else if (deviceWidth > 1024 && deviceWidth <= 1920) {
            deviceWidth = 1920;
            document.documentElement.style.fontSize = deviceWidth / 19.20 + 'px';
        } else if (deviceWidth > 1920 && deviceWidth <= 2048) {
            deviceWidth = 2048;
            document.documentElement.style.fontSize = deviceWidth / 20.48 + 'px';
        } else if (deviceWidth > 2048 && deviceWidth <= 2224) {
            deviceWidth = 2224;
            document.documentElement.style.fontSize = deviceWidth / 22.24 + 'px';
        } else if (deviceWidth > 2224 ) {
            deviceWidth = 2224;
            document.documentElement.style.fontSize = deviceWidth / 22.24 + 'px';
        } */
		  document.documentElement.style.fontSize = deviceWidth / 22.24 + 'px';
        // document.documentElement.style.fontSize = deviceWidth / 22.24 + 'px';
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