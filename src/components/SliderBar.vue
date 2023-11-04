<template>
	<div class="container m-auto c-container">
		<div v-for="(item, index) in images" :key="index">
			<div class="mySlides">
				<div class="numbertext">
					{{ `${index + 1}` }}/ {{ `${images.length}` }}
				</div>
				<img :src="`${item.img}`" style="width: 100%" />
			</div>
		</div>

		<a class="prev" @click="plusSlides(-1)">❮</a>
		<a class="next" @click="plusSlides(1)">❯</a>

		<div class="caption-container">
			<p id="caption"></p>
		</div>

		<div class="c-row flex items-center justify-center">
			<div v-for="(item, index) in images" :key="index">
				<input
					type="radio"
					@click="currentSlide(index + 1)"
					class="demo cursor m-1"
					name="radio"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "SliderBar",

	methods: {
		showSlides: function (n: any) {
			let i;
			let slides = this.$el.querySelectorAll(".mySlides");
			let dots = this.$el.querySelectorAll(".demo");
			let captionText = this.$el.querySelector("#caption");

			console.log("slides", slides.length);
			if (n > slides.length) {
				console.log("checkedon");
				slideIndex = 1;
			}
			if (n < 1) {
				console.log("checkedogg");
				slideIndex = slides.length;
			}
			for (i = 0; i < slides.length; i++) {
				slides[i].style.display = "none";
			}
			for (i = 0; i < dots.length; i++) {
				dots[i].className = dots[i].className.replace(" active", "");
				dots[i].checked = false;
			}
			slides[slideIndex - 1].style.display = "block";
			dots[slideIndex - 1].className += " active";
			dots[slideIndex - 1].checked = true;
			captionText.innerHTML = dots[slideIndex - 1].alt;
		},
		plusSlides: function (n: any) {
			this.showSlides((slideIndex += n));
		},

		currentSlide: function (n: any) {
			this.showSlides((slideIndex = n));
		},
	},
	mounted() {
		this.showSlides(slideIndex);
	},
	data() {
		return {
			images: [
				{
					img: "images/mountain001.jpeg",
					caption: "himalayan123",
				},
				{
					img: "images/mountain002.jpeg",
					caption: "himalayan123",
				},
				{
					img: "images/mountain003.webp",
					caption: "himalayan123",
				},
				{
					img: "images/mountain001.jpeg",
					caption: "himalayan123",
				},
				{
					img: "images/mountain002.jpeg",
					caption: "himalayan123",
				},
				{
					img: "images/mountain003.webp",
					caption: "himalayan123",
				},
			],
		};
	},
});

let slideIndex = 1;
</script>
<style>
img {
	vertical-align: middle;
	height: 40rem;
}

/* Position the image container (needed to position the left and right arrows) */
.c-container {
	position: relative;
}

/* Hide the images by default */
.mySlides {
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
	color: white;
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
.demo {
	opacity: 0.6;
}

.active,
.demo:hover {
	opacity: 1;
}
</style>
