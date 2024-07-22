import { Component, OnInit } from '@angular/core';
import { PersonalCodesListComponent } from '../../../pages/codes/personal-codes-list/personal-codes-list.component';
import { SidenavComponent } from '../../nav/sidenav/sidenav.component';
import { TabsComponent } from '../tabs/tabs.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
	selector: 'app-basic-layout',
	standalone: true,
	imports: [
		PersonalCodesListComponent,
		SidenavComponent,
		TabsComponent,
		RouterOutlet,
	],
	templateUrl: './basic-layout.component.html',
	styleUrl: './basic-layout.component.scss',
})
export class BasicLayoutComponent implements OnInit {
	constructor(private route: ActivatedRoute) {}
	routerOutlet: boolean = false;

	ngOnInit(): void {
		// Access the route data here
		this.route.data.subscribe(data => {
			this.routerOutlet = data['routerOutlet'];
		});
	}
}