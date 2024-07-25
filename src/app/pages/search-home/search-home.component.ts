import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../service/users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-search-home',
	standalone: true,
	imports: [],
	templateUrl: './search-home.component.html',
	styleUrl: './search-home.component.scss',
})
export class SearchHomeComponent implements OnInit {
	constructor(
		private userService: UsersService,
		private activatedRoute: ActivatedRoute
	) {}

	ngOnInit() {
		const query = this.activatedRoute.snapshot.queryParams['query'] ?? '';
		this.userService.searchForUsers(query).subscribe(res => {
			console.log(res);
		});
	}
}
