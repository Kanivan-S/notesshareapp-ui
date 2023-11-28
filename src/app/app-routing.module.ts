import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RichTextEditorComponent } from './rich-text-editor/rich-text-editor.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { RegUserPageComponent } from './reg-user-page/reg-user-page.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { GetTextComponent } from './get-text/get-text.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path:"account", component:LoginRegisterComponent},
  {path:"user",canActivate:[AuthGuard],component:RegUserPageComponent},
  {path:"anonymous",component:RichTextEditorComponent},
  {
    path: 'share/:linkCode',
    component:GetTextComponent ,
  },
  {
    path:"**",component:HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
