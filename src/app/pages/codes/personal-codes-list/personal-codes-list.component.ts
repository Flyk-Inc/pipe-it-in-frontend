import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgForOf } from '@angular/common';
import { CodeTimelineItemComponent } from './code-timeline-item/code-timeline-item.component';
import { Observable } from 'rxjs';
import { TimelineCode } from '../../../models/code.model';
import { Store } from '@ngrx/store';
import { selectAllPersonalCodes } from '../../../store/code/code.selectors';
import { loadPersonalCodes } from '../../../store/code/code.actions';
import { ButtonComponent } from '../../../component/layout/button/button.component';
import { IconComponent } from '../../../component/typography/icon/icon.component';
import { UnderlineComponent } from '../../../component/layout/underline/underline.component';
import { RouterLink } from '@angular/router';
import { codeRoutePath, CodeRoutes } from '../routes';

@Component({
	selector: 'app-personal-codes-list',
	standalone: true,
	imports: [
		AsyncPipe,
		CodeTimelineItemComponent,
		NgForOf,
		ButtonComponent,
		IconComponent,
		UnderlineComponent,
		RouterLink,
	],
	templateUrl: './personal-codes-list.component.html',
	styleUrl: './personal-codes-list.component.scss',
})
export class PersonalCodesListComponent implements OnInit {
	codes$!: Observable<TimelineCode[]>;
	constructor(private store: Store) {}

	ngOnInit() {
		this.store.dispatch(loadPersonalCodes());
		this.codes$ = this.store.select(selectAllPersonalCodes);
	}

  protected readonly codeRoutePath = codeRoutePath;
  protected readonly CodeRoutes = CodeRoutes;
}
