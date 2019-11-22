import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'upload-img',
  templateUrl: './upload-img.component.html',
  styleUrls: ['./upload-img.component.scss']
})
export class UploadImgComponent implements OnInit {
  title = '';
  imgURL: any;
  new_avatar = {fname: ''};
  constructor(protected dialogRef: NbDialogRef<any>, private userService: UserService) { }

  ngOnInit() {
  }

  preview(files) {
    if (files.length === 0)
      return;
    let formData = new FormData();
    formData.append("uploads",files[0], files[0].filename);
    //console.log(formData.get('uploads'));
    
    this.userService.saveAvatar(formData).subscribe(
      res => {
        this.new_avatar = res as any;
        this.close();
        //console.log(new_avatar.fname);
      }      
    );    
  }

  close() {
    this.dialogRef.close(this.new_avatar.fname);
  }

}
