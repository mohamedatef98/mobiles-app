import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from  '@angular/common/http';

import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AppComponent } from './app.component';
import { ContentComponent } from './content/content.component';
import { HomeComponent } from './content/home/home.component';
import { AllBrandsComponent } from './content/all-brands/all-brands.component';
import { BrandComponent } from './content/brand/brand.component';
import { MobileComponent } from './content/mobile/mobile.component';
import { FooterComponent } from './footer/footer.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'brands', component: AllBrandsComponent },
  { path: 'brand/:brand', component: BrandComponent },
  { path: 'mobile/:id', component: MobileComponent },
  //{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    NavBarComponent,
    FooterComponent,
    AppComponent,
    ContentComponent,
    HomeComponent,
    AllBrandsComponent,
    BrandComponent,
    MobileComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
