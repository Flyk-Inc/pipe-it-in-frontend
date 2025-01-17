import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IconComponent } from '../../typography/icon/icon.component';
import { NgClass, NgForOf, TitleCasePipe } from '@angular/common';
import { UnderlineComponent } from '../../layout/underline/underline.component';
import { codeRoutePath } from '../../../pages/codes/routes';
import { pipelineRoutePath } from '../../../pages/codes/pipelines/routes';
import { navbarItem } from '../../layout/navbar/navbar.component';

@Component({
	selector: 'app-sidenav',
	standalone: true,
	imports: [
		RouterLink,
		IconComponent,
		RouterLinkActive,
		NgForOf,
		TitleCasePipe,
		UnderlineComponent,
		NgClass,
	],
	templateUrl: './sidenav.component.html',
	styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
	navItems: navbarItem[] = [
		{
			icon: 'home',
			label: $localize`:@@home:Home`,
			route: '/home',
		},
		{
			icon: 'group',
			label: $localize`:@@groups:Groupes`,
			route: '/groups',
		},
		{
			icon: 'code',
			label: $localize`:@@codes:Codes`,
			route: '/' + codeRoutePath,
		},
		{
			icon: 'valve',
			label: $localize`:@@pipelines:pipelines`,
			route: `/${codeRoutePath}/${pipelineRoutePath}`,
		},
		{
			icon: 'person',
			label: $localize`:@@followers:Followers`,
			route: '/followers',
		},
		// {
		// 	icon: 'mail',
		// 	label: $localize`:@@messages:Messages`,
		// 	route: '/messages',
		// },
		// {
		// 	icon: 'star',
		// 	label: $localize`:@@favorites:Favoris`,
		// 	route: '/favorites',
		// },
	];
}
