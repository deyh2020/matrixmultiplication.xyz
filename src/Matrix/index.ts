import xs, {Stream, MemoryStream} from 'xstream';
import {VNode} from '@cycle/dom';
import {DOMSource} from '@cycle/dom/xstream-typings';
import MatrixValues from '../utils/MatrixValues';
import {StateSource} from 'cycle-onionify';
import model, {State, Reducer} from './model';
import intent from './intent';
import view from './view';

export interface Sources {
  DOM: DOMSource;
  onion: StateSource<State>;
}

export interface Sinks {
  DOM: Stream<VNode>;
  onion: Stream<any>;
}

export type State = State;

export default function Matrix(sources: Sources): Sinks {
  const action$ = intent(sources.DOM);
  const reducer$ = model(action$);
  const vdom$ = view(sources.onion.state$);

  const sinks = {
    DOM: vdom$,
    onion: reducer$,
  };
  return sinks;
}
