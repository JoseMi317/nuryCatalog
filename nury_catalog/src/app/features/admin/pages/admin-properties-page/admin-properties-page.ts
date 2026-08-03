import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MOCK_PROPERTIES } from '../../../../shared/data/mock-properties';

@Component({
  selector: 'app-admin-properties-page',
  imports: [RouterLink],
  templateUrl: './admin-properties-page.html'
})
export class AdminPropertiesPage {
  protected readonly properties = MOCK_PROPERTIES;
}
