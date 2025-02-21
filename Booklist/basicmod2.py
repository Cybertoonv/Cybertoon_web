numbers = [432, 331, 192, 108, 180, 50, 231, 188, 105, 51, 364, 168, 344, 195, 297, 342, 292, 198, 448, 62, 236, 342, 63]
text = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_'
pic="picoCTF{"
remainders = [num % 41 for num in numbers]
rem=remainders[::-1]
ram=[28, 14, 22, 30, 18, 32, 30, 12, 25, 37, 8, 31, 18, 4, 37, 3, 33, 35, 27, 2, 4, 3, 28]
print(ram)
for i in ram:
   pic += text[i]
print(pic+'}')






