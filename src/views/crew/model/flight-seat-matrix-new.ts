export default class FlightSeatMatrix{
	
	private  layoutInfo:any ={};
	private  layoutArr:Array<any> = [];
	
	
	constructor(seatArr:Array<any>){
		this.calcSeatArr(seatArr);
	}
	
	calcSeatArr(seatArr){
		// let testArr = {
		// 	Name: "1A",
		// 	UserId: "8f7288d9d6fe403f9ee2fad9f46285d7",
		// 	col: 1,
		// 	col-number: 1,
		// 	id: "1",
		// 	row: 1,
		// 	seatType: 2
		// };
		
		/* let result = {
			seatType:{
				valueArr:[],
				valueToName:{
					
				}
			},
		
			sectionMap:{
				[sectionIndex][rowId][col][col-number]:item
			},
			seatTypeMap:{
				[typeId]:{
					section:12
					item:
				}
			}
		} */
		
		let layoutInfo:any = {
			seatType:{
				valueArr:[],
				valueToName:{
					
				}
			},
			seatTypeRow:{
				
			},
		    
			sectionMap:{
				
			},
			seatTypeMap:{
				
			}
			
		}
		
		seatArr.forEach((item,index)=>{
			if(!layoutInfo.seatType.valueToName[item.seatType]){
				layoutInfo.seatType.valueToName[item.seatType] = '座位类型' + item.seatType;
				layoutInfo.seatType.valueArr.push(item.seatType);
				
				layoutInfo.seatTypeMap[item.seatType] = {};
				layoutInfo.seatTypeMap[item.seatType] = {};
				layoutInfo.seatTypeRow[item.seatType] = {};
			}
			
			
			
			
			// Name: "1A",
			// UserId: "8f7288d9d6fe403f9ee2fad9f46285d7",
			// col: 1,
			// col-number: 1,
			// id: "1",
			// row: 1,
			// seatType: 2
			if(!layoutInfo.sectionMap[item.seatType]){
				layoutInfo.sectionMap[item.seatType] = {};
			}
			if(!layoutInfo.sectionMap[item.seatType][item.row]){
				layoutInfo.sectionMap[item.seatType][item.row] = {};
			}
			if(!layoutInfo.sectionMap[item.seatType][item.row][item.col]){
				layoutInfo.sectionMap[item.seatType][item.row][item.col] = {};
			}
			if(!layoutInfo.sectionMap[item.seatType][item.row][item.col][item['col-number']]){
				layoutInfo.sectionMap[item.seatType][item.row][item.col][item['col-number']] = item;
			}
			
			layoutInfo.seatTypeMap[item.seatType][item.id] = item;
		});
		let sectionArr = {};
		layoutInfo.seatType.valueArr.forEach((seatType,seatTypeIndex)=>{
			if(sectionArr[seatType]){
				sectionArr[seatType] = [];
			}
			let rowArr = [];
			Object.keys(layoutInfo.sectionMap[seatType]).forEach((row,rowIndex)=>{
				layoutInfo.seatTypeRow[seatType].push(row);
				let rowItem = [];
				Object.keys(layoutInfo.sectionMap[seatType][row]).forEach((col,colIndex)=>{
					let colItem = [];
					Object.keys(layoutInfo.sectionMap[seatType][row][col]).forEach((colNumber,colNumberIndex)=>{
						colItem.push(layoutInfo.sectionMap[seatType][row][col][colNumber]);
					});
					rowItem.push(colItem);
				});
				
				sectionArr[seatType] = rowArr.push(rowItem);
			});
			sectionArr[seatType] = rowArr;
		});
	}
	
	
	 
	
}