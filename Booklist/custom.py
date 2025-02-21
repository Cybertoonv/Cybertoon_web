from sympy import mod_inverse
numbers = [432, 331, 192, 108, 180, 50, 231, 188, 105, 51, 364, 168, 344, 195, 297, 342, 292, 198, 448, 62, 236, 342, 63]
modulus = 41
mod_inverses = []
for num in numbers:
    remainder = num % modulus
    try:
        inverse = mod_inverse(remainder, modulus)
    except ValueError:
        # Inverse does not exist if gcd(remainder, modulus) != 1
        inverse = None
    mod_inverses.append(inverse)

print(mod_inverses)