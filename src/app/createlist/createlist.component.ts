import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-createlist',
  templateUrl: './createlist.component.html',
  styleUrls: ['./createlist.component.css'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, MatInputModule, MatButtonModule, MatIconModule],
})
export class CreatelistComponent implements OnInit {

  // constructor() { }

  ngOnInit(): void {
    console.log('init');
  }
  value = 'Symbol';
//  symbolFormControl = new FormControl('', [Validators.required, Validators.email]);

  onCreate() {
    // window.alert('create');
    // console.log('create');

  }


}
