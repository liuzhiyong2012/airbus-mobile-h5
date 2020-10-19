<template>
	<section class="homeflight-main-ctn">
		<div id="homeMap" class="map-ctn" ref="mapCtn">
			<div id="geo-marker"><i class="icon icon-plane"></i></div>
			<div class="map-tag">© <a target="_blank" href="https://www.openstreetmap.org/copyright/en" class="map-tag-color">OpenStreetMap</a> contributors</div>
		</div>
	</section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import FlightService from '../service/flight';

import 'ol/ol.css';
import View from 'ol/View';
import Map from 'ol/Map';
import Feature from 'ol/Feature';
import Overlay from 'ol/Overlay';
import Tile from 'ol/layer/Tile';
import Image from 'ol/layer/Image';
import VectorLayer from 'ol/layer/Vector';
import XYZ from 'ol/source/XYZ';
import WMTS from 'ol/source/WMTS';
import VectorSource from 'ol/source/Vector';
import WFS from 'ol/format/WFS';
import GeoJSON from 'ol/format/GeoJSON';
import OSM from 'ol/source/OSM.js';
import TileWMS from 'ol/source/TileWMS.js';
import ImageWMS from 'ol/source/ImageWMS.js';
import Point from 'ol/geom/Point';
import LineString from 'ol/geom/LineString';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import { transform, fromLonLat, toLonLat } from 'ol/proj';
import ImageStyle from 'ol/style/Image';
import Icon from 'ol/style/Icon';
import Circle from 'ol/style/Circle';

import OverlayPositioning from 'ol/OverlayPositioning';


import ZoomToExtent from 'ol/control/ZoomToExtent';
// import {defaults} from 'ol/control/defaults';
import { defaults } from 'ol/control';

import { buffer } from 'ol/extent';
import DateUtils from '../utils/date-utils';

// import { buffer }  from 'ol/layer';
/* import 'ol/ol.css';
import Feature from 'ol/Feature';
import Map from 'ol/Map';
import View from 'ol/View';
import LineString from 'ol/geom/LineString';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import Stamen from 'ol/source/Stamen';
import VectorSource from 'ol/source/Vector';
import {Stroke, Style} from 'ol/style'; */
// import {getVectorContext} from 'ol/render';

@Component({
	name: 'AbusMap',
	components: {
		
	}
})
export default class AbusMap extends Vue {
	@Prop({
		default:7
	})
	zoom?: string | number;

	private chart: any;
	private map: any;
	private flightInfo: any;
	
	private timeFlag?:any = null;
	private marker:any = null;
	
	private flightPaths:Array<any> = [];
	
	private updateFlightHandler: any = null;
	
	private flightPositionIndex: number = 0;
	
	
	private get isDemo():string{
		return this.$store.state.login.isDemo;
	}
	
	private get airbusId():string{
		return this.$store.state.login.airbusId;
	}
	
	private get flightResData():any{
		return this.$store.state.login.flightInfo;
	}
	

	created() {
	}

	mounted() {
		
		this.getFlightInfo();
		
		//根据是否是demo进行飞机航线绘制
		if(this.isDemo){
			this.startFlightTimer();
		}else{
			this.updateFlightHandler = (e)=>{
				this.updateMarkPosition();
			};
			this.updateMarkPosition();
			(this as any).$globalEvent.$on('updateFlightInfo',this.updateFlightHandler);
			
		}
	}
	
	public updateMarkPosition(index?){
		let flightAltitudes:any = this.flightResData.FlightPaths;
		
		if(flightAltitudes&&flightAltitudes.length > 0){
			let position = flightAltitudes[index||(flightAltitudes.length - 1)];
			let cord = [position.Lng,position.Lat];
			
			this.marker.setPosition(cord);
			this.marker.getElement().style.transform = `rotate(${position.Course - 90}deg)`;
			this.centerMark(cord);
		}
	}
	
	
	destroyed() {
		
	} 
	
	public startFlightTimer() {
		let time = 1 * 1000;
		let len = this.flightPaths.length;
		this.flightPositionIndex = 0;
		this.updateMarkPosition(this.flightPositionIndex);
		this.timeFlag = window.setInterval(()=>{
			this.flightPositionIndex++;
			if(this.flightPositionIndex >= len){
				this.flightPositionIndex = 0;
			}
			this.updateMarkPosition(this.flightPositionIndex);
		},time);
	}
		
	
	private beforeDestroy() {
		window.clearInterval(this.timeFlag);  
		(this as any).$globalEvent.$off('updateFlightInfo',this.updateFlightHandler);
	}
	
	
	
	public getFlightInfo(): void {
		this.flightInfo = this.flightResData;
		// this.isDemo = this.flightInfo.Flight.BaseInfo.IsDemo;
		this.renderMap();
		
	}

	public renderMap(): void {
		let route_style = new Style({
			stroke: new Stroke({
				width: 2,
				color: '#007cbf'
			}),
			zIndex: 2
		});
		
		//创建轨迹线
		let trackLine = new LineString([]);
		//矢量图层层
		let aircfaftLayer = new VectorLayer({
			source: new VectorSource()
		});

		let flightTrackLayer = new VectorLayer({
			source: new VectorSource({
				features: [
					new Feature({
						geometry: trackLine
					})
				]
			}),
			style: route_style,
			updateWhileInteracting: true //拖拽时自动更新位置 顺滑拖拽
		});
		
		var mapcontainer = this.$refs.mapCtn;
		this.map = new Map({
			target: 'homeMap',
			layers: [
				new Tile({
					source: new OSM({ url: process.env.VUE_APP_MAP_URL + '/{z}/{x}/{y}.png' })
				}),
				flightTrackLayer,
				aircfaftLayer
			],
			// renderer: 'canvas',
			view: new View({
				projection: 'EPSG:4326', //使用这个坐标系
				center: [114.064839, 22.548857], //深圳
				zoom: 7
			}),
			controls: defaults({
				attributionOptions: {
					collapsible: true
				},
				rotate: false,
				zoom: false
			})
		});

		let markerEl = document.getElementById('geo-marker');
		// 'OverlayPositioning
		let marker = new Overlay({
			// positioning:OverlayPositioning.BOTTOM_CENTER,// 'bottom-center',
			positioning:OverlayPositioning.CENTER_CENTER,// 'center-center',
			stopEvent: false,
			// dragging: false,
			offset: [0, 0],
			element: markerEl
		});
		this.marker = marker;
		this.map.addOverlay(marker);
        

		//设置地图中心
		this.drawLines();

		let coords: Array<any> = [],
			intervalId,
			interval = 1000,
			i = 0;
		let theAirplane = new Feature([]);
		this.flightInfo.FlightPaths.forEach((item:any, index:number) => {
			coords.push([Number(item.Lng), Number(item.Lat)]);
		});
        
		this.flightPaths = this.flightInfo.FlightPaths;
		
		theAirplane.setId('123123');
		theAirplane.set('speed', 323);
		theAirplane.setStyle(this.createGoodStyle());
		// theAirplane.getStyle().getImage().setRotation(130);
		aircfaftLayer.getSource().addFeature(theAirplane);
		
		coords.forEach((item, index) => {
			let point = coords[index] || transform(coords[index], 'EPSG:4326', 'EPSG:3857');
			trackLine.appendCoordinate(point);
		});
		
		//this.updateMarkPosition();
	}
	
	
	public centerMark(position:any){
		this.map.getView().setCenter(position);
	}
 

    public updateMarkPosition1(){
		console.log('更新飞机坐标位置');
		let flightAltitudes:any = this.flightResData.FlightPaths;
		
		if(flightAltitudes&&flightAltitudes.length > 0){
			let position = flightAltitudes[flightAltitudes.length - 1];
			let cord = [position.Lng,position.Lat];
			
			this.marker.setPosition(cord);
			this.marker.getElement().style.transform = `rotate(${position.Course - 90}deg)`;
			this.centerMark(cord);
		}
		
		
	}

	
	createGoodStyle() {
		return new Style({
			image: new Circle({
				radius: 4,
				// snapToPixel: false,
				fill: new Fill({
					color: 'yellow'
				}),
				stroke: new Stroke({
					color: '#333',
					width: 2
				})
			})
		});
	}

	//绘制航线
	public drawLines() {
		
	}

    
	
	
}
</script>

<style>
.ol-attribution {
	display: none;
}
</style>

<style lang="scss" scoped>
div.olControlZoom {
	/*隐藏地图左上角的+-号*/
	display: none;
}

#geo-marker {
	// border: 1px solid #ffffff;
	border-radius: 50%;
	width: 0.36rem;
	height: 0.36rem;
	background: #00205b;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	> .icon {
		color: #ffffff;
		font-size: 0.2rem;
		line-height: 0.36rem;
	}
}

.homeflight-main-ctn {
	width: 100%;
	height: 100%;
	.map-ctn {
		position: relative;
		width: 100%;
		height: 100%;
		.map-tag{
        position: absolute;
        right: .05rem;
        bottom: .05rem;
        font-size: .20rem;
        color: #666;
        padding: .01rem;
        background-color: rgba(255, 255, 255, .3);
		// z-index: 99;
		z-index: 50;
        .map-tag-color{
          color: royalblue;
          // font-weight: 600;
        }
      }
	}
}
</style>
