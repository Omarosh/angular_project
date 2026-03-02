import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ICat } from '../../types/icat';
import { firstValueFrom } from 'rxjs';
import { CatDataService } from '../../services/cat-data.service';

@Component({
  selector: 'app-offercat',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './offercat.html',
  styleUrls: ['./offercat.css'],
})
export class Offercat implements OnInit {

  offerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private catService: CatDataService
  ) {}

  ngOnInit(): void {
    this.offerForm = this.fb.group({
      name: ['', [Validators.required, this.minLengthValidator(3)]],
      breedsId: ['', [Validators.required, this.breedFormatValidator]],
      id: ['', Validators.required],
      url: ['', [Validators.required, Validators.pattern('https?://.+')]],
      width: [0, [Validators.required, Validators.min(100)]],
      height: [0, [Validators.required, Validators.min(100)]],
      value: [0, [Validators.required, Validators.min(1)]],
      description: ['', [Validators.required, this.minWordsValidator(5)]],
    });
  }

  minLengthValidator(min: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      if (control.value.trim().length < min) {
        return { minLengthCustom: true };
      }
      return null;
    };
  }

  breedFormatValidator(control: AbstractControl): ValidationErrors | null {
    const regex = /^[a-z]{3,5}$/;
    if (!regex.test(control.value)) {
      return { invalidBreedId: true };
    }
    return null;
  }

  minWordsValidator(minWords: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;

      const words = control.value.trim().split(' ');
      if (words.length < minWords) {
        return { minWords: true };
      }
      return null;
    };
  }

  async submitForm() {

    if (this.offerForm.invalid) {
      this.offerForm.markAllAsTouched();
      return;
    }

    try {
      // Get cats array from Observable
      const cats: ICat[] = await firstValueFrom(
        this.catService.getAllCats()
      );

      const newId = cats.length > 0
        ? Math.max(...cats.map(c => c.catId)) + 1
        : 1;

      const newCat: ICat = {
        catId: newId,
        expanded: false,
        ...this.offerForm.value
      };

      await firstValueFrom(
        this.catService.postCat(newCat)
      );

      alert("Cat added successfully!");
      this.offerForm.reset();

    } catch (error) {
      console.error(error);
      alert("Failed to add cat");
    }
  }

  get f() {
    return this.offerForm.controls;
  }
}