import { Component, Input, OnInit } from '@angular/core';
import { TODO, TODO_STATUS } from '../../types/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  TODO_STATUS: typeof TODO_STATUS = TODO_STATUS;

  // binds to the property todos in the parent component
  @Input() todo: TODO;
  constructor() {}

  ngOnInit() {}
}
