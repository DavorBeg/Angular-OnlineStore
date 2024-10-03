import { Routes } from '@angular/router';
import { MainLayoutComponent } from '../Components/Layouts/main-layout/main-layout.component';
import { StorePageComponent } from '../Components/Pages/store-page/store-page.component';
import { LoginPageComponent } from '../Components/Pages/login-page/login-page.component';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: 'Store',
                component: StorePageComponent
            }
        ]
    },
    {
        path: 'Login',
        component: LoginPageComponent
    }

];
