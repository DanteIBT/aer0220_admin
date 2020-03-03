// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Components
import { AppComponent } from './app.component';
import { ListComponent } from './components/list/list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { WrapperComponent } from './components/shared/wrapper/wrapper.component';
import { WrapperImgComponent } from './components/shared/wrapper-img/wrapper-img.component';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { ComponentsComponent } from './components/components.component';

// Routes
import { ROUTES } from './app.routes';


@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    ProfileComponent,
    NavbarComponent,
    HomeComponent,
    WrapperComponent,
    WrapperImgComponent,
    LoginComponent,
    FooterComponent,
    ComponentsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot( ROUTES, { useHash: true } )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
