import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'scan-qr',
  templateUrl: './scan-qr.component.html',
  styleUrls: ['./scan-qr.component.scss']
})
export class ScanQRComponent {
  public cameras:MediaDeviceInfo[]=[];
  public myDevice!: MediaDeviceInfo;
  public scannerEnabled=false;
  public results:string[]=[];

  constructor(protected dialogRef: NbDialogRef<any>){}

  close(){
    this.dialogRef.close(null);   // Close the dialog 	  this.dialogRef.close(null);  // or simply.close()
  }

  camerasFoundHandler(cameras: MediaDeviceInfo[]){
    this.cameras=cameras;
    this.selectCamera(this.cameras[this.cameras.length - 1].label);
  }

  scanSuccessHandler(event:string){
    //console.log(event);
    this.results.unshift(event);
    this.dialogRef.close(this.parseInput(event));
  }

  selectCamera(cameraLabel: string){    
    this.cameras.forEach(camera=>{
      if(camera.label.includes(cameraLabel)){
        this.myDevice=camera;
        console.log(camera.label);
        this.scannerEnabled=true;
      }
    })    
  }

  parseInput(input: string): Record<string, string> | null {
    const lines = input.split("\r\n");
    const regex = /^(N|A|CI|FV):(.+)$/;

    let result: Record<string, string> = {};

    for (const line of lines) {
      const match = line.match(regex);
        if (match) {
            const [, key, value] = match;
            result[key] = value;
        }
    }

    if (Object.keys(result).length === 0) {
        return null; // No se encontraron coincidencias válidas en el formato de entrada.
    }

    return result;
  }

}
