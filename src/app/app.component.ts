import { Component, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { ParticlesConfig } from '../assets/particlesjs-config';

declare let particlesJS: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Drooms-test-exercise';

  constructor(private el: ElementRef) {}

  public ngOnInit(): void {
    this.invokeParticles();
  }

  public invokeParticles(): void {
    particlesJS('particles-js', ParticlesConfig, function() {});
  }
}
