
export default {
  searchIndexByKey:function(arr:Array<any>,key:string,value:any){
	  let retIndex = -1;
	  
	  arr.forEach((item,index)=>{
		  if(item[key] == value){
			  retIndex = index;
		  }
	  });
	  
	  return retIndex;
  },
  sortByKey:function(arr:Array<any>,key:string,isDesc:boolean=false){
	  arr.sort(function(a,b){
	  	if(isDesc){
	  		return a[key] - b[key];
	  	}else{
	  		return  b[key] - a[key];
	  	}
			
		})
	  
	  return arr;
  }
  
}
