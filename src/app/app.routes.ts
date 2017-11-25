import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

export const AppRoutes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent }
];
