import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatIconModule} from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button'
import { RichTextEditorComponent } from './rich-text-editor/rich-text-editor.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ShareDialogComponent } from './share-dialog/share-dialog.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { RegUserPageComponent } from './reg-user-page/reg-user-page.component';
import { HeaderComponent } from './header/header.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { GetTextComponent } from './get-text/get-text.component';
import { NgOtpInputModule } from  'ng-otp-input';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RichTextEditorComponent,
    ShareDialogComponent,
    SidenavComponent,
    RegUserPageComponent,
    HeaderComponent,
    LoginRegisterComponent,
    GetTextComponent,
  ],
  imports: [
    BrowserModule,
    MatListModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    CKEditorModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSnackBarModule,
    MatTabsModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatMenuModule,
    MatToolbarModule,
    MatDialogModule,
    ClipboardModule,
    RecaptchaFormsModule,
    RecaptchaModule,
    HttpClientModule,
    NgOtpInputModule

  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: environment.recaptcha.siteKey,
      } as RecaptchaSettings,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
