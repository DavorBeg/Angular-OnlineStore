import { Routes } from '@angular/router';
import { MainLayoutComponent } from '../Components/Layouts/main-layout/main-layout.component';
import { StorePageComponent } from '../Components/Pages/store-page/store-page.component';
import { LoginPageComponent } from '../Components/Pages/login-page/login-page.component';
import { ShoppingCartComponent } from '../Components/Pages/shopping-cart/shopping-cart.component';
import { AuthGuardService } from '../../Application.Layer/Authentication/auth-guard.service';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: 'Store',
                component: StorePageComponent
            },
            {
                path: "ShoppingCart",
                component: ShoppingCartComponent,
                canActivate: [AuthGuardService]
            }
        ]
    },
    {
        path: 'Login',
        component: LoginPageComponent
    }

];
