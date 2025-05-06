import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, JsonPipe],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'registration';

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
