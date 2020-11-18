import DateUtils from '../date-utils';
let filter = {
	name:'dateFormate',
	handler:function(input:any,formate:string = 'YYYY-MM-DD hh:mm:ss' ){ 
		return DateUtils.formate(input,formate);
	}
}

export default filter;

