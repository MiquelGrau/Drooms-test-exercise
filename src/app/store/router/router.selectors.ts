import { createFeatureSelector } from '@ngrx/store';
import { RouterReducerState } from '@ngrx/router-store';

export const selectRouterState = createFeatureSelector<RouterReducerState>('router');
