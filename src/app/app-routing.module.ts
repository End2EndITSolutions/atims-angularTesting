import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BarcodeScanComponent } from './barcode-scan/barcode-scan.component';
import { CapacitorBrowserComponent } from './capacitor-browser/capacitor-browser.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { ImageCropComponent } from './image-crop/image-crop.component';
import { LazythingComponent } from './lazy-thing/lazything.component';
import { LibraryTestComponent } from './library-test/library-test.component';
import { ParentComponentComponent } from './parent-component/parent-component.component';
import { ChildComponentComponent } from './child-component/child-component.component';
import { KeyboardTestComponent } from './keyboard-test/keyboard-test.component';

const routes: Routes = [
  { path: 'file-upload', component: FileUploadComponent},
  { path: 'library-test', component: LibraryTestComponent},
  { path: 'barcode-scan', component: BarcodeScanComponent},
  { path: 'image-crop', component: ImageCropComponent},
  { path: 'parent-component', component: ParentComponentComponent},
  //{ path: 'lazy-thing', component: LazythingComponent}
  { path: 'capacitor-browser', component: CapacitorBrowserComponent},
  { path: 'child-component', component: ChildComponentComponent},
  { path: 'keyboard-test', component: KeyboardTestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
