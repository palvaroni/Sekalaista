```
/**
 * Return maximum int value for parameter with
 * which an algorithm of complexity O(n log2 n)
 * can be evaluated in the given amount of
 * time units n.
 */
function max_param_nlog2n(n) {
	// Math.log(x) == ln x
	return Math.pow(Math.E, gsl_sf_lambert_W0(n*Math.log(2))) >>> 0;
}
```
[Using this Lambert W implementation](https://github.com/protobi/lambertw)
