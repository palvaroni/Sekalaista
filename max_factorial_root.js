/**
 * Return maximum int for which it's
 * factorial is equal to or smaller than
 * the given value n.
 */
function max_factorial_root(n) {
	let carry = n, z = 1;
	while(z < carry) carry /= ++z;
	return z;
}
