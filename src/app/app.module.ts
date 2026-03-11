import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { NgxTestLibraryModule } from 'ngx-test-library';

//Material Imports
import { MatButtonModule } from '@angular/material/button'
import { MatListModule } from '@angular/material/list'
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatIcon, MatIconModule } from '@angular/material/icon'
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { LibraryTestComponent } from './library-test/library-test.component';
import { BarcodeScanComponent } from './barcode-scan/barcode-scan.component'
import { ImageCropperModule } from 'ngx-image-cropper';
import { ImageCropComponent } from './image-crop/image-crop.component';
import { ParentComponentComponent } from './parent-component/parent-component.component';
import { CameraService } from './camera.service';
import { CapacitorBrowserComponent } from './capacitor-browser/capacitor-browser.component';
// import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { ChildComponentComponent } from './child-component/child-component.component';
import { KeyboardTestComponent } from './keyboard-test/keyboard-test.component';
import { WebcamModule } from 'ngx-webcam';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { QRScannerComponent } from './qrscanner/qrscanner.component';



@NgModule({ declarations: [
        AppComponent,
        FileUploadComponent,
        BarcodeScanComponent,
        LibraryTestComponent,
        ImageCropComponent,
        ParentComponentComponent,
        CapacitorBrowserComponent,
        ChildComponentComponent,
        KeyboardTestComponent,
        QRScannerComponent
    ],
    bootstrap: [AppComponent],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
    , imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatListModule,
        NgxTestLibraryModule,
        ImageCropperModule,
        FormsModule,
        WebcamModule,
        ZXingScannerModule,
        MatDialogModule,
        MatSidenavModule,
        MatIconModule
    ]
    , providers: [
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }
