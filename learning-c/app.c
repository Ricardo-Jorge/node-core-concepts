#include <stdio.h>

int length(char s[]) {
    char c = s[0];
    int length = 0;

    while (c != '\0') {
        length++;
        c= s[length];
    }

    return length;
}

int main () {

    // int a = 20;
    // int b = 30;
    // int c = 20 + 30;

    // float foo = 234234.23423;

    size_t t = 18446744073709551615ULL;

    fprintf(stdout, "The address is: %p.\n", &t);

    for (int i = 0; i < sizeof(size_t); ++i) {
        printf("Byte %d address: %p.\n", i, (&t + i));
    }

    char myStr[6];

    myStr[0] = 'T';
    myStr[1] = 'e';
    myStr[2] = 's';
    myStr[3] = 't';
    myStr[4] = '\0';

    char *myOtherStr = "This is my string";

    printf("My string is: %p\n", myStr);
    printf("My string is: %s\n", myOtherStr);
    printf("The length of my string is: %d\n", length(myOtherStr));

    return 0;
}
