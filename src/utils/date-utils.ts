

export default {
  formate:function(input:any,formate:string = 'YYYY-MM-DD hh:mm:ss' ){
  	input = input+'';
  	input = input.length==10?input*1000:input;
  	var date:any = new Date(input);
  	var y:any = date.getFullYear();  
  	var m:any= date.getMonth() + 1;  
  	m = m < 10 ? ('0' + m) : m;  
  	var d:any= date.getDate();  
  	d = d < 10 ? ('0' + d) : d;  
  	var h:any= date.getHours();
  	h = h < 10 ? ('0' + h) : h;
  	var minute:any = date.getMinutes();
  	var second:any = date.getSeconds();
  	minute = minute < 10 ? ('0' + minute) : minute;  
  	second = second < 10 ? ('0' + second) : second; 
  	
  	if(formate == 'YYYY-MM-DD hh:mm:ss'){
  		return y + '-' + m + '-' + d +' '+ h +':'+ minute +':' + second;  
  	}else if(formate == 'hh:mm')
  	{
  		return h +':'+ minute;  
  	}
  	else
  	{
  	    return y + '-' + m + '-' + d +' '+ h +':'+ minute +':' + second;  
  	}
  },
  calcRemaingTime(DepartureTime,ArrivalTime,CurrentTime){
  	  let startTime = CurrentTime?new Date(DepartureTime * 1000):new Date(DepartureTime * 1000);
  	  let entTime = new Date(ArrivalTime * 1000);
  	  let remaingTime:number = entTime.getTime() - startTime.getTime();
  	  let hour:number =(remaingTime/1000) / (60 * 60);
  	  let mimute:number = ((remaingTime/1000) % (60 * 60) )/60;
  	  
  	  return {
  		  hour:hour.toFixed(0),
  		  mimute:mimute.toFixed(0)
  	  };
  },
  calcRemaingTimeByRtppd(Rtppd){
      
  	  let remaingTime:number = Number(Rtppd);
	  
  	  let hour:number = Rtppd/60;
  	  let mimute:number = (Rtppd%60) % 60;
  	  
  	  return {
  		  hour:hour.toFixed(0),
  		  mimute:mimute.toFixed(0)
  	  };
  }
}
