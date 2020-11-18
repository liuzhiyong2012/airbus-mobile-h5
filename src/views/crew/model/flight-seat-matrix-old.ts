export default class FlightSeatMatrix{
	
	private  layoutInfo:any ={};
	private  layoutArr:any ={};
	
	constructor(seatArr:Array<any>){
		this.calcSeatArr(seatArr);
	}
	
	calcSeatArr(seatArr){
		let seatMap = {};
		seatArr.forEach((item,index)=>{
			if(!seatMap[item.row]){
				seatMap[item.row] = {};
			}
			
			if(!seatMap[item.row][item.col]){
				seatMap[item.row][item.col] = [];
			}
			
			seatMap[item.row][item.col].push(item);
		});
		
		//层级
		let layout = [];
		let rowKeys = Object.keys(seatMap);
		let sectionArr = [];
		let lastRowKey = '0'; 
		
		let a ={
			sectionLen:[],
			typeCount:{}
			
		}
		
		rowKeys.forEach((rowKey:any,rowIndex:number)=>{
			rowKey = Number(rowKey);
			if(Number(rowKey) - Number(lastRowKey) >1&&lastRowKey!='0'){
				layout.push(sectionArr);
				sectionArr = [];
			}
			
			lastRowKey = rowKey;
			let colKeys = Object.keys(seatMap[rowKey]); 
			
			let rowArr = [];
			colKeys.forEach((colKey,colIndex)=>{
				rowArr.push(seatMap[rowKey][colKey]);
			});
			
			sectionArr.push(rowArr);
			
			
			if(rowIndex == rowKeys.length -1){
				layout.push(sectionArr);
			}
		});
		
		this.layoutArr = layout;
	}
	
	public getLayoutArr(){
		return this.layoutArr;
	}
	
	 
	
}