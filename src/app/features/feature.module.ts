import { NgModule } from '@angular/core';
import { PersonService } from '../services/person.service';
import { SharedModule } from '../shared/shared.module';
import { FeatureRoutingModule } from './feature.routing';
import { PersonFormComponent } from './person-form/person-form.component';
import { PersonSearchComponent } from './person-search/person-search.component';

@NgModule({
    declarations: [PersonFormComponent, PersonSearchComponent],
    imports: [SharedModule, FeatureRoutingModule],
    exports: [],
    providers: [PersonService],
})
export class FeatureModule { }