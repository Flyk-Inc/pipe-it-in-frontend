import { Component, OnInit } from '@angular/core';
import { SocialService } from '../../../service/social.service';
import { Group } from '../../../models/group.model';
import { NgFor, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-popular-groups',
	standalone: true,
	imports: [NgFor, NgOptimizedImage, RouterLink],
	templateUrl: './popular-groups.component.html',
	styleUrl: './popular-groups.component.scss',
})
export class PopularGroupsComponent implements OnInit {
	publicGroups: Group[] = [];

	constructor(private socialService: SocialService) {}

	ngOnInit(): void {
		this.loadPopularGroups();
	}

	loadPopularGroups(): void {
		this.socialService.getPopularGroups().subscribe(groups => {
			console.log(groups);
			this.publicGroups = groups;
		});
	}
}
