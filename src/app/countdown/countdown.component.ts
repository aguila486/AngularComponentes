import { Component, OnInit, Output, Input, OnDestroy, OnChanges,  EventEmitter } from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit, OnDestroy {

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onDecrease = new EventEmitter<number>();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onComplete = new EventEmitter<void>();

  @Input() init = null;
  public counter = 0;
  private countdownTimeRef: any = null;

  constructor() { }

  ngOnInit(): void {
    this.startCountdown();
  }

  ngOnDestroy(): void {
    this.clearTimeout();
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(changes): void {
    console.log('init value update to: ', changes.init.currentValue);
    this.startCountdown();
  }

  startCountdown() {
    if ( this.init && this.init > 0 ) {
      this.clearTimeout();
      this.counter = this.init;
      this.doCountdown();
    }
  }

  doCountdown() {
    this.countdownTimeRef = setTimeout( () => {
      this.counter = this.counter - 1;
      this.processCountdown();
    }, 1000);
  }

  private clearTimeout() {
    if (this.countdownTimeRef) {
      clearTimeout(this.countdownTimeRef);
      this.countdownTimeRef = null;
    }
  }

  processCountdown() {
    this.onDecrease.emit(this.counter);
    console.log('count is ', this.counter);

    if ( this.counter === 0 ) {
      this.onComplete.emit();
      console.log('-- counter end --');
    } else {
      this.doCountdown();
    }
  }

}
