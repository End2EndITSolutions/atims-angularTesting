import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { Camera, CameraResultType, PermissionStatus } from '@capacitor/camera';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';


@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.css'],
    standalone: false
})
export class FileUploadComponent implements OnInit {
  //Picture Fields
  cameraResultType : CameraResultType = CameraResultType.DataUrl
  cameraResultData? : string = ""
  cameraResultWebPath? : string = "";
  cameraResultExif? : string = "";
  pictureLoad: boolean = false;

  //Input File Fields
  inputFilePath?: string;
  inputFileRelativePath?: string;
  inputFileSize?: number;

  uploadForm: FormGroup;
  imageFile?: File;
  thing: string;

  messages: string = "";

  constructor(private formBuilder: FormBuilder,
    ) { }

  ngOnInit(): void {
    this.uploadForm = new FormGroup({
      imageUpload: new FormControl('')
    });

  }

  async onCameraButtonPress(){
    // await Camera.requestPermissions();
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: this.cameraResultType
    });

    switch(this.cameraResultType)
    {
      case CameraResultType.Base64:
        this.cameraResultData = image.base64String;
        break;
      case CameraResultType.DataUrl:
        this.cameraResultData = image.dataUrl;
        break;
      case CameraResultType.Uri:
        this.cameraResultData = image.path;
        break;
    }
    this.cameraResultExif = JSON.stringify(image.exif);
    this.cameraResultWebPath = image.webPath;
    this.pictureLoad = true;
    
    this.getFile();
  }

  /**
 * Convert BASE64 to BLOB
 * @param base64Image Pass Base64 image data to convert into the BLOB
 */
  private convertBase64ToBlob(base64Image?: string) {
    if(base64Image === undefined)
      return;
    // Split into two parts
    const parts = base64Image.split(';base64,');

    // Hold the content type
    const imageType = parts[0].split(':')[1];

    // Decode Base64 string
    const decodedData = window.atob(parts[1]);

    // Create UNIT8ARRAY of size same as row data length
    const uInt8Array = new Uint8Array(decodedData.length);

    // Insert all character code into uInt8Array
    for (let i = 0; i < decodedData.length; ++i) {
      uInt8Array[i] = decodedData.charCodeAt(i);
    }

    // Return BLOB image after conversion
    let fileName = 'IMAGE_'+ formatDate(Date.now(),'YYYYMMdd_HHMMSS','en-us');
    return new File([uInt8Array], fileName, { type: imageType });
  }

  getFile(){
    let imageData : string = "";
    if(this.cameraResultData)
      imageData = this.cameraResultData;

    this.imageFile = this.convertBase64ToBlob(imageData)
    this.uploadForm.patchValue({imageUpload: ''},{
      emitEvent: true
    });

    this.imageFile?.webkitRelativePath
  }

  async getPermissions(){
    let permissions: PermissionStatus;
    permissions = await Camera.checkPermissions();
     
    if(permissions.camera != 'granted')
    {
      Camera.requestPermissions();
    }
  }

  uploadFile(event: any){
    // const image = (document.getElementById('imageTarget') as HTMLImageElement);
    // const res = fetch(this.imageUrl).then(response => response.body).then(body => {
    //   const reader = body?.getReader();
    
    //   return new ReadableStream({
    //     start(controller) {
    //       return pump();
    
    //       function pump() : any {
    //         return reader?.read().then(({ done, value }) => {
    //           // When no more data needs to be consumed, close the stream
    //           if (done) {
    //             controller.close();
    //             return;
    //           }
    
    //           // Enqueue the next data chunk into our target stream
    //           controller.enqueue(value);
    //           return pump();
    //         });
    //       }
    //     }
    //   })
    // })
    // .then(stream => new Response(stream))
    // .then(response => response.blob())
    // .then(blob => URL.createObjectURL(blob))
    // .then(url => console.log(image.src = url))
    // .catch(err => console.error(err));
    // this.inputFilePath = event.target.files[0].name;
    // this.inputFileRelativePath = event.target.files[0].webkitRelativePath;
    // this.inputFileSize = event.target.files[0].size;
    console.log(event)
    this.inputFilePath = this.imageFile?.webkitRelativePath;
    this.inputFileSize = this.imageFile?.size;
    this.messages = "Event triggered";
  }

  //Does not work well for capacitor
  async getUserMedia(){
    let stream = null;
    try{
      stream = await navigator.mediaDevices.getUserMedia({audio: false, video: {facingMode:"user"}});
    }catch(err){
      console.log(err);
    }
  }
}
