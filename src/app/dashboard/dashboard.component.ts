import { Component } from '@angular/core';
import Chart from 'chart.js/auto';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  chart1: any;
  customers = [1, 56, 334, 34, 15, 23, 45, 67, 78, 89, 90, 100];
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  
  chart2: any;

  constructor() { }

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
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

}
