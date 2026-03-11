import {Component, Inject, OnInit,AfterViewInit, ViewChild, HostBinding} from '@angular/core';
// import {MatLegacyDialog as MatDialog, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef} from '@angular/material/legacy-dialog';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

/**
 * @title Dialog Overview
 */
@Component({
    selector: 'app-qrscanner',
    templateUrl: './qrscanner.component.html',
    styleUrls: ['./qrscanner.component.css'],
    standalone: false
})
export class QRScannerComponent implements OnInit,AfterViewInit {
  qrData: string;
  @ViewChild('scanner',{static:false})
  scanner: ZXingScannerComponent;
  zxingScanner: boolean = false;
  devices: Array<MediaDeviceInfo>;
  desiredDevice: MediaDeviceInfo;


  constructor(public dialogRef: MatDialogRef<QRScannerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any)
    { }

  ngOnInit() {
    this.zxingScanner = true;
  }

  ngAfterViewInit(){
    console.log(this.scanner)
    if(this.scanner.device)
      this.desiredDevice = this.scanner.device;
  }

  okToDelete() {
    console.log('Entered')
    this.dialogRef.close(this.qrData);
    console.log("this item will be deleted!")
  }

  qrScanSuccess(event: string){
    this.zxingScanner = false;
    console.log(event);
    this.data = event
    this.dialogRef.close(event);
  }

  camerasFoundHandler(event: Array<MediaDeviceInfo>){
    this.devices = event;
    console.log(this.devices)
  }

  switchCamera(){
    this.zxingScanner = false;
    let index = this.devices.findIndex(i=>i.deviceId == this.scanner.device?.deviceId)
    index+=1;
    if(index==this.devices.length)
      index = 0;
    this.scanner.device = this.devices[index];
    console.log(this.scanner.device)
    this.zxingScanner = true;
  }

  scanErrorHandler(event: any){
    console.log(event)
  }
}
