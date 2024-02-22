<template>
  <Line :data=chartData :options=options />
</template>

<script lang=ts>
import { defineComponent } from 'vue';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default defineComponent({
  name: 'ChartPage',
  components: {
    Line
  },
	data() {
       const datas = [
		{
			id: 29,
			soundLevel: 0.15,
			isHeard: false,
			frequency: 500,
			earSide: "right",
			userId: 7
		},
		{
			id: 30,
			soundLevel: 0.2999999999999999,
			isHeard: false,
			frequency: 500,
			earSide: "right",
			userId: 7
		},
		{
			id: 31,
			soundLevel: 0.45,
			isHeard: false,
			frequency: 500,
			earSide: "right",
			userId: 7
		},
		{
			id: 32,
			soundLevel: 0.6,
			isHeard: false,
			frequency: 500,
			earSide: "right",
			userId: 7
		},
		{
			id: 33,
			soundLevel: 0.75,
			isHeard: false,
			frequency: 500,
			earSide: "right",
			userId: 7
		},
		{
			id: 34,
			soundLevel: 0.9,
			isHeard: true,
			frequency: 500,
			earSide: "right",
			userId: 7
		},
		{
			id: 35,
			soundLevel: 1.0,
			isHeard: false,
			frequency: 500,
			earSide: "right",
			userId: 7
		},
		{
			id: 29,
			soundLevel: 0.15,
			isHeard: false,
			frequency: 1000,
			earSide: "right",
			userId: 7
		},
		{
			id: 30,
			soundLevel: 0.2999999999999999,
			isHeard: false,
			frequency: 1000,
			earSide: "right",
			userId: 7
		},
		{
			id: 31,
			soundLevel: 0.45,
			isHeard: true,
			frequency: 1000,
			earSide: "right",
			userId: 7
		},
		{
			id: 32,
			soundLevel: 0.6,
			isHeard: false,
			frequency: 1000,
			earSide: "right",
			userId: 7
		},
		{
			id: 33,
			soundLevel: 0.75,
			isHeard: false,
			frequency: 1000,
			earSide: "right",
			userId: 7
		},
		{
			id: 34,
			soundLevel: 0.9,
			isHeard: false,
			frequency: 1000,
			earSide: "right",
			userId: 7
		},
		{
			id: 35,
			soundLevel: 1.0,
			isHeard: false,
			frequency: 1000,
			earSide: "right",
			userId: 7
		},
		{
			id: 29,
			soundLevel: 0.15,
			isHeard: false,
			frequency: 2000,
			earSide: "right",
			userId: 7
		},
		{
			id: 30,
			soundLevel: 0.2999999999999999,
			isHeard: false,
			frequency: 2000,
			earSide: "right",
			userId: 7
		},
		{
			id: 31,
			soundLevel: 0.45,
			isHeard: true,
			frequency: 2000,
			earSide: "right",
			userId: 7
		},
		{
			id: 32,
			soundLevel: 0.6,
			isHeard: false,
			frequency: 2000,
			earSide: "right",
			userId: 7
		},
		{
			id: 33,
			soundLevel: 0.75,
			isHeard: false,
			frequency: 2000,
			earSide: "right",
			userId: 7
		},
		{
			id: 34,
			soundLevel: 0.9,
			isHeard: false,
			frequency: 2000,
			earSide: "right",
			userId: 7
		},
		{
			id: 35,
			soundLevel: 1.0,
			isHeard: false,
			frequency: 2000,
			earSide: "right",
			userId: 7
		},
		{
			id: 29,
			soundLevel: 0.15,
			isHeard: false,
			frequency: 4000,
			earSide: "right",
			userId: 7
		},
		{
			id: 30,
			soundLevel: 0.2999999999999999,
			isHeard: false,
			frequency: 4000,
			earSide: "right",
			userId: 7
		},
		{
			id: 31,
			soundLevel: 0.45,
			isHeard: false,
			frequency: 4000,
			earSide: "right",
			userId: 7
		},
		{
			id: 32,
			soundLevel: 0.6,
			isHeard: false,
			frequency: 4000,
			earSide: "right",
			userId: 7
		},
		{
			id: 33,
			soundLevel: 0.75,
			isHeard: true,
			frequency: 4000,
			earSide: "right",
			userId: 7
		},
		{
			id: 34,
			soundLevel: 0.9,
			isHeard: false,
			frequency: 4000,
			earSide: "right",
			userId: 7
		},
		{
			id: 35,
			soundLevel: 1.0,
			isHeard: false,
			frequency: 4000,
			earSide: "right",
			userId: 7
		},
		{
			id: 29,
			soundLevel: 0.15,
			isHeard: false,
			frequency: 500,
			earSide: "left",
			userId: 7
		},
		{
			id: 30,
			soundLevel: 0.2999999999999999,
			isHeard: false,
			frequency: 500,
			earSide: "left",
			userId: 7
		},
		{
			id: 31,
			soundLevel: 0.45,
			isHeard: false,
			frequency: 500,
			earSide: "left",
			userId: 7
		},
		{
			id: 32,
			soundLevel: 0.6,
			isHeard: false,
			frequency: 500,
			earSide: "left",
			userId: 7
		},
		{
			id: 33,
			soundLevel: 0.75,
			isHeard: false,
			frequency: 500,
			earSide: "left",
			userId: 7
		},
		{
			id: 34,
			soundLevel: 0.9,
			isHeard: false,
			frequency: 500,
			earSide: "left",
			userId: 7
		},
		{
			id: 35,
			soundLevel: 1.0,
			isHeard: true,
			frequency: 500,
			earSide: "left",
			userId: 7
		},
		{
			id: 29,
			soundLevel: 0.15,
			isHeard: false,
			frequency: 1000,
			earSide: "left",
			userId: 7
		},
		{
			id: 30,
			soundLevel: 0.2999999999999999,
			isHeard: false,
			frequency: 1000,
			earSide: "left",
			userId: 7
		},
		{
			id: 31,
			soundLevel: 0.45,
			isHeard: false,
			frequency: 1000,
			earSide: "left",
			userId: 7
		},
		{
			id: 32,
			soundLevel: 0.6,
			isHeard: true,
			frequency: 1000,
			earSide: "left",
			userId: 7
		},
		{
			id: 33,
			soundLevel: 0.75,
			isHeard: false,
			frequency: 1000,
			earSide: "left",
			userId: 7
		},
		{
			id: 34,
			soundLevel: 0.9,
			isHeard: false,
			frequency: 1000,
			earSide: "left",
			userId: 7
		},
		{
			id: 35,
			soundLevel: 1.0,
			isHeard: false,
			frequency: 1000,
			earSide: "left",
			userId: 7
		},
		{
			id: 29,
			soundLevel: 0.15,
			isHeard: false,
			frequency: 2000,
			earSide: "left",
			userId: 7
		},
		{
			id: 30,
			soundLevel: 0.2999999999999999,
			isHeard: false,
			frequency: 2000,
			earSide: "left",
			userId: 7
		},
		{
			id: 31,
			soundLevel: 0.45,
			isHeard: true,
			frequency: 2000,
			earSide: "left",
			userId: 7
		},
		{
			id: 32,
			soundLevel: 0.6,
			isHeard: false,
			frequency: 2000,
			earSide: "left",
			userId: 7
		},
		{
			id: 33,
			soundLevel: 0.75,
			isHeard: false,
			frequency: 2000,
			earSide: "left",
			userId: 7
		},
		{
			id: 34,
			soundLevel: 0.9,
			isHeard: false,
			frequency: 2000,
			earSide: "left",
			userId: 7
		},
		{
			id: 35,
			soundLevel: 1.0,
			isHeard: false,
			frequency: 2000,
			earSide: "left",
			userId: 7
		},
		{
			id: 29,
			soundLevel: 0.15,
			isHeard: false,
			frequency: 4000,
			earSide: "left",
			userId: 7
		},
		{
			id: 30,
			soundLevel: 0.2999999999999999,
			isHeard: false,
			frequency: 4000,
			earSide: "left",
			userId: 7
		},
		{
			id: 31,
			soundLevel: 0.45,
			isHeard: false,
			frequency: 4000,
			earSide: "left",
			userId: 7
		},
		{
			id: 32,
			soundLevel: 0.6,
			isHeard: true,
			frequency: 4000,
			earSide: "left",
			userId: 7
		},
		{
			id: 33,
			soundLevel: 0.75,
			isHeard: false,
			frequency: 4000,
			earSide: "left",
			userId: 7
		},
		{
			id: 34,
			soundLevel: 0.9,
			isHeard: false,
			frequency: 4000,
			earSide: "left",
			userId: 7
		},
		{
			id: 35,
			soundLevel: 1.0,
			isHeard: false,
			frequency: 4000,
			earSide: "left",
			userId: 7
		},

      ]
		const heardLeft = datas.filter((item:any) => item.isHeard && item.earSide === 'left');
       const heardRight = datas.filter((item:any) => item.isHeard && item.earSide === 'right');
    return {

		chartData: {
		labels: heardLeft?.map((item:any) => item.frequency), // X-axis labels based on frequency
         datasets: [
           {
             label: 'Left Ear',
             data: heardLeft?.map((item:any) => item.soundLevel),
             borderColor: 'rgba(75, 192, 192, 1)',
             borderWidth: 2,
             pointRadius: 5,
             pointBackgroundColor: 'rgba(75, 192, 192, 1)',
           },
           {
             label: 'Right Ear',
             data: heardRight?.map((item:any) => item.soundLevel),
             borderColor: 'rgba(255, 99, 132, 1)',
             borderWidth: 2,
             pointRadius: 5,
             pointBackgroundColor: 'rgba(255, 99, 132, 1)',
           },
         ],
	},
    }
  },
  methods: {
  async abc() {
       // Filter the data for isHeard true and separate by earSide
    //    const heardLeft = this.datas.filter((item:any) => item.isHeard && item.earSide === 'left');
    //    const heardRight = this.datas.filter((item:any) => item.isHeard && item.earSide === 'right');
    //   console.log({heardLeft});
    //    const chartData = {
    //     labels: heardLeft?.map((item:any) => item.frequency), // X-axis labels based on frequency
    //      datasets: [
    //        {
    //          labels: 'Left Ear',
    //          data: heardLeft?.map((item:any) => item.soundLevel),
    //          borderColor: 'rgba(75, 192, 192, 1)',
    //          borderWidth: 2,
    //          pointRadius: 5,
    //          pointBackgroundColor: 'rgba(75, 192, 192, 1)',
    //        },
    //        {
    //          labels: 'Right Ear',
    //          data: heardRight?.map((item:any) => item.soundLevel),
    //          borderColor: 'rgba(255, 99, 132, 1)',
    //          borderWidth: 2,
    //          pointRadius: 5,
    //          pointBackgroundColor: 'rgba(255, 99, 132, 1)',
    //        },
    //      ],
    //    };
     }
  },
  onMount() {
    this.abc();
  }
  
});
</script>

