import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgForOf } from '@angular/common';
import { CodeTimelineItemComponent } from './code-timeline-item/code-timeline-item.component';
import { Observable } from 'rxjs';
import { TimelineCode } from '../../../models/code.model';
import { Store } from '@ngrx/store';
import { selectAllPersonalCodes } from '../../../store/code/code.selectors';
import {
	loadAllTimelineCodes,
	loadPersonalCodes,
} from '../../../store/code/code.actions';
import { ButtonComponent } from '../../../component/layout/button/button.component';
import { IconComponent } from '../../../component/typography/icon/icon.component';
import { UnderlineComponent } from '../../../component/layout/underline/underline.component';
import { RouterLink } from '@angular/router';
import { codeRoutePath, CodeRoutes } from '../routes';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

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
		ReactiveFormsModule,
	],
	templateUrl: './personal-codes-list.component.html',
})
export class PersonalCodesListComponent implements OnInit {
	codes$!: Observable<TimelineCode[]>;
	constructor(private store: Store) {}

	personalCodesOnly = new FormControl(true);

	yourCodesOnly = $localize`:@@code.yours-only:Your Codes Only`;

	ngOnInit() {
		this.store.dispatch(loadPersonalCodes());
		this.codes$ = this.store.select(selectAllPersonalCodes);
		this.personalCodesOnly.valueChanges.subscribe(() => {
			this.selectPostForTimeline();
		});
	}

	selectPostForTimeline() {
		if (this.personalCodesOnly.value) {
			this.store.dispatch(loadPersonalCodes());
		} else {
			this.store.dispatch(loadAllTimelineCodes());
		}
	}

	protected readonly codeRoutePath = codeRoutePath;
	protected readonly CodeRoutes = CodeRoutes;
}
