import { ChangeDetectorRef, Component, EventEmitter, Output, Signal, ViewChild, computed } from '@angular/core';
import { CameraService } from './camera.service';
import { SplashScreen } from '@capacitor/splash-screen';
import { MobileService } from './mobile.service';
import { Capacitor } from '@capacitor/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent {
  @ViewChild('drawer') public drawer: MatDrawer;

  title = 'AngularTest';
  os: string;
  mobileStorageValid: boolean = false;
  isMobile: Signal<boolean> = this.mobileService.getIsMobile();
  component: string;

  constructor(private cameraService: CameraService, private mobileService: MobileService,
    private cdr: ChangeDetectorRef
  ) {
    console.log('AppComponent constructor');
    SplashScreen.hide().then(() => console.log("Splash closed"));
    if (Capacitor.isNativePlatform())
      this.mobileService.prepareStorageLocation().then(res => this.mobileStorageValid = res);


    this.mobileService.getDeviceInfo().then((res) => {
      console.log('Logged device info')
      this.os = res.operatingSystem
      this.cdr.detectChanges();
    });
  }

  toggleSidenav() {
    this.drawer.toggle()
  }

  selectedComponent(component: string) {
    this.component = component;
  }
}



