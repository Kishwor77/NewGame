<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<template>
  <Line :data=chartData  />
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
//   props: ["id"],
  components: {
    Line
	},
	props: {
		label: {
		type: Array
		},
		left: {
		type: Array
		},
		right: {
		type: Array
		},
  },


  
	data() {
		console.log(this.label, "label");

    return {
		chartData: {
		labels: this.label, // X-axis labels based on frequency
         datasets: [
           {
             label: 'Left Ear',
             data: this.left,
             borderColor: 'rgba(75, 192, 192, 1)',
             borderWidth: 2,
             pointRadius: 5,
             pointBackgroundColor: 'rgba(75, 192, 192, 1)',
           },
           {
             label: 'Right Ear',
             data: this.right,
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
	// async abc() {
	// 	console.log(this.component)
	// 	const results = await soundTesting(parseInt(this.component));
	// 	console.log("bibash2",results?.data?.data)
	// 	datas = results?.data?.data
	// 	// console.log({ results })
	// 	// // const datas = await results.json()
	// 	// console.log({datas})
    //    // Filter the data for isHeard true and separate by earSide
    // //    const heardLeft = this.datas.filter((item:any) => item.isHeard && item.earSide === 'left');
    // //    const heardRight = this.datas.filter((item:any) => item.isHeard && item.earSide === 'right');
    // //   console.log({heardLeft});
    // //    const chartData = {
    // //     labels: heardLeft?.map((item:any) => item.frequency), // X-axis labels based on frequency
    // //      datasets: [
    // //        {
    // //          labels: 'Left Ear',
    // //          data: heardLeft?.map((item:any) => item.soundLevel),
    // //          borderColor: 'rgba(75, 192, 192, 1)',
    // //          borderWidth: 2,
    // //          pointRadius: 5,
    // //          pointBackgroundColor: 'rgba(75, 192, 192, 1)',
    // //        },
    // //        {
    // //          labels: 'Right Ear',
    // //          data: heardRight?.map((item:any) => item.soundLevel),
    // //          borderColor: 'rgba(255, 99, 132, 1)',
    // //          borderWidth: 2,
    // //          pointRadius: 5,
    // //          pointBackgroundColor: 'rgba(255, 99, 132, 1)',
    // //        },
    // //      ],
    // //    };
    //  }
	},
	async created() {
	// 		console.log("newTEST",window.location.pathname.split("/")[3]?window.location.pathname.split("/")[3] :window.location.pathname.split("/")[2])
	// 	const id  = window.location.pathname.split("/")[3]?window.location.pathname.split("/")[3] :window.location.pathname.split("/")[2];
	// // console.log(id);
	// 	// this.abc();
	// 	// let datas:any[];
	// 	const results = await soundTesting(parseInt(id));
	// 		console.log("bibash2",results?.data?.data)
	// 		datas= results?.data?.data
       
	// 	const heardLeft = datas?.filter((item:any) => item.isHeard && item.earSide === 'left');
	// 	const heardRight = datas?.filter((item:any) => item.isHeard && item.earSide === 'right');
	// 	console.log("bibash2", { heardLeft });
		
	// 	this.chartData.labels = heardLeft?.map((item: any) => item.frequency) as any;
	// 	this.chartData.datasets[0].data = heardLeft?.map((item: any) => item.soundLevel)  as any;
	// 	this.chartData.datasets[1].data = heardRight?.map((item: any) => item.soundLevel) as any;
	// 	console.log("bibash2",this.chartData.labels, this.chartData.datasets[0].data);


	}
  
// 	async beforeCreate() {
// 	console.log("newTEST",window.location.pathname.split("/")[3]?window.location.pathname.split("/")[3] :window.location.pathname.split("/")[2])
// 	this.component = window.location.pathname.split("/")[3]?window.location.pathname.split("/")[3] :window.location.pathname.split("/")[2];
// 	// console.log(id);
// 		// this.abc();
// 	const results = await soundTesting(parseInt(this.component));
// 		console.log("bibash2",results?.data?.data)
// 		datas = results?.data?.data
//   }
  
});
</script>

