//typescript - eslint / no - inferrable - types
import dayjs from "dayjs";
export const formatDate = (date: any, format: any = "hh:mm") => {
	return dayjs(date).format(format);
};

export const checkIsMobile: any = () => {
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
		navigator.userAgent,
	);
};
