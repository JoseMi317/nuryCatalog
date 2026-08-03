import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MOCK_PROPERTIES } from '../../../../shared/data/mock-properties';

@Component({
  selector: 'app-admin-dashboard-page',
  imports: [RouterLink],
  templateUrl: './admin-dashboard-page.html'
})
export class AdminDashboardPage {
  protected readonly total = MOCK_PROPERTIES.length;
  protected readonly available = MOCK_PROPERTIES.filter((property) => property.status === 'Disponible').length;
  protected readonly reserved = MOCK_PROPERTIES.filter((property) => property.status === 'Reservado').length;
}
