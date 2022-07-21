import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MoviesService } from '../movies.service';
@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.css'],
})
export class CreateMovieComponent implements OnInit {
  title = 'Basic Form';
  subscription: Subscription = new Subscription();
  imageSrc = '';
  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required]),
  });
  showAlert = false;

  constructor(private _MoviesService: MoviesService) {}

  ngOnInit(): void {
    this._MoviesService.aosAnimation();
  }

  get f() {
    return this.myForm.controls;
  }
  // Watch changes in uploaded file
  onFileChange(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.myForm.patchValue({
          fileSource: this.imageSrc,
        });
      };
    }
  }

  OnDestroy() {
    this.subscription.unsubscribe();
    this.showAlert = false;
  }

  submit() {
    // create FormData to send it to the backend
    const formData: any = new FormData();
    formData.append('name', this.myForm.value.name);
    formData.append('image_object', this.myForm.value.fileSource);

    this.subscription = this._MoviesService.createMovie(formData).subscribe({
      next: (response) => {
        console.log(response);
        this.showAlert = true;
      },
      error(err) {
        console.log(err);
      },
    });
  }
}
