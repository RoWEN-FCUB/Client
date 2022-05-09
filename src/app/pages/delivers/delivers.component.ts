import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { DeliverService } from '../../services/deliver.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'delivers',
  templateUrl: './delivers.component.html',
  styleUrls: ['./delivers.component.scss'],
})
export class DeliversComponent {
  public webcamImage: WebcamImage = null;
  private trigger: Subject<void> = new Subject<void>();
  public valeStatus = 'info';
  public videoWidth: Number;
  code: string = '';
  deliver = {
    fecha: '',
    estado: '',
    proceso: '',
    importe: '',
    comprador: '',
    destinatario: ''
  }

  constructor(private deliverService: DeliverService) {
    
  }

  searchCode() {
    this.deliverService.getDeliver(this.code).subscribe((res: any[]) => {
      // console.log(res);
      if (res.length > 0) {
        this.deliver.fecha = res[0][2];
        this.deliver.estado = res[0][3];
        this.deliver.proceso = res[0][4];
        this.deliver.importe = res[0][12];
        this.deliver.comprador = res[0][6];
        this.deliver.destinatario = res[0][8];
        // console.log(this.deliver);
      }
    });
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
