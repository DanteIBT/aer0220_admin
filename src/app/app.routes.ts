import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ListComponent } from './components/list/list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { ComponentsComponent } from './components/components.component';

import { AuthGuard } from './guards/auth.guard';

export const ROUTES: Routes = [

    { path: '', pathMatch: 'full', redirectTo: 'login' },
    { path: 'login', component: LoginComponent},
    { path: '', component: ComponentsComponent, children: [
        { path: 'home', component: HomeComponent, canActivate: [ AuthGuard ] },
        { path: 'list', component: ListComponent, canActivate: [ AuthGuard ] },
        { path: 'profile/:id', component: ProfileComponent, canActivate: [ AuthGuard ] }
    ]},
];
