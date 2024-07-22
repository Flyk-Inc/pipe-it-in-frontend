import {
	Component,
	OnInit,
	OnDestroy,
	EventEmitter,
	Output,
} from '@angular/core';
import {
	BehaviorSubject,
	concat,
	debounceTime,
	Observable,
	of,
	Subject,
	switchMap,
	tap,
	takeUntil,
} from 'rxjs';
import { TimelineCode, Version } from '../../../models/code.model';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CodeService } from '../../../service/code.service';
import { catchError } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
	selector: 'app-version-selector',
	standalone: true,
	imports: [AsyncPipe, NgSelectModule, FormsModule, ReactiveFormsModule],
	templateUrl: './version-selector.component.html',
})
export class VersionSelectorComponent implements OnInit, OnDestroy {
	@Output() versionSelected = new EventEmitter<Version | null>();
	protected $codes!: Observable<TimelineCode[]>;
	protected $codeVersions: BehaviorSubject<Version[]> = new BehaviorSubject<
		Version[]
	>([]);
	codesInput$ = new Subject<string>();
	codesLoading = false;
	selectedCode = new FormControl<TimelineCode | null>(null);
	selectedCodeVersion = new FormControl<Version | null>(null);

	private destroy$ = new Subject<void>();

	constructor(private codeService: CodeService) {}

	ngOnInit() {
		this.loadCodes();
		this.loadInitialCodes();
		this.setupCodeChange();
		this.setupOnVersionSelection();
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}

	loadCodes() {
		this.$codes = concat(
			of([]),
			this.codesInput$.pipe(
				debounceTime(300),
				tap(() => (this.codesLoading = true)),
				switchMap(searchQuery => {
					return this.codeService.getPublicCodes(searchQuery).pipe(
						catchError(() => of([])), // empty list on error
						tap(() => (this.codesLoading = false))
					);
				})
			)
		);
	}

	loadInitialCodes() {
		this.codesLoading = true;
		this.codeService
			.getPublicCodes('')
			.pipe(
				catchError(() => of([])), // empty list on error
				tap(() => (this.codesLoading = false))
			)
			.subscribe(initialCodes => {
				this.$codes = of(initialCodes);
			});
	}

	trackByFn(code: TimelineCode | Version) {
		return code.id;
	}

	setupCodeChange() {
		this.selectedCode.valueChanges
			.pipe(takeUntil(this.destroy$))
			.subscribe(code => {
				this.selectedCodeVersion.setValue(null);
				if (code) {
					this.$codeVersions.next(code.versions);
				}
			});
	}

	onCodeChange($event: TimelineCode) {
		this.selectedCodeVersion.setValue(null);
		if ($event) {
			this.$codeVersions.next($event.versions);
			this.selectedCodeVersion.setValue(null);
			this.selectedCodeVersion.reset();
			this.selectedCode.setValue($event);
		}
	}

	onVersionChange($event: Version) {
		this.selectedCodeVersion.setValue($event);
	}

	setupOnVersionSelection() {
		this.selectedCodeVersion.valueChanges
			.pipe(takeUntil(this.destroy$))
			.subscribe(version => {
				this.emitVersionSelected(version);
			});
	}

	emitVersionSelected(selectedVersion: Version | null) {
		this.versionSelected.emit(selectedVersion);
	}
}
