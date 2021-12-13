import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sticky-notes',
  templateUrl: './sticky-notes.component.html',
  styleUrls: ['./sticky-notes.component.scss']
})
export class StickyNotesComponent implements OnInit {

  constructor() { }

  @Input() notes: any;

  ngOnInit(): void { }

}
