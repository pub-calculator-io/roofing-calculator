function calculate(){
	const baseArea = input.get('house_base_area').gt(0).val();
	const eaves = input.get('eaves_stick_out').gte(0).val();
	const pitchOrAngle = input.get('pitch_or_angle').index().val();
	const pitch = input.get('roof_pitch').replace('/12', '').raw();
	const angle = input.get('roof_angle').gt(0).lt(90).val();
	const price = +input.get('price').val();
	if(!input.valid()) return;
	const sides = getWithLength(baseArea);
	let width = sides.width + (eaves * 2);
	let length = sides.length + (eaves * 2);

	let roofArea;
	if(pitchOrAngle === 0){
		roofArea = getAreaByAnglePitch(width, pitch, length);
	}
	else {
		roofArea = getAreaByAngle(width, angle, length);
	}

	let metersResult = numberWithCommas(roundTo(roofArea, 1)) + ' square meters';
	let feetResult = numberWithCommas(roundTo(sqMetersToFeet(roofArea), 0)) + ' square feet';
	let sqYardsResult = numberWithCommas(roundTo(squareMetersToYards(roofArea), 2)) + ' square yards';
	let roofSquares = numberWithCommas(Math.ceil(sqMetersToFeet(roofArea * 1.1) / 100)) + ' roof squares';

	let result = 'The estimated roof area is 12333 square feet<br><br>or 321.1 square meters or 313.1 square yards.<br><br>To have 10% buffer would require 31 roof squares.';
	if(price){
		let squareUnit = isMetricSystem() ? roofArea : sqMetersToFeet(roofArea);
		result += '<br><br>Estimated price: ' + currencyFormat(price * squareUnit);
	}
	let firstValue = isMetricSystem() ? metersResult : feetResult;
	let secondValue = isMetricSystem() ? feetResult : metersResult;
	result = result.replace('12333 square feet', firstValue).replace('321.1 square meters', secondValue).replace('313.1 square yards', sqYardsResult).replace('31 roof squares', roofSquares);
	output.val(result).set('result-0-1')
	output.val(calculateMaterials(roofArea)).set('result-0-2')
}

function calculateMaterials(area){
	area = sqMetersToFeet(area);
	let shingles = Math.ceil(area / 33.33);
	let rollRoofing = Math.ceil((area * 1.1) / 108);
	let felt15 = Math.ceil((area * 1.1) / 432);
	let felt30 = Math.ceil((area * 1.1) / 216);
	return `${shingles} bundles of composition shingles (each bundle will cover ~33 ft2)<br>${rollRoofing} rolls of roll roofing (~36 in × 36 ft for each roll)<br>${felt15} rolls of #15 felt (~36 in × 144 ft for each roll)<br>${felt30} rolls of #30 felt (~36 in × 72 ft for each roll)`;
}

function squareMetersToYards(meters){
	return meters * 1.19599;
}

function sqMetersToFeet(meters){
	return meters * 10.7639;
}

function getWithLength(baseArea){
	let a = Math.sqrt(baseArea / 10);
	return {
		width: 2 * a,
		length: 5 * a,
	}
}

function getAreaByAnglePitch(width, pitch, length){
	const a = width / 2;
	const b = a * pitch / 12;
	return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)) * length * 2;
}

function getAreaByAngle(a, alpha, length) {
	const alphaInRadians = (alpha * Math.PI) / 180;

	const c = (a / 2) / Math.cos(alphaInRadians);

	return c * length * 2;
}

function currencyFormat(number){
	return number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

function calculate2(){
	const roofArea = input.get('roof_area').gt(0).val();
	if(!input.valid()) return;
	const result = calculateMaterials(roofArea);
	let roofSquares = Math.ceil(sqMetersToFeet(roofArea * 1.1) / 100);
	output.val('To have 10% buffer would require 25 roof squares.').replace('25', roofSquares).set('result-1-1')
	output.val(result).set('result-1-2')
}

function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
