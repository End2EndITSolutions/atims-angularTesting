import { EventEmitter, Injectable, Output } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera'
import { Device, DeviceInfo } from '@capacitor/device';

@Injectable({
  providedIn: 'root'
})
export class CameraService {
  data : string = "Service startup"
  @Output() isMobile = new EventEmitter();
  @Output() pictureData = new EventEmitter();
  constructor() { 
    let isMobile : Boolean = false;
    this.getPlatform().then(data => isMobile = data);
    this.isMobile.emit(isMobile);

    console.log("Loaded in CameraService constructor");
    console.log(this.data);
  }

  async takePicture(){
    // var permissions = await Camera.checkPermissions();
    // if(permissions.camera != 'granted'){
    //   Camera.requestPermissions();
    // }
    // console.log("After permissions")
    const image = await Camera.getPhoto({
      quality:100,
      allowEditing:true,
      resultType: CameraResultType.DataUrl
    })

    // this.pictureData.emit(image.webPath);
    // this.isMobile.emit(true)
    return image.dataUrl;
  }

  async getPlatform(){
    const deviceInfo = await Device.getInfo()
    if(deviceInfo.platform!='web')
      return true;
    return false;
  }

  setData(s:string){
    this.data = s;
  }

  getData(){
    return this.data;
  }

}
