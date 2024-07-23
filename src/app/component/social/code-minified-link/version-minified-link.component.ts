import { Component, Input } from '@angular/core';
import { Version } from '../../../models/code.model';
import { codeRoutePath, CodeRoutes } from '../../../pages/codes/routes';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../typography/icon/icon.component';
import { UnderlineComponent } from '../../layout/underline/underline.component';

@Component({
	selector: 'app-version-minified-link',
	standalone: true,
	imports: [RouterLink, IconComponent, UnderlineComponent],
	templateUrl: './version-minified-link.component.html',
})
export class VersionMinifiedLinkComponent {
	@Input() version!: Version;
	protected readonly codeRoutePath = codeRoutePath;
	protected readonly CodeRoutes = CodeRoutes;
}
