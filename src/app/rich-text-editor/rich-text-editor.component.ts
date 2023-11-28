import { Component, OnInit } from '@angular/core';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ShareDialogComponent } from '../share-dialog/share-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from '../app.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { URL } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-rich-text-editor',
  templateUrl: './rich-text-editor.component.html',
  styleUrls: ['./rich-text-editor.component.scss']
})
export class RichTextEditorComponent implements OnInit {
  public Editor = ClassicEditor;
  editorForm: FormGroup;

  secretKey: string | undefined;
  textToEncrypt = '';
  encryptedText: string | undefined;
  decryptedText: string | undefined;

  constructor(private fb: FormBuilder,private dialog: MatDialog,private Service:AppService,private snackBar: MatSnackBar) {
    this.editorForm = this.fb.group({
      editorData: [] // Initialize with default content
    });
  }

  submitForm(){
    const formData = this.editorForm.value;
    this.textToEncrypt=formData.editorData;
    this.encryptText();
    if(formData!=null && formData.editorData!=null && this.encryptedText!=null && this.secretKey!=null){
      const formval=new FormData();
      formval.append("text", this.encryptedText);
      formval.append("sharedkey",this.secretKey);

      this.Service.shareText(formval).subscribe({
        next:(data:HttpResponse<any>)=>{
          const dialogRef = this.dialog.open(ShareDialogComponent, {
            data: {
              shareLink:URL+"share/"+data.body.linkcode,
              boxtype:'share'
            },
          });
          dialogRef.afterClosed().subscribe(result => {
          this.showSnackbar('The share box closed!');
          });
        },
        error:(err:HttpErrorResponse)=>{
          this.showSnackbar(err.error.message);
        }
      })
    }
    else{
      this.showSnackbar("Message can't be empty!");
    }

  }
  ngOnInit(): void {
  }
  showSnackbar(msg: string) {
    this.snackBar.open(msg, 'Close', {
      duration: 3000, // Duration in milliseconds
    });}

    encryptText(): void {
      // Generate a random key (128 bits) for each encryption
      this.secretKey = CryptoJS.lib.WordArray.random(128 / 8).toString(CryptoJS.enc.Hex);

      // Encrypt the text
      this.encryptedText = CryptoJS.AES.encrypt(this.textToEncrypt, this.secretKey).toString();
    }

    decryptText(): void {
      if (this.secretKey && this.encryptedText) {
        const decryptedBytes = CryptoJS.AES.decrypt(this.encryptedText, this.secretKey);
        this.decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
      }
      else{
        this.showSnackbar("Error in Message Decryption");
      }
    }
}
