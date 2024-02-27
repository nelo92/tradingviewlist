import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-createlist',
  templateUrl: './createlist.component.html',
  styleUrls: ['./createlist.component.css'],
})
export class CreatelistComponent implements OnInit {
  value = 'Symbol';
  //  symbolFormControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(private store: AngularFirestore) {}

  ngOnInit(): void {
    console.log('init');
  }

  onCreate() {
    // window.alert('create');
    // console.log('create');
  }
}
