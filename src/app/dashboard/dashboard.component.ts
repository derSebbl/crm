import { Component, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import Chart from 'chart.js/auto';
import { User } from '../../models/user.class';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  chart1: any;
  customers = [1, 56, 334, 34, 15, 23, 45, 67, 78, 89, 90, 100];
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  user: User = {
    street: '',
    zipCode: 0,
    city: '',
    firstName: '',
    lastName: '',
    email: '',
    pet: '',
    petInfo: false,
    toJSON: function (): { firstName: string; lastName: string; email: string; street: string; zipCode: number; city: string; pet: string; petInfo: boolean; } {
      throw new Error('Function not implemented.');
    }
  };
  
  chart2: any;



  constructor() {

   }

  firestore: Firestore = inject(Firestore);


  ngOnInit() {
    
    this.chart1 = new Chart('chart1', {
      type: 'line', 
      data: {
        labels: this.months,
        datasets: [{
          label: 'Customers',
          data: this.customers,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
          },
        },
        interaction: {
          intersect: false,
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Customers'
            },
          }
        }
      },
    });

    this.chart2 = new Chart('chart2', {
      type: 'pie',
      data: {
        labels: ['Dog', 'Cat'],
        datasets: [
          {
            label: '# of Votes',
            data: [2, 3],
            borderWidth: 1,
          },
        ],
      },
    });
  }

}
