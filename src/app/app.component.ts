import { Component, OnInit } from '@angular/core';
import { ParticleService } from './services/particle.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private particleService: ParticleService) { }

  ngOnInit(): void {
    this.particleService.invokeParticles('particles-js');
  }
}
