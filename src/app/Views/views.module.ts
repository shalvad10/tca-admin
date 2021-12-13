import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { ComponentsModule } from '../Components/components.module';

import { AddUserComponent } from './Users/add-user/add-user.component';
import { UserListComponent } from './Users/user-list/user-list.component';
import { UserProfileComponent } from './Users/user-profile/user-profile.component';
import { LoginComponent } from './Authentication/login/login.component';
import { LockScreenComponent } from './Authentication/lock-screen/lock-screen.component';

import { AddProductComponent } from './Products/add-product/add-product.component';
import { ImportProductComponent } from './Products/import-product/import-product.component';
import { ProductListComponent } from './Products/product-list/product-list.component';
import { ProductDetailedComponent } from './Products/product-detailed/product-detailed.component';

import { AddStoreComponent      } from './Stores/Store-add/add-store.component';
import { StoreListComponent     } from './Stores/Store-list/store-list.component';
import { StoreDetailedComponent } from './Stores/Store-detailed/store-detailed.component';

import { AddStoreBranchComponent      } from './StoreBranches/StoreBranches-add/add-store-branch.component';
import { StoreBranchListComponent     } from './StoreBranches/StoreBranches-list/store-branch-list.component';
import { StoreBranchDetailedComponent } from './StoreBranches/StoreBranches-detailed/store-branch-detailed.component';

import { AddSectionComponent } from './Sections/add-section/add-section.component';
import { SectionsListComponent } from './Sections/sections-list/sections-list.component';

import { AddCompanyComponent } from './Companies/add-company/add-company.component';
import { CompaniesListComponent } from './Companies/companies-list/companies-list.component';
import { CompaniesDetailedComponent } from './Companies/Companies-detailed/Companies-detailed.component';


import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DatepickerModule } from 'ng2-datepicker';
import { ProductLogsComponent } from './Logs/product-logs/product-logs.component';


import { AddReasonsComponent } from './Reasons/add-reasons/add-reasons.component';
import { ReasonsListComponent } from './Reasons/reasons-list/reasons-list.component';


@NgModule({
  imports: [NgSelectModule, DatepickerModule,  FormsModule, CommonModule, ComponentsModule ],
  declarations: [
    LockScreenComponent,
    ProductDetailedComponent,
    UserListComponent,
    UserProfileComponent,
    ProductListComponent,
    AddUserComponent,
    AddProductComponent,
    ImportProductComponent,
    SectionsListComponent,
    AddSectionComponent,
    LoginComponent,
    AddCompanyComponent,
    CompaniesListComponent,
    AddStoreComponent,
    StoreListComponent,
    StoreDetailedComponent,
    AddStoreBranchComponent,
    StoreBranchListComponent,
    StoreBranchDetailedComponent,
    MainComponent,
    CompaniesDetailedComponent,
    ProductLogsComponent,
    ReasonsListComponent,
    AddReasonsComponent
  ],
  exports: [
    LockScreenComponent,
    ProductDetailedComponent,
    LoginComponent,
    AddCompanyComponent,
    AddProductComponent,
    ImportProductComponent,
    CompaniesListComponent,
    AddStoreComponent,
    StoreListComponent,
    StoreDetailedComponent,
    AddStoreBranchComponent,
    StoreBranchListComponent,
    StoreBranchDetailedComponent,
    MainComponent,
    CompaniesDetailedComponent,
    ProductLogsComponent,
    ReasonsListComponent,
    AddReasonsComponent
  ]
})
export class ViewsModule { }
