import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Person, ValidationResponse } from '../models';

@Injectable()
export class PersonService {

    readonly baseUrl = environment.apiUrl + 'SEPerson/';
    constructor(private http: HttpClient) { }
    searchPersons = (person: Person | null): Observable<Person[]> => {
        let fullRoute = this.baseUrl + 'search';
        if (person) {
            fullRoute += "?";
            if (person.name && person.name.length > 0) fullRoute = fullRoute + `name=${person.name}&`;
            if (person.lastName && person.lastName.length > 0) fullRoute = fullRoute + `lastName=${person.lastName}&`;
            if (person.pin && person.pin.length > 0) fullRoute = fullRoute + `PIN=${person.pin}`;
        }

        return this.http.get<Person[]>(fullRoute);
    };
    updateCreatePerson = (person: Person) => this.http.post<ValidationResponse>(this.baseUrl, person);
    deletePerson = (id: number) => this.http.delete<boolean>(this.baseUrl + `${id}`);
    getPerson = (id: number): Observable<Person> => this.http.get<Person>(this.baseUrl + `${id}`);

    //po ovom sablonu se pisu serivis

}