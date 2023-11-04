<template>
	<div class="flex flex-col justify-between min-h-screen">
		<NavBar :user="user"> </NavBar>
		<SliderBar></SliderBar>
		<main class="container m-auto">
			<div v-if="!user">
				<section>
					<div>
						<h2><strong>About Us</strong></h2>
					</div>
					<div>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni
						saepe, dicta numquam, sint eum, magnam expedita libero consectetur
						ea perferendis consequatur eveniet porro quo nemo totam voluptas.
						Eaque, dolorem deserunt. Lorem ipsum dolor sit amet consectetur
						adipisicing elit. Eveniet dolor reiciendis quidem amet cum,
						similique cumque mollitia quo, quasi fugit excepturi hic rem atque
						magni ut unde accusamus suscipit repellat! Lorem ipsum dolor sit
						amet consectetur, adipisicing elit. Magni saepe, dicta numquam, sint
						eum, magnam expedita libero consectetur ea perferendis consequatur
						eveniet porro quo nemo totam voluptas. Eaque, dolorem deserunt.
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
						dolor reiciendis quidem amet cum, similique cumque mollitia quo,
						quasi fugit excepturi hic rem atque magni ut unde accusamus suscipit
						repellat! Lorem ipsum dolor sit amet consectetur, adipisicing elit.
						Magni saepe, dicta numquam, sint eum, magnam expedita libero
						consectetur ea perferendis consequatur eveniet porro quo nemo totam
						voluptas. Eaque, dolorem deserunt. Lorem ipsum dolor sit amet
						consectetur adipisicing elit. Eveniet dolor reiciendis quidem amet
						cum, similique cumque mollitia quo, quasi fugit excepturi hic rem
						atque magni ut unde accusamus suscipit repellat! Lorem ipsum dolor
						sit amet consectetur, adipisicing elit. Magni saepe, dicta numquam,
						sint eum, magnam expedita libero consectetur ea perferendis
						consequatur eveniet porro quo nemo totam voluptas. Eaque, dolorem
						deserunt. Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Eveniet dolor reiciendis quidem amet cum, similique cumque mollitia
						quo, quasi fugit excepturi hic rem atque magni ut unde accusamus
						suscipit repellat!
					</div>
				</section>
				<section class="mt-4 mb-4">
					<div>
						<h2><strong>Testomonial</strong></h2>
					</div>

					<div class="relative">
						<div class="" v-for="(testo, index) in testos" :key="index">
							<div class="testmySlides">
								<div class="flex max-sm:flex-col">
									<div class="flex flex-col items-center sm:ml-10">
										<div class="text-center">
											<svg
												class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
												focusable="false"
												aria-hidden="true"
												viewBox="0 0 24 24"
												data-testid="FormatQuoteOutlinedIcon"
												style="color: #0279b1; height: 1rem"
											></svg>
											{{ `${testo.message}` }}
											<svg
												class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
												focusable="false"
												aria-hidden="true"
												viewBox="0 0 24 24"
												data-testid="FormatQuoteOutlinedIcon"
												style="color: #0279b1; height: 1rem"
											></svg>
										</div>
										<div class="flex items-center">
											<div class="mr-3">
												<img
													alt="Sunim Mainali"
													:src="`${testo.image}`"
													width="100"
													height="100"
													decoding="async"
													data-nimg="1"
													loading="lazy"
													style="
														color: transparent;
														height: 2.5rem;
														width: 2.5rem;
														border-radius: 50%;
													"
												/>
											</div>
											<div class="flex flex-col items-center">
												<div class="text-lg">{{ testo.name }}</div>
												<div class="text-sm text-gray-400">
													{{ testo.position }} || {{ testo.company }}
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<a class="prev hover:text-white" @click="testplusSlides(-1)">❮</a>
						<a class="next hover:text-white" @click="testplusSlides(1)">❯</a>
					</div>
					<div class="c-row flex items-center justify-center">
						<div v-for="(item, index) in testos" :key="index">
							<input
								type="radio"
								@click="testcurrentSlide(index + 1)"
								class="testdemo cursor m-1"
								name="radio1"
							/>
						</div>
					</div>
				</section>
			</div>
			<div v-if="user">this is user bibahs</div>
		</main>

		<Footer></Footer>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import NavBar from "../components/NavBar.vue";
import SliderBar from "../components/SliderBar.vue";
import Footer from "../components/footer.vue";

export default defineComponent({
	name: "HomePage",
	props: ["user"],
	components: {
		NavBar,
		SliderBar,
		Footer,
	},

	data() {
		return {
			testos: [
				{
					id: 1,
					name: "abc",
					image: "//",
					message:
						"Pace Code has helped in providing a proper solutions for our CRM, Now our customer database are secure than ever and analysis are an ease. Thank you for your upfront support. Cheers to the team for their dedicated work.",
					position: "MD",
					company: "abc",
				},
				{
					id: 2,
					name: "abc",
					image: "//",
					message:
						"Pace Code has helped in providing a proper solutions for our CRM, Now our customer database are secure than ever and analysis are an ease. Thank you for your upfront support. Cheers to the team for their dedicated work.",
					position: "MD",
					company: "abc",
				},
				{
					id: 3,
					name: "abc",
					image: "//",
					message:
						"Pace Code has helped in providing a proper solutions for our CRM, Now our customer database are secure than ever and analysis are an ease. Thank you for your upfront support. Cheers to the team for their dedicated work.",
					position: "MD",
					company: "abc",
				},
				{
					id: 4,
					name: "abc",
					image: "//",
					message:
						"Pace Code has helped in providing a proper solutions for our CRM, Now our customer database are secure than ever and analysis are an ease. Thank you for your upfront support. Cheers to the team for their dedicated work.",
					position: "MD",
					company: "abc",
				},
			],
		};
	},
	methods: {
		testshowSlides: function (n: any) {
			let i;
			let slides = this.$el.querySelectorAll(".testmySlides");
			let dots = this.$el.querySelectorAll(".testdemo");
			let captionText = this.$el.querySelector("#caption");

			console.log("slides", slides.length);
			if (n > slides.length) {
				slideIndex = 1;
			}
			if (n < 1) {
				slideIndex = slides.length;
			}
			for (i = 0; i < slides.length; i++) {
				slides[i].style.display = "none";
			}
			for (i = 0; i < dots.length; i++) {
				dots[i].className = dots[i].className.replace(" testactive", "");
				dots[i].checked = false;
			}
			console.log();
			slides[slideIndex - 1].style.display = "block";
			console.log(slides[slideIndex - 1].style.display);
			dots[slideIndex - 1].className += " testactive";
			dots[slideIndex - 1].checked = true;
			captionText.innerHTML = dots[slideIndex - 1].alt;
		},
		testplusSlides: function (n: any) {
			this.testshowSlides((slideIndex += n));
		},

		testcurrentSlide: function (n: any) {
			this.testshowSlides((slideIndex = n));
		},
	},
	mounted() {
		this.testshowSlides(slideIndex);
	},
});

let slideIndex = 1;
</script>

<style>
.c-container {
	position: relative;
}

/* Hide the images by default */
.testmySlides {
	display: none;
}

/* Add a pointer when hovering over the thumbnail images */
.cursor {
	cursor: pointer;
}

/* Next & previous buttons */
.prev,
.next {
	cursor: pointer;
	position: absolute;
	top: 50%;
	width: auto;
	padding: 16px;
	margin-top: -50px;

	font-weight: bold;
	font-size: 20px;
	border-radius: 0 3px 3px 0;
	user-select: none;
	-webkit-user-select: none;
}

/* Position the "next button" to the right */
.next {
	right: 0;
	border-radius: 3px 0 0 3px;
}

/* On hover, add a black background color with a little bit see-through */
.prev:hover,
.next:hover {
	background-color: rgba(0, 0, 0, 0.8);
}

/* Number text (1/3 etc) */
.numbertext {
	color: #f2f2f2;
	font-size: 12px;
	padding: 8px 12px;
	position: absolute;
	top: 0;
}

/* Container for image text */
.caption-container {
	text-align: center;
	background-color: #222;
	padding: 2px 16px;
	color: white;
}

.c-row:after {
	content: "";
	display: table;
	clear: both;
}

/* Six columns side by side */
.c-column {
	float: left;
	width: 16.66%;
}

/* Add a transparency effect for thumnbail images */
.testdemo {
	opacity: 0.6;
}

.testactive,
.testdemo:hover {
	opacity: 1;
}
</style>
