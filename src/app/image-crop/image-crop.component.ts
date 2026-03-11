import { Component, OnInit, ViewChild } from '@angular/core';
import { ImageCroppedEvent, LoadedImage,ImageCropperComponent } from 'ngx-image-cropper';
import { CameraService } from '../camera.service';

@Component({
    selector: 'app-image-crop',
    templateUrl: './image-crop.component.html',
    styleUrls: ['./image-crop.component.css'],
    standalone: false
})
export class ImageCropComponent implements OnInit {
  imageChangedEvent: any = '';
  croppedImage: any = '';
  @ViewChild(ImageCropperComponent) imageCropper: ImageCropperComponent;
  
  constructor(cameraService: CameraService) {
    // cameraService.setData("Image Crop Component Startup");
   }

  ngOnInit(): void {
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.croppedImage
    console.log(this.croppedImage);
  }
  imageLoaded(image: LoadedImage) {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
}
