import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './Views/main/main.component';

import { ProductDetailedComponent } from './Views/Products/product-detailed/product-detailed.component';
import { ProductListComponent } from './Views/Products/product-list/product-list.component';
import { AddProductComponent } from './Views/Products/add-product/add-product.component';

import { UserListComponent } from './Views/Users/user-list/user-list.component';
import { UserProfileComponent } from './Views/Users/user-profile/user-profile.component';
import { AddUserComponent } from './Views/Users/add-user/add-user.component';
import { SectionsListComponent } from './Views/Sections/sections-list/sections-list.component';
import { AddSectionComponent } from './Views/Sections/add-section/add-section.component';
import { LoginComponent } from './Views/Authentication/login/login.component';
import { CompaniesListComponent } from './Views/Companies/companies-list/companies-list.component';
import { AddCompanyComponent } from './Views/Companies/add-company/add-company.component';
import { AddStoreComponent } from './Views/Stores/Store-add/add-store.component';
import { StoreListComponent } from './Views/Stores/Store-list/store-list.component';
import { StoreDetailedComponent } from './Views/Stores/Store-detailed/store-detailed.component';
import { ImportProductComponent } from './Views/Products/import-product/import-product.component';
import { CompaniesDetailedComponent } from './Views/Companies/Companies-detailed/Companies-detailed.component';
import { ProductLogsComponent } from './Views/Logs/product-logs/product-logs.component';
import { AddStoreBranchComponent } from './Views/StoreBranches/StoreBranches-add/add-store-branch.component';
import { StoreBranchListComponent } from './Views/StoreBranches/StoreBranches-list/store-branch-list.component';
import { StoreBranchDetailedComponent } from './Views/StoreBranches/StoreBranches-detailed/store-branch-detailed.component';
import { ReasonsListComponent } from './Views/Reasons/reasons-list/reasons-list.component';
import { AddReasonsComponent } from './Views/Reasons/add-reasons/add-reasons.component';


const routes: Routes = [
  { path: '',                 component: MainComponent                },
  { path: 'products',         component: ProductListComponent         },
  { path: 'products/add',     component: AddProductComponent          },
  { path: 'products/import',  component: ImportProductComponent       },
  { path: 'products/logs',    component: ProductLogsComponent         },
  { path: 'products/:id',     component: ProductDetailedComponent     },
  { path: 'users',            component: UserListComponent            },
  { path: 'users/register',   component: AddUserComponent             },
  { path: 'users/auth',       component: LoginComponent               },
  { path: 'users/:id',        component: UserProfileComponent         },
  { path: 'sections',         component: SectionsListComponent        },
  { path: 'sections/add',     component: AddSectionComponent          },
  { path: 'store',            component: StoreListComponent           },
  { path: 'store/add',        component: AddStoreComponent            },
  { path: 'store/:id',        component: StoreDetailedComponent       },
  { path: 'storeBranch',      component: StoreBranchListComponent     },
  { path: 'storeBranch/add',  component: AddStoreBranchComponent      },
  { path: 'storeBranch/:id',  component: StoreBranchDetailedComponent },
  { path: 'companies',        component: CompaniesListComponent       },
  { path: 'companies/add',    component: AddCompanyComponent          },
  { path: 'companies/:id',    component: CompaniesDetailedComponent   },
  { path: 'reasons',          component: ReasonsListComponent         },
  { path: 'reasons/add',      component: AddReasonsComponent          },
  { path: '**', redirectTo: '', pathMatch: 'full'                     }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
