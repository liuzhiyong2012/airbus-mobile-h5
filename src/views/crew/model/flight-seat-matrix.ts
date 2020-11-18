export default class FlightSeatMatrix{
	
	private  layoutInfo:any ={};
	
	constructor(seatArr:Array<any>){
		this.calcSeatArr(seatArr);
	}
	
	calcSeatArr(seatArr){
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
				
			},
			userSeatTypeMap:{
				
			}
			
		}
		
		seatArr.forEach((item,index)=>{
			if(item.UserId){
				layoutInfo.userSeatTypeMap[item.UserId] = item.SeatType;
			}
			
			
			if(!layoutInfo.seatType.valueToName[item.SeatType]){
				let seatTypeName = ''
				if(item.SeatType==1){
					seatTypeName = 'First Class-F'
				}else if(item.SeatType==2){
					seatTypeName = 'Economy Class-Y'
				}else if(item.SeatType==3){
					seatTypeName = 'Business Class-C'
				}
				// layoutInfo.seatType.valueToName[item.SeatType] = '座位类型' + item.SeatType;
				layoutInfo.seatType.valueToName[item.SeatType] = seatTypeName;
				layoutInfo.seatType.valueArr.push(item.SeatType);
				
				layoutInfo.seatTypeMap[item.SeatType] = {};
				// layoutInfo.seatTypeUserMap[item.SeatType] = {};
				
				layoutInfo.seatTypeRow[item.SeatType] = [];
			}
			
			if(!layoutInfo.sectionMap[item.SeatType]){
				layoutInfo.sectionMap[item.SeatType] = {};
			}
			if(!layoutInfo.sectionMap[item.SeatType][item.Row]){
				layoutInfo.sectionMap[item.SeatType][item.Row] = {};
			}
			if(!layoutInfo.sectionMap[item.SeatType][item.Row][item.Col]){
				layoutInfo.sectionMap[item.SeatType][item.Row][item.Col] = {};
			}
			// if(!layoutInfo.sectionMap[item.SeatType][item.Row][item.Col][item['col-number']]){
			// 	layoutInfo.sectionMap[item.SeatType][item.Row][item.Col][item['col-number']] = item;
			// }
			if(!layoutInfo.sectionMap[item.SeatType][item.Row][item.Col][item.ColNumber]){
				layoutInfo.sectionMap[item.SeatType][item.Row][item.Col][item.ColNumber] = item;
			}
			
			layoutInfo.seatTypeMap[item.SeatType][item.Id] = item;
			// layoutInfo.seatTypeUserMap[item.SeatType][item.UserId] = item;
		});
	
		let sectionArr = [];
		layoutInfo.seatType.valueArr.forEach((seatType,seatTypeIndex)=>{
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
				
				rowArr.push(rowItem);
			});
			sectionArr.push(rowArr);
		});
		
		layoutInfo.sectionArr = sectionArr;
		layoutInfo.maxSeatLen = this.calcMaxSeatLen(layoutInfo);
		
		this.layoutInfo = layoutInfo;
		
	}
	
	//计算飞机座舱的最大宽度
	calcMaxSeatLen(layoutInfo){
		let seatTypeColumn = {
			'1':1,
			'2':1,
			'3':1
		};
		let layoutSeatLen = 0;
		layoutInfo.sectionArr.forEach((sectionItem,index)=>{
		
			let seactionSeatLen = 0;
			let seatTypeColumnLen = seatTypeColumn[layoutInfo.seatType.valueArr[index]];
			sectionItem.forEach((row,rowIndex)=>{
				
			    let seatCount = 0;
				row.forEach((col,colIndex)=>{
					seatCount = seatCount + col.length;
				});
				
				let rowLen = seatCount + (row.length - 1) * seatTypeColumnLen;  //很重要
				
				if(rowLen > seactionSeatLen){
					seactionSeatLen = rowLen;
				}
			});
			
			if(seactionSeatLen > layoutSeatLen ){
				layoutSeatLen = seactionSeatLen
			}
			
		});
		return layoutSeatLen;
		
	}
	
	
	public getLayoutInfo(){
		return this.layoutInfo;
	}
	
	
	 
	
}