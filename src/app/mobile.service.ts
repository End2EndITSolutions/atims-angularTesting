import { Injectable, WritableSignal, computed, signal } from '@angular/core';
import { Filesystem, Directory, Encoding, WriteFileResult } from '@capacitor/filesystem';
// import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { SplashScreen } from '@capacitor/splash-screen';
import { Capacitor } from '@capacitor/core';

import { MIMEType } from 'ngx-test-library';

import { FileOpener } from '@capacitor-community/file-opener';
import { Device, DeviceInfo } from '@capacitor/device';
import { Observable, defer, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MobileService {
  saveDirectory: string = 'Temp'
  isMobile: WritableSignal<boolean> = signal(false);
  isWebPlatform: WritableSignal<boolean> = signal(true);

  /**
   * @usage Main entry point for all mobile services
   */  
constructor() {
  this.setIsMobile()
  this.setIsWebPlatform()
}

  getIsMobile() {
    return computed(() => {
      console.log('getIsMobile()',this.isMobile())
      return this.isMobile()
    })
  }

  getIsWebPlatform() {
    return computed(() => 
    {
      console.log('getIsWebPlatform()',this.isWebPlatform())
      return this.isWebPlatform()
    });
  }

  /**
   * Create Temp directory for writing files. If directory exists, it is emptied
   * Should be called once on app startup
   * @return Boolean
  */
  async prepareStorageLocation(): Promise<boolean> {
    await Filesystem.checkPermissions().catch(err => console.error(err));

    await Filesystem.rmdir(
      {
        path: this.saveDirectory,
        directory: Directory.External,
        recursive: true
      }
    ).catch(err => console.error(err));

    await Filesystem.mkdir(
      {
        path: this.saveDirectory,
        directory: Directory.External
      }
    ).catch(err => {
      console.error(err);
      return false;
    });
    return true;
  }

  /**
   * 
   * @param data Blob data that has to be saved
   * @param fileName Name of the file that will be saved
   * @returns Promise of the saved file uri.
   */
  async saveFile(data: Blob, fileName: string) {
    var res = await new Response(data).text();

    return Filesystem.writeFile({
      path: this.saveDirectory + '/' + fileName,
      data: res,
      directory: Directory.External,
      encoding: Encoding.UTF16
    })
  }

  /**
   * Uses fileOpener plugin to open the file with platform dependent application
   * @param uri Location of the file. Should be retrieved using the saveFile method
   * @param MIMEType 
   */
  openFile(uri: string, MIMEType: string) {
    console.log('File URI:' + uri)
    // this.fileOpener.open(uri, MIMEType)
    //   .then(() => console.log('File is opened'))
    //   .catch(e => console.log('Error opening file', e));
    FileOpener.open({
      filePath:uri,
      contentType: MIMEType
    })
    .then(()=> console.log('File is opened'))
    .catch((e)=>console.log('Error opening file', e));
  }

  splashScreenHide() {
    SplashScreen.hide();
  }

  /**
   * 
   * @param base64File Converted blob to base64
   * @param fileName Must have extension appended: `file.pdf`
   * @param fileType MIME Type of the file
   * @returns 
   */
  downloadFile(base64File: string, fileName: string,fileType:string) {
    // Save the PDF to the device
      return Filesystem.writeFile({
        path: fileName,
        data: base64File,
        directory: Directory.External
        // encoding: FilesystemEncoding.UTF8
      }).then((writeFileResult) => {
        Filesystem.getUri({
          directory: Directory.External,
          path: fileName
        }).then((getUriResult) => {
          this.openFile(getUriResult.uri,fileType)
        }, (error) => {
          console.log(error);
        });
      });
  }

  getFileUri(fileName: string){
    return Filesystem.getUri({
      path: fileName,
      directory:Directory.External
    })
  }

    /**
   * Boolean if the platform is native or not. `android` and `ios`
   * would return `true`, otherwise `false`.
   */
     isNativePlatform() {
      return Capacitor.isNativePlatform();
    }

  convertFileSrc(filePath: string){
    return Capacitor.convertFileSrc(filePath);
  }

  async getDeviceInfo(){
    return await Device.getInfo();
  }

  setIsWebPlatform() {
    let request$ = this.observableFromPromise(Device.getInfo());
    request$.subscribe({
      next: device => {
        console.log('deviceDetails',device)
        console.log('setting isWebPlatform',device.platform)
        if (device.platform == 'web' && device.webViewVersion)
          this.isWebPlatform.set(true);
        else
          this.isWebPlatform.set(false);
      }
    })
  }

  setIsMobile() {
    let request$ = this.observableFromPromise(Device.getInfo());
    request$.subscribe({
      next: device => {
        console.log('setting isMobile',device.operatingSystem)
        if (device.operatingSystem == 'android' || device.operatingSystem == 'ios' || device.operatingSystem == 'unknown')
          this.isMobile.set(true);
        else
          this.isMobile.set(false);

      }
    })
  }

  /**
   * @param promise The promise being converted into an observable.
   * @returns The return of the promise as an observable.
   */
  observableFromPromise(promise: any) : Observable<any>{
    return defer(() => from (promise));
  }

  DeviceGetInfo() {
    return defer(()=>from(Device.getInfo()));
  }

}
