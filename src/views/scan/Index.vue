<template>
	<div class="scan-ctn">
		<div class="header-ctn">
			<i class="icon  icon-back" @click="stepToHome()"></i>
			 {{$t("title")}}
		</div>

		<div ref="contentCtn" class="content-ctn">
			<div ref="infoCtn" class="info-ctn">
				{{infoTxt}}
			</div>

			<!-- 摄像头状态 -->
			<div class="scan-content-ctn camera-ctn" v-show="pageStatus == 'cameraInput'">
				<div class="camera-select-ctn">
					<div v-for="(item, index) in cameraList" :key="index" @click="selectCamera(item,index)" class="camera-item" :class="{active:activeCameraIndex == index}">{{ item.label||'camera' }}</div>
				</div>

				<div ref="scannerCtn" class="camera-scan-ctn">

				</div>

				<div class="scan-animate-ctn" :style="{width:this.qrcodeWidth + 'px',height:this.qrcodeWidth + 'px'}">
					<div class="line"></div>
				</div>
			</div>

			<!-- 拍照获取状态 -->
			<div v-show="pageStatus == 'fileInput'" ref="fileCtn" class="scan-content-ctn file-ctn">
				<!-- <div v-if="fileImageUrl" class="file-image-ctn" :style="{backgroundImage:`url(${fileImageUrl})`}">
				</div> -->
				<div v-if="fileImageUrl" class="file-image-ctn" >
					<img :src="fileImageUrl"/>
				</div>
				

				<div v-if="!fileImageUrl" class="file-noimage-ctn">
					 {{$t("noFile")}}
				</div>

				<input ref="fileInput" class="file-input" accept="image/*" type="file" @change="selectFile($event)" />

				<div class="file-upload-ctn" @click="uploadImage()">
					{{$t("Upload")}}
					
				</div>

			</div>
			
		</div>
		<div class="footer-ctn">
			<!-- pageStatus = 'cameraInput'  pageStatus = 'fileInput' -->
			<div v-show="pageStatus == 'fileInput'" class="swtich-ctn" @click="switchTo('cameraInput')">
				<div class="swtich-img">
					<svg class="icon" aria-hidden="true">
						<use xlink:href="#icon-camera-scan" />
					</svg>
				</div>
				<p class="swtich-txt"> {{$t("cameraScan")}} </p>
			</div>
			<div v-show="pageStatus == 'cameraInput'" class="swtich-ctn" @click="switchTo('fileInput')">
				<div class="swtich-img">
					<svg class="icon" aria-hidden="true">
						<use xlink:href="#icon-file-scan" />
					</svg>
				</div>
				<p class="swtich-txt"> {{$t("takeAPicture")}}</p>
			</div>
		</div>
	</div>
</template>
			
<i18n>
	{
	"en":{
	  "title":"Scan",
	  "noFile":"No File",
	  "takeAPicture":"Take A Picture To Scan",
	   "cameraScan":"Camera Scan",
	   "Upload":"upload",
	   "scanning":"Scanning...",
	   "scanningSuccess":"Success,The page is about to jump...",
	   "imageSupportType":"Only suport png,jpg,jpeg",
	   "noCameres":"No cameras available",
	   "fileScanFail":"Image Scan Fail..."
	},
	"zh":{
	   "title":"扫码",
	   "noFile":"No File",
	   "takeAPicture":"拍摄上传",
	    "cameraScan":"扫描",
	    "Upload":"上传",
		"scanning":"扫描中...",
		"scanningSuccess":"扫描成功,即将跳转...",
		"imageSupportType":"仅支持png,jpg,jpeg的文件类型",
		"noCameres":"未查询到可用摄像头",
		"fileScanFail":"图片识别失败!"
	}
	}
</i18n>

<script lang="ts">
	import {
		Component,
		Prop,
		Vue
	} from 'vue-property-decorator';
	import QrcodeScaner from './js/html5-qr-code.js';

	@Component({
		name: 'ScanIndex',
		components: {}
	})
	export default class ScanIndex extends Vue {
		private bannerData: any = [];
		private pageStatus: string = 'cameraInput'; //'cameraInput','fileInput'
		private html5Qrcode: any = null; //'cameraInput','fileInput'
		private cameraErrorTxt: any = '';
		private qrcodeWidth: number = 250;
		private infoTxt: any = "scanning...."; 
		
		
		//this.$i18n.t
		

		/* <div ref="infoCtn" class="info-ctn">
			{{infoTxt}}
		</div> */

		private videoWh: any = {
			width: window.innerWidth,
			height: window.innerHeight
		};

		private cameraList: Array < any > = [];
        
		private consoleTxt: any = '';

		private fileImageUrl: string = '';
		
		private activeCameraIndex:number = 0;

		//this.html5Qrcode = new Html5Qrcode(this.__getScanRegionId(), this.verbose)
		private created() {
			this.qrcodeWidth = window.innerWidth * (300 / 440);
			this.html5Qrcode = new QrcodeScaner.Html5Qrcode(this);
			this.getCameraList();
			

		}

		private mounted() {
            if (localStorage.getItem("lang") == "en") {
              this.$i18n.locale = "en";
            } else {
              this.$i18n.locale = "zh";
            }

		}
		
		private stepToHome(){
			this.$router.push({
				name:'home'
			});
		}

		private uploadImage() {
			this.$nextTick(() => {
				this.stopCameraScan();
				(this as any).$refs.fileInput.click();
			})

		}



		private destroyed() {

		}

		private selectCamera(camera,index) {
			
			this.activeCameraIndex = index;
			this.stopCameraScan();
			this.videoWh = {
				width: (this as any).$refs.contentCtn.clientWidth,
				height: (this as any).$refs.contentCtn.clientHeight
			};
			this.html5Qrcode.start(camera.id, {
				fps: 10,
				video: this.videoWh,
				qrbox: this.qrcodeWidth
			}, (res) => {
				this.stopCameraScan();
				this.infoTxt = this.$i18n.t("scanningSuccess");
				this.$toast(this.infoTxt);
				window.setTimeout(()=>{
					this.processScanResult(res);
				},1500);
				
			}, (res) => {
				this.infoTxt = this.$i18n.t("scanning...");
			}).then(function() {

			}).catch(function(error) {
                 this.infoTxt = this.$i18n.t("scanning...");
			});
		}

		private stopCameraScan() {
			this.html5Qrcode.stop();
			(this as any).$refs.scannerCtn.innerHTML = '';
		}

		private switchTo(pageStatus) {
			this.pageStatus = pageStatus;
             
			 this.infoTxt = '';
			if (pageStatus == 'fileInput') {
				this.stopCameraScan();
				this.uploadImage();
			} else {
				if (this.cameraList && this.cameraList.length > 0) {
					this.selectCamera(this.cameraList[0],0);
				}
			}
		}

		private selectFile(e) {
			let files = e.target.files || e.dataTransfer.files,
				firstFile;
			let reg = /\.(png|jpg|jpeg)$/;

			if ((!files.length) || files.length == 0) return;
			firstFile = files[0];

			if (!reg.test(files[0].name)) {
				this.infoTxt = this.$i18n.t("imageSupportType");
				return;
			}
			
			
			
			
            
			this.renderFileImage(firstFile);
			
			this.html5Qrcode.scanFile(firstFile, this.$refs.fileCtn, this.$refs.fileCanvas).then(res => {
				      this.infoTxt = this.$i18n.t("scanningSuccess");
					  this.$toast(this.infoTxt);
                      window.setTimeout(()=>{
                       	this.processScanResult(res);
                       },1500);
			}).finally((error)=>{
				e.target.value = '';
			}).catch(()=>{
				this.infoTxt = this.$i18n.t("fileScanFail");
			});
		}

		private getCameraList() {
			QrcodeScaner.Html5Qrcode.getCameras()
				.then((res: any) => {
					this.cameraList = res;
					if (this.cameraList && this.cameraList.length > 0) {
						this.selectCamera(this.cameraList[0],0);
					} else {
						this.infoTxt = this.$i18n.t("noCameres");
					}
					
					/* this.cameraList = [{
						 id:'11111',
						 label:'摄像头111'
					},
					{
						 id:'11111',
						 label:'摄像头111'
					},
					{
						 id:'11111',
						 label:'摄像头111'
					},{
						 id:'11111',
						 label:'摄像头111'
					}]; */
				})
				.catch(error => {
					this.infoTxt = error;
					this.cameraList = [];
				});
		}
		
		private processScanResult(result) {
			console.log('result:' + '');  
			// return ;
			/* fileScanFail */
			/* http://kf.vpclub.cn/airbus/index.html#/dish/detail?id=4390739d-fffe-ea11-9737-4cbb5897acf9
			http://kf.vpclub.cn/airbus/index.html#/shopping/details?id=ee3f9347-fafe-ea11-9737-4cbb5897acf9 */
			// debugger;
			//result = 'http://kf.vpclub.cn/airbus/index.html#/shopping/details?id=ee3f9347-fafe-ea11-9737-4cbb5897acf9';
		    if(result.indexOf('/dish/detail')> -1){
				this.$router.push({
				  name: "dishDetail",
				  query: {
				    id:this.getUrlParam(result,'id')
				  },
				});
				
			}else if(result.indexOf('/shopping/detail')> -1){
				this.$router.push({
				  name: "shoppingDetails",
				  query: {
				    id: this.getUrlParam(result,'id')
				  }
				});
			}else {
				if(result.indexOf('http')> -1){
					window.location.href = result;
				}
				
			}
		}
		
        private getUrlParam(result,name) {
            //构造一个含有目标参数的正则表达式对象
			var resultIndex = result.indexOf('?');
			result = result.substr(resultIndex); 
			
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); 
			
            var r = result.substr(1).match(reg); //匹配目标参数
            if (r != null) {
                return unescape(r[2]);
            } else {
                return null; //返回参数值
            }
			
        }
		
        //获取参数
       /*getUrlParam(id)
        getUrlParam(j) */
		
		private renderFileImage(file) {
			let This:any = this,
				reader = new FileReader(),
				image = new Image();


			reader.readAsDataURL(file);
			reader.onloadend = function(f) {
				let base64Url = f.target.result;
				This.fileImageUrl = base64Url;
			};
		}
		
	}
</script>

<style lang="scss" scoped>
	.scan-ctn {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #000000;

		.header-ctn {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 1rem;


			font-size: 0.32rem;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #FFFFFF;
			line-height: 0.32rem;
			text-align: center;
			line-height: 1rem;

			.icon {
				position: absolute;
				top: 0.3rem;
				left: 0.3rem;
				font-size: 0.32rem;
				color: #ffffff;
				line-height: 0.40rem;
			}
		}

		.content-ctn {
			position: absolute;
			width: 100%;
			top: 1rem;
			bottom: 2.5rem;

			.info-ctn {


				text-align: center;
				font-size: 0.34rem;
				font-family: Helvetica-Bold, Helvetica;
				font-weight: bold;
				color: #FFFFFF;
				line-height: 0.80rem;
				position: absolute;
				width: 100%;
				z-index: 1000;
			}

			.scan-content-ctn {
				position: relative;
				width: 100%;
				height: 100%;

				&.camera-ctn {
					.camera-select-ctn {
						  display: -webkit-box;
						      display: -webkit-flex;
						      display: flex;
						      -webkit-box-align: center;
						      -webkit-align-items: center;
						      align-items: center;
						      -webkit-box-pack: center;
						      -webkit-justify-content: center;
						      justify-content: center;
						      position: absolute;
						      bottom: 0.40rem;
						      z-index: 2000;
						      width: 100%;
						      flex-wrap: wrap;

						.camera-item {
							&.active{
								    background: #ffffff;
								    border: 0.04rem solid #00aec7;
								    color: #00aec7;
							}
							
							border-radius: 0.50rem;
							margin: 0 0.3rem;
							width: 2.0rem;
							line-height: 0.80rem;
							font-size: 0.32rem;
							color: #ffffff;
							text-align: center;
							background: #00aec7;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							box-sizing: border-box;
							padding: 0 0.20rem;
							margin-top:0.16rem;
							
						}
					}

					.scan-animate-ctn {
						width: 2.50rem;
						height: 2.50rem;
						position: absolute;
						left: 50%;
						top: 50%;
						overflow: hidden;
						transform: translate(-50%, -50%);

						@keyframes radar-beam {
							0% {
								transform: translateY(-110%);
							}

							100% {
								transform: translateY(120%);
							}
						}

						.line {
							height: calc(100% - 2px);
							width: 100%;
							//background: linear-gradient(180deg, rgba(0, 255, 51, 0) 43%, #00ff33 211%);
							background: linear-gradient(180deg, rgba(255, 255, 255, 0) 43%, rgba(255, 255, 255, 1) 211%);
							border-bottom: 3px solid #ffffff;
							transform: translateY(-0%);
							animation: radar-beam 5s infinite;
							animation-timing-function: cubic-bezier(0.53, 0, 0.43, 0.99);
							animation-delay: 1.4s;
						}

					}

					.camera-scan-ctn {
						position: absolute;
						left: 50%;
						top: 50%;
						transform: translate(-50%, -50%);
						width: 100%;
					}
				}

				&.file-ctn {
					position: relative;
					width: 100%;
					height: 100%;

					.file-image-ctn {
						position: absolute;
						width: 100%;
						top: 1.00rem;
						background-repeat: no-repeat;
						background-position: center;
						bottom: 1.60rem;
						width: 100%;
						left: 50%;
						transform: translate(-50%, 0);
						>img{
							margin:auto;
							display: block;
							max-width: 100%;
							max-height: 100%;
						}
					}

					.file-noimage-ctn {
						background: #282828;
						width: 4.30rem;
						height: 4.30rem;
						border: 1px solid dashed;
						position: absolute;
						background-repeat: no-repeat;
						background-position: center;
						left: 50%;
						top: 50%;
						transform: translate(-50%, -50%);
						line-height: 4.30rem;
						color: #535353;
						font-size: 1.00rem;
						text-align: center;
						border-radius: 0.10rem;
					}

					.file-input {
						visibility: hidden;
						position: absolute;
						top: -1000rem;
						left: -1000rem;

					}

					.file-upload-ctn {
						cursor: pointer;
						position: absolute;
						left: 50%;
						bottom: 1.00rem;
						margin: auto;
						width: 4.40rem;
						height: 0.80rem;
						background: #00AEC7;
						border-radius: 0.50rem;
						line-height: 0.80rem;
						transform: translateX(-50%);

						text-align: center;
						font-size: 0.34rem;
						font-family: Helvetica-Bold, Helvetica;
						font-weight: bold;
						color: #FFFFFF;

					}

				}

			}
		}

		.footer-ctn {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 2.5rem;

			.swtich-ctn {
				text-align: center;

				.swtich-img {
					margin: auto;
					border-radius: 50%;
					width: 0.75rem;
					height: 0.75rem;

					margin-bottom: 0.2rem;

					svg {
						line-height: 0.75rem;
						width: 0.75rem;
						height: 0.75rem;
					}
				}

				.swtich-txt {
					height: 0.3rem;
					font-size: 0.24rem;
					font-family: Helvetica;
					color: #ffffff;
					line-height: 0.3rem;
				}
			}
		}
	}
</style>
