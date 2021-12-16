import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { InfoBoxComponent } from './info-box/info-box.component';
import { InfoPanelComponent } from './info-panel/info-panel.component';
import { LogoComponent } from './logo/logo.component';
import { MenuPanelComponent } from './menu-panel/menu-panel.component';
import { UniversalViewComponent } from './universal-view/universal-view.component';
import { UserCardComponent } from './user-card/user-card.component';
import { LastUsersComponent } from './last-users/last-users.component';
import { LastActionsComponent } from './last-actions/last-actions.component';
import { StatisticChartComponent } from './statistic-chart/statistic-chart.component';

import { SectionsTableComponent } from './Tables/sections-table/sections-table.component';
import { UserTableComponent } from './Tables/user-table/user-table.component';
import { UserRolesTableComponent } from './Tables/user-roles-table/user-roles-table.component';
import { UserLogTableComponent } from './Tables/user-log-table/user-log-table.component';
import { ProductsTableComponent } from './Tables/products-table/products-table.component';
import { ProductsLogTableComponent } from './Tables/products-log-table/products-log-table.component';
import { ProductsSmallTableComponent } from './Tables/products-small-table/products-small-table.component';
import { CompanyTableComponent } from './Tables/company-table/company-table.component';
import { StoreTableComponent } from './Tables/store-table/store-table.component';
import { StoreBranchesTableComponent } from './Tables/store-branches-table/store-branches-table.component';
import { StoreAttendanceTableComponent } from './Tables/store-attendance-table/store-attendance-table.component';
import { StickyNotesComponent } from './sticky-notes/sticky-notes.component';
import { LoaderComponent } from './loader/loader.component';
import { FormsModule } from '@angular/forms';
import { SearchFilterPipe } from './Tables/company-table/search.pipe';


import { ReasonsTableComponent } from './Tables/reasons-table/reasons-table.component';

@NgModule({
  imports: [ CommonModule, FormsModule ],
  declarations: [
    SearchFilterPipe,
    HeaderComponent,
    InfoBoxComponent,
    InfoPanelComponent,
    LogoComponent,
    MenuPanelComponent,
    SectionsTableComponent,
    StoreTableComponent,
    StoreBranchesTableComponent,
    UniversalViewComponent,
    UserCardComponent,
    LastUsersComponent,
    LastActionsComponent,
    StatisticChartComponent,
    CompanyTableComponent,
    ProductsTableComponent,
    ProductsLogTableComponent,
    UserTableComponent,
    UserRolesTableComponent,
    ProductsSmallTableComponent,
    StoreAttendanceTableComponent,
    UserLogTableComponent,
    StickyNotesComponent,
    LoaderComponent,
    ReasonsTableComponent
  ],
  exports: [
    HeaderComponent,
    InfoBoxComponent,
    InfoPanelComponent,
    LogoComponent,
    MenuPanelComponent,
    SectionsTableComponent,
    StoreTableComponent,
    StoreBranchesTableComponent,
    UniversalViewComponent,
    UserCardComponent,
    LastUsersComponent,
    LastActionsComponent,
    StatisticChartComponent,
    CompanyTableComponent,
    ProductsTableComponent,
    ProductsLogTableComponent,
    UserTableComponent,
    UserRolesTableComponent,
    ProductsSmallTableComponent,
    StoreAttendanceTableComponent,
    UserLogTableComponent,
    StickyNotesComponent,
    LoaderComponent,
    ReasonsTableComponent
  ]
})
export class ComponentsModule { }
