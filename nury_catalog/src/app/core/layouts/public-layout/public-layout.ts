import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { buildGeneralContactMessage, buildWhatsappUrl } from '../../../shared/utils/contact-links';

@Component({
  selector: 'app-public-layout',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './public-layout.html',
})
export class PublicLayout {
  protected readonly generalContactHref = buildWhatsappUrl(buildGeneralContactMessage());
}
