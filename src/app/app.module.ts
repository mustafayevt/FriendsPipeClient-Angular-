import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { FooterComponent } from './footer/footer.component';
import { PostsComponent } from './posts/posts.component';
import { PeopleSideBarComponent } from './people-side-bar/people-side-bar.component';
import { AuthService } from './Services/Auth.service';
import { PostService } from './Services/post.service';

import { HomeGuard } from './auth/guards/home.guard';
import { AuthGuard } from './auth/guards/auth.guard';
import { TokenInterceptor } from './auth/token.interceptor';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { FindFriendsComponent } from './find-friends/find-friends.component';
import { MessengerComponent } from './messenger/messenger.component';
import { ChatComponent } from './chat/chat.component';



const routes: Routes = [
  { path: '', component: HomePageComponent, canActivate: [HomeGuard] },
  {
    path: 'LoginRegister',
    component: LoginRegisterComponent,
    canActivate: [AuthGuard]
  },
  { path: 'home', component: HomePageComponent, canActivate: [HomeGuard] },
  { path: 'messenger', component: MessengerComponent, canActivate: [HomeGuard] },
  { path: 'post/detail/:id', component: PostDetailComponent, canActivate: [HomeGuard] },
  { path: '*', component: HomePageComponent, canActivate: [HomeGuard] },
  { path: '**', component: HomePageComponent, canActivate: [HomeGuard] }
];


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomePageComponent,
    LoginRegisterComponent,
    FooterComponent,
    PostsComponent,
    PeopleSideBarComponent,
    PostDetailComponent,
    FindFriendsComponent,
    MessengerComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      routes,
      { enableTracing: true }
    )
  ],
  providers: [AuthService, PostService, AuthGuard,
    AuthService,
    TokenInterceptor,
    HomeGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
