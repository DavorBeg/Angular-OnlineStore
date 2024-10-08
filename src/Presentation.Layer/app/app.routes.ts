import { Routes } from '@angular/router';
import { MainLayoutComponent } from '../Components/Layouts/main-layout/main-layout.component';
import { StorePageComponent } from '../Components/Pages/store-page/store-page.component';
import { LoginPageComponent } from '../Components/Pages/login-page/login-page.component';
import { ShoppingCartComponent } from '../Components/Pages/shopping-cart/shopping-cart.component';
import { AuthGuardService } from '../../Application.Layer/Authentication/auth-guard.service';
import { HomePageComponent } from '../Components/Pages/home-page/home-page.component';
import { BookmarkComponent } from '../Components/Pages/bookmark/bookmark.component';
import { UserProfileComponent } from '../Components/Pages/user-profile/user-profile.component';

export const routes: Routes = [
    {
        
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'homepage',
                pathMatch: 'full'
            },
            {
                path: 'homepage',
                component: HomePageComponent,
            },
            {
                path: 'store',
                component: StorePageComponent,
                pathMatch: 'full'
            },
            {
                path: "shoppingcart",
                component: ShoppingCartComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: "bookmark",
                component: BookmarkComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: "profile/:user",
                component: UserProfileComponent,
                canActivate: [AuthGuardService]
            }
        ]
    },
    {
        path: 'login',
        component: LoginPageComponent
    }

];
