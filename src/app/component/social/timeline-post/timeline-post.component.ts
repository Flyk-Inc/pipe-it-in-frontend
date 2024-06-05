import { Component, Input } from '@angular/core';
import { TimelinePost } from '../../../models/post.model';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../typography/icon/icon.component';

@Component({
	selector: 'app-timeline-post',
	standalone: true,
	imports: [NgOptimizedImage, RouterLink, IconComponent],
	templateUrl: './timeline-post.component.html',
	styleUrl: './timeline-post.component.scss',
})
export class TimelinePostComponent {
	@Input() post!: TimelinePost;
}
