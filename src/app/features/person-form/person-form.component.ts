import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnInit, Optional, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from "@angular/material/snack-bar";
import { first } from 'rxjs/operators';
import { Person, ValidationResponse } from 'src/app/models';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonFormComponent implements OnInit {
  @Input() isSearch: boolean = false;
  @Output() emitSearch: EventEmitter<Person> = new EventEmitter();

  requiredError(control: string): boolean | undefined {
    return this.personForm.get(control)?.errors?.required && this.personForm?.get(control)?.touched;
  }
  patternError(control: string): boolean | undefined {
    return this.personForm.get(control)?.errors?.pattern && this.personForm.get(control)?.value?.length > 0;
  }
  personForm: FormGroup;

  constructor(private fb: FormBuilder,
    private personService: PersonService,
    private matSnack: MatSnackBar,
    @Optional() public dialogRef: MatDialogRef<PersonFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: { id: number }) {
    this.personForm = this.fb.group({
      "id": 0,
      "name": [null, Validators.required],
      "lastName": [null, Validators.required],
      "pin": [null, Validators.required]
    })

  }

  ngOnInit(): void {
    if (this.isSearch) {
      Object.keys(this.personForm.controls).forEach(key => {
        this.personForm.get(key)?.setValidators(null)
      });
    }
    if (this.data?.id) {
      this.personService.getPerson(this.data.id).pipe(first()).subscribe(person => {
        this.personForm.patchValue(person);
      });
    }
  }
  cancel() {
    if (this.isSearch) {
      this.personForm.reset();
      this.emitSearch.emit();
    } else {
      this.dialogRef.close();
    }
  }

  submit() {
    if (this.isSearch) {
      if (this.personForm.get('pin')?.errors?.pattern == null)
        this.emitSearch.emit(this.personForm.value);
      return;
    }

    if (this.personForm.valid) {
      this.personService.updateCreatePerson(this.personForm.value).pipe(first())
        .subscribe((x: ValidationResponse) => {
          if (x.isSuccess) {
            this.matSnack.open(x.message, undefined, { duration: 4000, panelClass: ['successSnack'] });
            this.dialogRef.close(true);
          }
          else {
            this.matSnack.open(x.message ?? "Error occured", undefined, { duration: 4000, panelClass: ['errorSnack'] });
          }
        })
    }
  }

}

