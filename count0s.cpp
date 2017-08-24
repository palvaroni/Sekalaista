#include "stdafx.h"
#include <stdio.h>

int main()
{
	int num = 0b00000100010001000100110001010000;
	int curr;
	int carry = 0;
	int max = 0;

	for (unsigned i = 0; i < 32; i++) {
		if (((num >> i) & 1) == 1) {
			curr = (i - carry) - 1;
			carry = i;
			if (curr > max) {
				max = curr;
			}
		}
	}

	int n = ~num;
	int k;
	for (k = 0; n != 0; k++) n = n & 2 * n;
	
	printf("\nLongest stream of 0's surrounded by 1's in binary value of %i is %i", num, max);
	printf("\nLongest stream of 0's overall is %i", k);
	getchar();

    return 0;
}

