import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {LoginButtonComponent} from "./component/login-button/login-button.component";
import {HeaderComponent} from "./component/layout/header/header.component";
import {FooterComponent} from "./component/layout/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginButtonComponent, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pipe-it-in-frontend';
}
