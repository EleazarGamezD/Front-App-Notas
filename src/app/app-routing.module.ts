import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { NotesHomeComponent } from './notes/notes-home/notes-home.component';
import { NotesNewComponent } from './notes/notes-new/notes-new.component';
import { NotesEditComponent } from './notes/notes-edit/notes-edit.component';
import { NotesMenuComponent } from './notes/notes-menu/notes-menu.component';



const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'allnote', component: NotesHomeComponent },
  { path: 'newnote', component: NotesNewComponent },
  { path: 'editnote', component: NotesEditComponent },
  { path: 'menunote', component: NotesMenuComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
