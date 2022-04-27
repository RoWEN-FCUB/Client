import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'delivers',
  templateUrl: './delivers.component.html',
  styleUrls: ['./delivers.component.scss'],
})
export class DeliversComponent implements OnInit {
  public webcamImage: WebcamImage = null;
  private trigger: Subject<void> = new Subject<void>();
  public valeStatus = 'info';
  public videoWidth: Number;

  constructor() { }

  ngOnInit(): void {

  }

  triggerSnapshot(): void {
    this.trigger.next();
  }

   // tslint:disable-next-line: use-lifecycle-interface
   ngAfterViewInit() {
     // this.videoWidth = this.vale.nativeElement.getBoundingClientRect().width;
     // console.log(this.videoWidth);
     this.videoWidth = 225;
   }

   handleImage(webcamImage: WebcamImage): void {
    // console.info('Saved webcam image', webcamImage);
    this.webcamImage = webcamImage;
   }

   public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
   }

   public handleInitError(error: WebcamInitError): void {
     if (error.mediaStreamError && error.mediaStreamError.name === 'NotAllowedError') {
       console.warn('Camera access was not allowed by user!');
     }
   }

   deleteImage(): void {
     this.webcamImage = null;
   }

}
