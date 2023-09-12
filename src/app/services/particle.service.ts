import { Injectable } from '@angular/core';
import { ParticlesConfig } from '../../assets/particlesjs-config';

declare let particlesJS: any;

@Injectable({
  providedIn: 'root'
})
export class ParticleService {

  constructor() { }

  invokeParticles(particleElementId: string): void {
    if (typeof particlesJS !== 'undefined') {
      particlesJS(particleElementId, ParticlesConfig, function() {});
    }
  }
}
