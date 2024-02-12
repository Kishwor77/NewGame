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
    return {
       datas: [
		{
			id: 1,
			soundLevel: 1.7,
			isHeard: false,
			frequency: 500,
			earSide: "left",
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
			soundLevel: 1.05,
			isHeard: false,
			frequency: 500,
			earSide: "left",
			userId: 7
		},
		{
			id: 36,
			soundLevel: 1.2,
			isHeard: false,
			frequency: 500,
			earSide: "left",
			userId: 7
		},
		{
			id: 37,
			soundLevel: 1.35,
			isHeard: false,
			frequency: 500,
			earSide: "left",
			userId: 7
		},
		{
			id: 38,
			soundLevel: 1.5,
			isHeard: true,
			frequency: 500,
			earSide: "left",
			userId: 7
		},
		{
			id: 39,
			soundLevel: 1.5,
			isHeard: true,
			frequency: 500,
			earSide: "left",
			userId: 7
		},
		{
			id: 40,
			soundLevel: 1.5,
			isHeard: false,
			frequency: 1000,
			earSide: "left",
			userId: 7
		},

      ],
      chartData: {},
    }
  },
  methods: {
  async abc() {
       // Filter the data for isHeard true and separate by earSide
       const heardLeft = this.datas.filter((item:any) => item.isHeard && item.earSide === 'left');
       const heardRight = this.datas.filter((item:any) => item.isHeard && item.earSide === 'right');
      console.log({heardLeft});
      //  const chartData = {
      //    labels: heardLeft?.map((item:any) => item.frequency), // X-axis labels based on frequency
      //    datasets: [
      //      {
      //        label: 'Left Ear',
      //        data: heardLeft?.map((item:any) => item.soundLevel),
      //        borderColor: 'rgba(75, 192, 192, 1)',
      //        borderWidth: 2,
      //        pointRadius: 5,
      //        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
      //      },
      //      {
      //        label: 'Right Ear',
      //        data: heardRight?.map((item:any) => item.soundLevel),
      //        borderColor: 'rgba(255, 99, 132, 1)',
      //        borderWidth: 2,
      //        pointRadius: 5,
      //        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
      //      },
      //    ],
      //  };
       this.chartData = {}
     }
  },
  onMount() {
    this.abc();
  }
  
});
</script>

