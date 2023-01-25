import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { timer } from 'rxjs';
import { map, take } from 'rxjs/operators';

const durationSetup = require('moment-duration-format');
durationSetup(moment);

export function countdownTimer(date: moment.Moment|Date, format: string = 'd[ д.] h[ ч.] m[ мин.] s[ сек.]', settings: moment.DurationFormatSettings = { trim: 'both' }) {
  let countdownStart = moment(date).unix() - moment().unix();
  return timer(1000, 1000).pipe(map(i => countdownStart - i), take(countdownStart + 1), map(v => moment.duration(v, 's').format(format, settings)));
}

export function duration(duration: number, format: string = 'd[ д.] h[ ч.] m[ мин.] s[ сек.]', settings: moment.DurationFormatSettings = { trim: 'both' }) {
  return moment.duration(duration, 's').format(format, settings)
}
