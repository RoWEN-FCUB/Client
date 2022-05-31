import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { DeliverService } from '../../services/deliver.service';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import ipserver from '../../ipserver';

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
    destinatario: '',
  };
  modname: string = 'Registrar vale';
  imgurl: string = '';
  user = {id: 0};
  public remoteImg: string = '';

  constructor(private deliverService: DeliverService, private authService: NbAuthService) {
    this.authService.getToken().subscribe((token: NbAuthJWTToken) => {
      this.user = token.getPayload();
    });
  }

  searchCode() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 3000,
    });
    this.deliverService.getDeliver(this.code).subscribe((res: any[]) => {
      // console.log(res);
      if (res.length > 0) {
        this.modname = 'Buscar vale';
        this.deliver.fecha = res[0][2];
        this.deliver.estado = res[0][3];
        this.deliver.proceso = res[0][4];
        this.deliver.importe = res[0][12];
        this.deliver.comprador = res[0][6];
        this.deliver.destinatario = res[0][8];
        this.imgurl = ipserver + 'public/Vales/' + this.code + '.png';
        // console.log(this.deliver);
      } else {
        Toast.fire({
          icon: 'warning',
          title: 'Vale no encontrado',
        } as SweetAlertOptions);
      }
    }, (error: any) => {
      Toast.fire({
        icon: 'error',
        title: 'Error al contactar con el servidor.',
      } as SweetAlertOptions);
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
    this.valeStatus = 'info';
    this.modname = 'Registrar vale';
    this.webcamImage = null;
    this.code = '';
    Object.keys(this.deliver).forEach(function(index) {
      this.deliver[index] = '';
    }.bind(this));
   }

   code_change(): void {
    const valeReg = new RegExp(/^B[0-9]{4,25}$/);
    if (valeReg.test(this.code)) {
      this.valeStatus = 'success';
    } else {
      this.valeStatus = 'danger'
    }
   }

   saveImage(): void {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 3000,
    });
    if (this.valeStatus === 'success') {
      this.deliverService.saveDeliver({code: this.code, img: this.webcamImage.imageAsBase64, id_user: this.user.id}).subscribe(res => {
        Toast.fire({
          icon: 'success',
          title: 'Vale guardado correctamente.',
        } as SweetAlertOptions);
        this.valeStatus = 'info';
        this.webcamImage = null;
        this.code = '';
      }, (error: any) => {
        Toast.fire({
          icon: 'error',
          title: error.error.text,
        } as SweetAlertOptions);
        console.log(error);
      });
    } else {
    Toast.fire({
      icon: 'error',
      title: 'Debe escribir el código del vale.',
    } as SweetAlertOptions);
    this.valeStatus = 'danger';
    }
   }

}
