import { Component, inject } from '@angular/core';
import { Firestore, collection, collectionData, getDocs } from '@angular/fire/firestore';
import Chart from 'chart.js/auto';
import { User } from '../../models/user.class';
import { Router } from '@angular/router';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  chart1: any;
  chart2: any;
  chart3: any;
 
  dogCount = 0;
  catCount = 0;
  petInCare = 0;

  user: User = {
    street: '',
    zipCode: 0,
    city: '',
    firstName: '',
    lastName: '',
    email: '',
    pet: '',
    petName: '',
    petAllergens: '',
    petInfo: false,
    bills: 0,
    toJSON: function (): { firstName: string; lastName: string; email: string; street: string; zipCode: number; city: string; pet: string; petInfo: boolean; bills: number; petName: string; petAllergens: string;} {
      throw new Error('Function not implemented.');
    }
  };
  
  ngOnInit() {
    this.countPetsInCare();
    this.createChartBills();
    this.countPets();
  }

  constructor(private router: Router) {
   }
   firestore: Firestore = inject(Firestore);


 

   countPets() {
    const acollection = collection(this.firestore, 'users');
    collectionData(acollection).subscribe((users: any[]) => {
      users.forEach(user => {
        if (user.pet == 'Dog') {
          this.dogCount++;
        }
        if (user.pet == 'Cat') {
          this.catCount++;
        }
      });
      this.createChartPets(); 
    });
  }

  countPetsInCare() {
    const acollection = collection(this.firestore, 'users');
    collectionData(acollection).subscribe((users: any[]) => {
      users.forEach(user => {
        if (user.petInfo === true) {
          this.petInCare++;
        }
      }
    );
  });
}

createChartPets() {
  const chartElement = document.getElementById('chart2');
  if (chartElement) {
  this.chart2 = new Chart('chart2', {
    type: 'pie',
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Customer pets'
        }
      }
    },
    data: {
      labels: ['Dogs', 'Cats'],
      datasets: [
        {
          label: 'list of customer animals',
          data: [this.dogCount, this.catCount],
          borderWidth: 1,
        },
      ],
    },
  });
}
}

  async getSalesVolumeData() {
    const salesVolumeRef = collection(this.firestore, 'salesVolume');
    const salesVolumeSnapshot = await getDocs(salesVolumeRef);
    const salesVolumeObj: { [key: string]: number } = salesVolumeSnapshot.docs.reduce((acc, doc) => {
      const date = new Date(doc.id).toLocaleDateString();
      const amount = doc.data()['amount'];
      acc[date] = (acc[date] || 0) + amount;
      return acc;
    }, {} as { [key: string]: number });

    const salesVolumeData = Object.entries(salesVolumeObj)
      .map(([date, amount]) => ({ date, amount }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return salesVolumeData;
  }

  async createChartBills() {
    const salesVolumeData = await this.getSalesVolumeData();
    const labels = salesVolumeData.map((data: { date: any; }) => data.date);
    const data = salesVolumeData.map((data: { amount: any; }) => data.amount);

    this.chart1 = new Chart('chart1', {
      type: 'line', 
      data: {
        labels: labels,
        datasets: [{
          label: 'Sales Volume',
          data: data,
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
              text: 'Sales Volume'
            },
          }
        }
      },
    });
  }

  toPets() {
   this.router.navigate(['/pets']); 
  }
}
