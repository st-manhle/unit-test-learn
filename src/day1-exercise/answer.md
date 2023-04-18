1. Hãy nêu các bước viết unit test

- Write test
- Write code
- Refactor test code

2. Hãy nêu các thành phần cơ bản có trong 1 unit test

- Test suit
- Block test
- Test case
- Action
- Assert

3. Liệt kê tất cả các test cases mà bạn có thể nghĩ ra để kiểm tra 1 mảng có phải là mảng số tăng dần hay không.

Input | Output
----|----
'' | false
null | false
undefined | false
NaN | false
{} | false
1 | false
[''] | false
[null] | false
[undefined] | false
[NaN] | false
[{}] | false
[1] | false
[1, ''] | false
[1, null] | false
[1, undefined] | false
[1, NaN] | false
[1, {}] | false
[1, 0] | false
[1, 2] | true
[1, 1.1] | true
[-1, 1] | true
[1, 2, 2] | true
[1, 2, 2.2] | true
