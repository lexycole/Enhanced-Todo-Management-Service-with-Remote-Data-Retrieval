import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { config } from '../../data/config';
import { BUTTON_STATE } from '../../types/btn-state';

@Component({
  selector: 'app-todo-button',
  templateUrl: './todo-button.component.html',
  styleUrls: ['./todo-button.component.scss'],
})
export class TodoButtonComponent implements OnInit {
  BUTTON_STATE: typeof BUTTON_STATE = BUTTON_STATE;

  //Should be emitted when the state is changed and the new state should be supplied as event data
  @Output() stateChange = new EventEmitter<BUTTON_STATE>();

  private delaySecs: number = config.todos.delayAfterLoadSecs;

  private _state: BUTTON_STATE;

  set state(state) {
    this._state = state;
    this.reflectState();
    this.stateChange.emit(state);
  }

  get state() {
    return this._state;
  }

  // button string
  btnText: string;
  // button disabled boolean
  btnDisabled: boolean;

  // initialize button state as loading
  ngOnInit() {
    this.state = BUTTON_STATE.LOADING;
  }

  // click function to state change button
  onClick() {
    this.state = BUTTON_STATE.LOADING;
  }

  private reflectState() {
    switch (this.state) {
      //  should be disabled and should have loading… as label
      case BUTTON_STATE.LOADING:
        this.btnText = 'loading...';
        this.btnDisabled = true;
        break;

      // at this state the button is disabled and should be delayed for 10 seconds counting down to zero. The delay progress should be indicated as the label( e.g. wait 26 secs, wait 19 secs etc. ). At the end of the delay the state should be changed to loaded.
      case BUTTON_STATE.LOADED_AND_DELAYING:
        this.btnDisabled = true;
        this.delay().subscribe({
          next: (remainingTime) => {
            this.btnText = `wait ${remainingTime} sec${
              remainingTime > 1 ? 's' : ''
            } `;
          },
          complete: () => {
            this.state = BUTTON_STATE.LOADED;
          },
        });
        break;

      // the button should be enabled and should have reload as label
      case BUTTON_STATE.LOADED:
        this.btnText = 'reload';
        this.btnDisabled = false;
        break;

      // the button should be enabled and should have Load Error.Retry as label. There should be no delay
      case BUTTON_STATE.ERROR:
        this.btnText = 'Load Error.Retry';
        this.btnDisabled = false;
        break;
    }
  }

  private delay(): Observable<number> {
    // Delay secs for laoding and delaying button state
    const delaySecs = this.delaySecs;
    return of(delaySecs).pipe();
  }
}
