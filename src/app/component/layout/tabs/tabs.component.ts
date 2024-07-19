import { Component, Input, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

export interface TabData {
	title: string;
	id: string;
	link?: string;
}

@Component({
	selector: 'app-tabs',
	standalone: true,
	imports: [NgClass, RouterLink],
	templateUrl: './tabs.component.html',
	styleUrl: './tabs.component.scss',
})
export class TabsComponent implements OnInit {
	constructor(private router: Router) {}

	@Input() tabs!: TabData[];
	activeTabId: string = '';

	ngOnInit() {
		this.updateActiveTab();
		this.trackRouteChange();
	}

	trackRouteChange() {
		this.router.events.subscribe(() => {
			this.updateActiveTab();
		});
	}

	updateActiveTab() {
		const currentRoute = this.router.url;
		if (!currentRoute) return;
		const activeTab = this.tabs.find(tab => {
			return currentRoute.includes(tab.link ?? '');
		});
		if (activeTab) this.activeTabId = activeTab.id;
	}
}
