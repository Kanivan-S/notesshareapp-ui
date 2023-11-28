import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-get-text',
  templateUrl: './get-text.component.html',
  styleUrls: ['./get-text.component.scss']
})
export class GetTextComponent implements OnInit {
  text:string | undefined;
  public Editor = ClassicEditor;
  secretKey: string | undefined;
  encryptedText: string | undefined;
  decryptedText: string | undefined;

  // HtmlContent: SafeHtml | undefined;
  constructor(private route: ActivatedRoute,private Service:AppService,private snackBar:MatSnackBar,private sanitizer: DomSanitizer){}
  ngOnInit(): void {
    let linkcode = this.route.snapshot.paramMap.get('linkCode');
    linkcode=(linkcode!=null)?linkcode:"";
    this.Service.getText(linkcode).subscribe({
      next:(data:HttpResponse<any>)=>{
        this.encryptedText=(data.body.data.text);
        this.secretKey=data.body.data.sharedkey;
        this.decryptText();
        this.text=this.decryptedText;
        // this.HtmlContent = this.sanitizer.bypassSecurityTrustHtml(data.body.data.text);
      },
      error:(err:HttpErrorResponse)=>{
        this.showSnackbar(err.error.message);
      }
    })

  }
  showSnackbar(msg: string) {
    this.snackBar.open(msg, 'Close', {
      duration: 3000, // Duration in milliseconds
  });}

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
