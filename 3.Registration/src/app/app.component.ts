import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  formData = {
    fullName: '',
    email: '',
    password: '',
    gender: '',
    agree: false
  };

  onSubmit() {
    alert('Registration Successful!');
    console.log(this.formData);
  }
}
