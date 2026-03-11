import { Component, EventEmitter, OnInit, Output, Signal, ViewChild } from '@angular/core';
import { BarcodeScanner, ScanResult } from '@capacitor-community/barcode-scanner';
import { Camera } from '@capacitor/camera';
import { Device } from '@capacitor/device';
import { CameraService } from '../camera.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { BrowserQRCodeReader } from '@zxing/browser';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { QRScannerComponent } from '../qrscanner/qrscanner.component';
import { MatDialog } from '@angular/material/dialog';
import { MobileEvents, MobileEventsMessage, MobileEventsResult, QRScanResult } from '../mobile-events';
import { MobileService } from '../mobile.service';
import { CapacitorBarcodeScanner, CapacitorBarcodeScannerOptions, CapacitorBarcodeScannerTypeHint, CapacitorBarcodeScannerCameraDirection, CapacitorBarcodeScannerScanOrientation, CapacitorBarcodeScannerScanResult } from '@capacitor/barcode-scanner';

const codeReader = new BrowserQRCodeReader();

@Component({
  selector: 'app-barcode-scan',
  templateUrl: './barcode-scan.component.html',
  styleUrls: ['./barcode-scan.component.css'],
  standalone: false
})

export class BarcodeScanComponent implements OnInit {
  data: string = 'Data';
  isMobile: Signal<boolean>
  isWebPlatform: Signal<boolean>
  platform?: string;
  image?: string;
  imageUrl: SafeResourceUrl;
  scannerUI: boolean = false;
  eventData: any = 'EventData';

  constructor(private cameraService: CameraService, private _sanitizer: DomSanitizer, public dialog: MatDialog, private mobileService: MobileService) {
    //cameraService.setData("Barcode scan component startup");
  }

  ngOnInit(): void {
    // this.getPlatform().then(res => this.platform = res);
    // if(this.platform != 'web')
    //   this.isMobile = true;

    // this.readAvailableVideoInputs();
    this.initSignals();
  }

  private initSignals() {
    this.isMobile = this.mobileService.getIsMobile();
    this.isWebPlatform = this.mobileService.getIsWebPlatform();
  }

  scanBarcode2() {
    let options: CapacitorBarcodeScannerOptions = {
      scanInstructions: 'Place a barcode inside the viewfinder rectangle to scan it.',
      hint: CapacitorBarcodeScannerTypeHint.ALL,
      scanButton: true,
      scanText: 'Scan',
      cameraDirection: CapacitorBarcodeScannerCameraDirection.BACK,
      scanOrientation: CapacitorBarcodeScannerScanOrientation.ADAPTIVE,
    };
    CapacitorBarcodeScanner.scanBarcode(options)
      .then((result: CapacitorBarcodeScannerScanResult) => {
        console.log(result);
        this.data = result.ScanResult;
      })
      .catch(err => {
        console.error(err);
      }
      );
  }

  scanBarcode() {
    let qrScanEvent: MobileEventsMessage = {
      eventType: MobileEvents.BEGIN_QR_SCAN
    };
    // let qrScanEvent2 = new Event(MobileEvents.BEGIN_QR_SCAN, {bubbles:true});
    // window.parent.dispatchEvent(qrScanEvent2) //not allowed
    // DOCUMENTATION https://stackoverflow.com/questions/25098021/securityerror-blocked-a-frame-with-origin-from-accessing-a-cross-origin-frame
    window.addEventListener('message', this.handleBarcodeResult);
    window.parent.postMessage(JSON.stringify(qrScanEvent), '*');
    console.log('Begin QR Scan',qrScanEvent);
  }

  handleBarcodeResult = (event: any) => {
    console.log(typeof event.data)
    if (!event && (typeof event.data === 'object')) return;
    console.log(event)
    let mobileResult: MobileEventsResult = JSON.parse(event.data);
    if (mobileResult.success) {
      let result: QRScanResult = JSON.parse(mobileResult.result)
      if (result.inmateNumber != '') {
        console.log(result.inmateNumber)
        this.data = result.inmateNumber;
      }
      else {
        alert('Bad QR code')
      }
    }
    window.removeEventListener('message', this.handleBarcodeResult);
  }

  /**
   * @return T/F whether the platform is mobile or not
   */
  async getPlatform() {
    const deviceInfo = await Device.getInfo();
    return deviceInfo.platform
  }

  async scanQRCode() {
    // await Camera.requestPermissions().catch(err=>console.log(err));

    // const permissions = await BarcodeScanner.checkPermission();
    // if (!permissions.granted) {
    //   Camera.requestPermissions();
    // };

    // BarcodeScanner.hideBackground(); // make background of WebView transparent
    // document.body.classList.add("qrscanner");
    // const result = await BarcodeScanner.startScan(); // start scanning and wait for a result
    // document.body.classList.remove("qrscanner");

    // // if the result has content
    // if (result.hasContent) {
    //   console.log(result.content); // log the raw scanned content
    //   this.data = result.content;
    // }
    // BarcodeScanner.showBackground();
    // this.toggleScannerUI();

    this.toggleScannerUI()
    const videoInputDevices = await BrowserQRCodeReader.listVideoInputDevices();
    console.log("codeReader ${codeReader}");
    console.log(videoInputDevices);
    const selectedDeviceId = videoInputDevices[1].deviceId;
    const previewElem = <HTMLVideoElement>document.querySelector('#test-area-qr-code-webcam > video');
    console.log(selectedDeviceId);
    console.log(previewElem)
    await codeReader.decodeOnceFromVideoDevice(undefined, previewElem).then(result => {
      console.log(result)
      this.data = result.getText();
      this.toggleScannerUI();
    });
  }

  takePicture() {
    // console.log(navigator.mediaDevices.getUserMedia());
    this.cameraService.takePicture().then(data => {
      if (data)
        this.imageUrl = this._sanitizer.bypassSecurityTrustResourceUrl(data)
    });

    // this.cameraService.pictureData.subscribe(data => this.image = data);
  }

  toggleScannerUI() {
    this.scannerUI = !this.scannerUI;
  }

  togglezxingScannerUI() {
    this.zxingScanner = !this.zxingScanner;
  }

  getCameraServiceState() {
    this.data = this.cameraService.data;
  }

  getMediaDevices() {
    if (!navigator.mediaDevices?.enumerateDevices) {
      console.log("enumerateDevices() not supported.");
    } else {
      // List cameras and microphones.
      navigator.mediaDevices.enumerateDevices()
        .then((devices) => {
          devices.forEach((device) => {
            console.log(`${device.kind}: ${device.label} id = ${device.deviceId}`);
          });
        })
        .catch((err) => {
          console.error(`${err.name}: ${err.message}`);
        });
    }
  }

  //zxing-scanner METHODS
  @ViewChild('scanner', { static: false })
  scanner: ZXingScannerComponent;
  zxingScanner: boolean = false;

  qrScanSuccess(event: string) {
    this.zxingScanner = !this.zxingScanner;
    console.log(event);
    this.data = event
  }

  openDeleteDialog() {
    const dialogRef = this.dialog.open(QRScannerComponent,
      {
        panelClass: 'fullscreen-dialog'
      });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    })
  }

  sendMessageToiFrameParent() {
    window.addEventListener("message", this.functionHandler)
    var message = JSON.stringify({
      component: this.constructor.name,
      eventType: MobileEvents.BEGIN_QR_SCAN,
      date: Date.toLocaleString()
    })

    console.log('AngularTest', message);
    window.parent.postMessage(message, '*')
    this.data = 'sendMessageToiFrameParent'
    this.eventData = message
  }

  functionHandler = (event: MessageEvent) => {
    console.log(event.data)
    this.eventData = event.data;
    console.log(this.eventData)
    window.removeEventListener("message", this.functionHandler);
  }

  changeDataButton() {
    this.data = 'RESET'
  }
  ngOnDestroy() {
  }
}
