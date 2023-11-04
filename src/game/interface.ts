enum earSide {
	left = "left",
	right = "right",
}

export interface userGame {
	frequency: number;
	soundLevel: number;
	earSide: earSide;
	speed: number;
}
