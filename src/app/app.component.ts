import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './component/layout/header/header.component';
import { FooterComponent } from './component/layout/footer/footer.component';
import { ToastModule } from 'primeng/toast';
import { AuthenticationService } from './auth/authentication.service';
import { AsyncPipe } from '@angular/common';
import { MessagesModule } from 'primeng/messages';
import 'highlight.js/styles/androidstudio.min.css';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [
		RouterOutlet,
		HeaderComponent,
		FooterComponent,
		ToastModule,
		AsyncPipe,
		MessagesModule,
	],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {
	constructor(protected authService: AuthenticationService) {}
	title = 'pipe-it-in-frontend';
}
