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

@Component({
	selector: 'app-codes-timeline',
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
	templateUrl: './codes-timeline.component.html',
	styleUrl: './codes-timeline.component.scss',
})
export class CodesTimelineComponent implements OnInit {
	codes$!: Observable<TimelineCode[]>;
	createCodeTranslated: string = 'loal';
	constructor(private store: Store) {}

	ngOnInit() {
		this.store.dispatch(loadPersonalCodes());
		this.codes$ = this.store.select(selectAllPersonalCodes);
		// this.createCodeTranslated= $localize `code.create-new`;
	}
}
