import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonSearchComponent } from './person-search/person-search.component';

const routes: Routes = [
    {
        path: '',
        component: PersonSearchComponent,

    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)]
})
export class FeatureRoutingModule { }
