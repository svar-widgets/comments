export function getContrastingColor(color) {
	if (color.startsWith("hsl")) {
		const n = toHSLArray(color);
		return n[2] > 55 ? "dark" : "light";
	}

	if (color.startsWith("#") || color.startsWith("rgb")) {
		const rgb = hexToRgb(color, true);
		const brightness = Math.round(
			(rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000
		);
		return brightness > 180 ? "dark" : "light";
	}

	// consider it's an html color, most of them are vivid, so
	return "light";
}

export function toHSLArray(hslStr) {
	return hslStr.match(/\d+/g).map(Number);
}

export function hexToRgb(hex, asObject = false) {
	if (hex.startsWith("rgb")) {
		return asObject ? rgbStringToObj(hex) : hex;
	}
	let r = 0,
		g = 0,
		b = 0;

	// 3 digits
	if (hex.length == 4) {
		r = "0x" + hex[1] + hex[1];
		g = "0x" + hex[2] + hex[2];
		b = "0x" + hex[3] + hex[3];

		// 6 digits
	} else if (hex.length == 7) {
		r = "0x" + hex[1] + hex[2];
		g = "0x" + hex[3] + hex[4];
		b = "0x" + hex[5] + hex[6];
	}
	r = +r;
	g = +g;
	b = +b;
	return asObject ? { r, g, b } : "rgb(" + r + "," + g + "," + b + ")";
}

export function rgbStringToObj(rgb) {
	const sep = rgb.indexOf(",") > -1 ? "," : " ";
	// Turn "rgb(r,g,b)" into [r,g,b]
	const arr = rgb.substring(4).split(")")[0].split(sep);

	const r = (+arr[0]).toString(16),
		g = (+arr[1]).toString(16),
		b = (+arr[2]).toString(16);
	return { r: +r, g: +g, b: +b };
}
