import { Component, OnInit, Input, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {

  @Input()
  user;

  @ViewChild('cardAviatar')
  cardAviatar: ElementRef;

  constructor(public auth: AuthService, public renderer: Renderer2) { }

  ngOnInit() {
    this.renderer.setStyle(this.cardAviatar.nativeElement, 'background-image', `url('${this.user.photoURL}')`);
  }

}
