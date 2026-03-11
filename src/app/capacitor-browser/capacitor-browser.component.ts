import { Component, OnInit } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
// import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { DomSanitizer } from '@angular/platform-browser';
import { MobileService } from '../mobile.service';
import { MIMEType } from '../MIMEType';
import { FileOpener } from '@capacitor-community/file-opener';

@Component({
    selector: 'app-capacitor-browser',
    templateUrl: './capacitor-browser.component.html',
    styleUrls: ['./capacitor-browser.component.css'],
    standalone: false
})
export class CapacitorBrowserComponent implements OnInit {
  isMobile: boolean;
  show: boolean = true;
  data?: string;
  fileSaved: boolean = false;
  filesystemData: string;
  filesystemError: string;
  fileURI: string = ""
  apiUrl = 'http://web2019-v2.atimsonline.com:5241/'
  safeUrl = 'http://web2019-v2.atimsonline.com:5241/'
  MIMEType = {
    text: 'text/plain',
    pdf: 'application/pdf'
  }
  link: string = "https://www.africau.edu/images/default/sample.pdf"
  base64PDF = "data:application/pdf;base64,JVBERi0xLjMNCiXi48/TDQoNCjEgMCBvYmoNCjw8DQovVHlwZSAvQ2F0YWxvZw0KL091dGxpbmVzIDIgMCBSDQovUGFnZXMgMyAwIFINCj4+DQplbmRvYmoNCg0KMiAwIG9iag0KPDwNCi9UeXBlIC9PdXRsaW5lcw0KL0NvdW50IDANCj4+DQplbmRvYmoNCg0KMyAwIG9iag0KPDwNCi9UeXBlIC9QYWdlcw0KL0NvdW50IDINCi9LaWRzIFsgNCAwIFIgNiAwIFIgXSANCj4+DQplbmRvYmoNCg0KNCAwIG9iag0KPDwNCi9UeXBlIC9QYWdlDQovUGFyZW50IDMgMCBSDQovUmVzb3VyY2VzIDw8DQovRm9udCA8PA0KL0YxIDkgMCBSIA0KPj4NCi9Qcm9jU2V0IDggMCBSDQo+Pg0KL01lZGlhQm94IFswIDAgNjEyLjAwMDAgNzkyLjAwMDBdDQovQ29udGVudHMgNSAwIFINCj4+DQplbmRvYmoNCg0KNSAwIG9iag0KPDwgL0xlbmd0aCAxMDc0ID4+DQpzdHJlYW0NCjIgSg0KQlQNCjAgMCAwIHJnDQovRjEgMDAyNyBUZg0KNTcuMzc1MCA3MjIuMjgwMCBUZA0KKCBBIFNpbXBsZSBQREYgRmlsZSApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY4OC42MDgwIFRkDQooIFRoaXMgaXMgYSBzbWFsbCBkZW1vbnN0cmF0aW9uIC5wZGYgZmlsZSAtICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNjY0LjcwNDAgVGQNCigganVzdCBmb3IgdXNlIGluIHRoZSBWaXJ0dWFsIE1lY2hhbmljcyB0dXRvcmlhbHMuIE1vcmUgdGV4dC4gQW5kIG1vcmUgKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA2NTIuNzUyMCBUZA0KKCB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDYyOC44NDgwIFRkDQooIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNjE2Ljg5NjAgVGQNCiggdGV4dC4gQW5kIG1vcmUgdGV4dC4gQm9yaW5nLCB6enp6ei4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNjA0Ljk0NDAgVGQNCiggbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDU5Mi45OTIwIFRkDQooIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNTY5LjA4ODAgVGQNCiggQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA1NTcuMTM2MCBUZA0KKCB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBFdmVuIG1vcmUuIENvbnRpbnVlZCBvbiBwYWdlIDIgLi4uKSBUag0KRVQNCmVuZHN0cmVhbQ0KZW5kb2JqDQoNCjYgMCBvYmoNCjw8DQovVHlwZSAvUGFnZQ0KL1BhcmVudCAzIDAgUg0KL1Jlc291cmNlcyA8PA0KL0ZvbnQgPDwNCi9GMSA5IDAgUiANCj4+DQovUHJvY1NldCA4IDAgUg0KPj4NCi9NZWRpYUJveCBbMCAwIDYxMi4wMDAwIDc5Mi4wMDAwXQ0KL0NvbnRlbnRzIDcgMCBSDQo+Pg0KZW5kb2JqDQoNCjcgMCBvYmoNCjw8IC9MZW5ndGggNjc2ID4+DQpzdHJlYW0NCjIgSg0KQlQNCjAgMCAwIHJnDQovRjEgMDAyNyBUZg0KNTcuMzc1MCA3MjIuMjgwMCBUZA0KKCBTaW1wbGUgUERGIEZpbGUgMiApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY4OC42MDgwIFRkDQooIC4uLmNvbnRpbnVlZCBmcm9tIHBhZ2UgMS4gWWV0IG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA2NzYuNjU2MCBUZA0KKCBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY2NC43MDQwIFRkDQooIHRleHQuIE9oLCBob3cgYm9yaW5nIHR5cGluZyB0aGlzIHN0dWZmLiBCdXQgbm90IGFzIGJvcmluZyBhcyB3YXRjaGluZyApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY1Mi43NTIwIFRkDQooIHBhaW50IGRyeS4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA2NDAuODAwMCBUZA0KKCBCb3JpbmcuICBNb3JlLCBhIGxpdHRsZSBtb3JlIHRleHQuIFRoZSBlbmQsIGFuZCBqdXN0IGFzIHdlbGwuICkgVGoNCkVUDQplbmRzdHJlYW0NCmVuZG9iag0KDQo4IDAgb2JqDQpbL1BERiAvVGV4dF0NCmVuZG9iag0KDQo5IDAgb2JqDQo8PA0KL1R5cGUgL0ZvbnQNCi9TdWJ0eXBlIC9UeXBlMQ0KL05hbWUgL0YxDQovQmFzZUZvbnQgL0hlbHZldGljYQ0KL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcNCj4+DQplbmRvYmoNCg0KMTAgMCBvYmoNCjw8DQovQ3JlYXRvciAoUmF2ZSBcKGh0dHA6Ly93d3cubmV2cm9uYS5jb20vcmF2ZVwpKQ0KL1Byb2R1Y2VyIChOZXZyb25hIERlc2lnbnMpDQovQ3JlYXRpb25EYXRlIChEOjIwMDYwMzAxMDcyODI2KQ0KPj4NCmVuZG9iag0KDQp4cmVmDQowIDExDQowMDAwMDAwMDAwIDY1NTM1IGYNCjAwMDAwMDAwMTkgMDAwMDAgbg0KMDAwMDAwMDA5MyAwMDAwMCBuDQowMDAwMDAwMTQ3IDAwMDAwIG4NCjAwMDAwMDAyMjIgMDAwMDAgbg0KMDAwMDAwMDM5MCAwMDAwMCBuDQowMDAwMDAxNTIyIDAwMDAwIG4NCjAwMDAwMDE2OTAgMDAwMDAgbg0KMDAwMDAwMjQyMyAwMDAwMCBuDQowMDAwMDAyNDU2IDAwMDAwIG4NCjAwMDAwMDI1NzQgMDAwMDAgbg0KDQp0cmFpbGVyDQo8PA0KL1NpemUgMTENCi9Sb290IDEgMCBSDQovSW5mbyAxMCAwIFINCj4+DQoNCnN0YXJ0eHJlZg0KMjcxNA0KJSVFT0YNCg==";

  constructor(private domSanitizer: DomSanitizer
    , private mobileService: MobileService
    // , private fileOpener: FileOpener
    ) { }

  ngOnInit(): void {
    this.show = true;
    if (Capacitor.getPlatform() != "web")
      this.isMobile = true;
    else
      this.isMobile = false;

  }

  sanitize(path: string) {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(path);
  }

  openUrl(){
    var dynamicImagingUrl = 'disiRunCaptureSDK://captureMode=canon&Token=123&PostbackUrl=' + this.apiUrl + "PhotoTake/PostDynamicImaging?facilityName=" + "PCJ";
    window.open(encodeURI(dynamicImagingUrl));
  }

  public openDynamicImaging(facilityName:string) {
    let encodedPostbackUrl = encodeURIComponent(this.apiUrl + 'PhotoTake/PostDynamicImaging?facilityName=' + facilityName);
    let encodeUrl = encodeURI(this.safeUrl + 'PhotoTake/PostDynamicImaging?facilityName=' + facilityName)
    console.log(encodedPostbackUrl);
    console.log(encodeUrl)
    var dynamicImagingUrl = 'disiRunCaptureSDK://captureMode=canon&Token=123&Url=http://localhost' + '&PostbackUrl=' + encodeUrl;
    
    window.open(dynamicImagingUrl);
  }

  open() {
    if (this.isMobile) {
      Browser.addListener("browserPageLoaded", () => console.log("browserPageLoaded event triggered")).then((data) => this.data = "Page Loaded");
      Browser.open(
        { url: "http://www.africau.edu/images/default/sample.pdf" }
      ).then(() => this.data = "Browser Opened");
      Browser.addListener("browserFinished",
        () => {
          console.log("browserFinished Event Triggered");
        }).then(() => this.data = "Browser closed");
    }
  }

  //Anchor Element Solution
  saveFileWithAnchor(url: string, fileName: string) {
    var aelement = document.createElement("a");
    this.filesystemData = url;
    aelement.download = fileName;
    aelement.href = url;
    aelement.click();
    aelement.remove();
  }

  openFileInChrome(uri: string, MIME: string) {
    console.log('File URI:' + uri)
    // this.fileOpener.open(uri, MIME)
    //   .then(() => console.log('File is opened'))
    //   .catch(e => console.log('Error opening file', e));
    FileOpener.open({
      filePath: uri,
      contentType: MIME
    })
    .then(() => console.log('File is opened'))
    .catch(e => console.log('Error opening file', e));
  }

  async onChange(event: any) {
    var myFile: File = event.target.files[0];
    var arrayBuffer = await myFile.arrayBuffer();
    var fileName = "sampleFile" + '.pdf'
    const myBlob = new Blob([arrayBuffer], {
      type: this.MIMEType.pdf
    });

    if (this.mobileService.isWebPlatform()) {
      var url = URL.createObjectURL(myBlob);
      this.saveFileWithAnchor(url, fileName);
    }
    else {
      //Convert blob to base 64
      var reader = new FileReader();
      reader.readAsDataURL(myBlob);
      reader.onloadend = () => {
        var base64String = reader.result?.toString();
        if (base64String != null)
          this.mobileService.downloadFile(base64String, fileName, MIMEType.pdf);
        //PDF Format not viewable in iframe
        this.mobileService.getFileUri(fileName).then(
          res => {
            this.fileURI = this.mobileService.convertFileSrc(res.uri);
            console.log(this.fileURI);
            this.fileSaved = true;
          }
        )
      }
    }



    // this.mobileService.blobToBase64(myBlob);
    // this.fileSaved=true;
    //var url = URL.createObjectURL(myBlob);
    // if (!Capacitor.isNativePlatform()) {  //On Web do anchor solution
    //   this.saveFileWithAnchor(url,fileName);
    // }
    // else {  //On mobile use Capacitor
    //   this.mobileService.saveFile(myBlob,fileName).then(res=>
    //     this.mobileService.openFile(res.uri,this.MIMEType.pdf)
    //   )
    // };
  }
}

