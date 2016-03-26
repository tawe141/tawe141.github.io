import json


def find_collatz(n):
    result = [n]
    while result[-1] > 1:
        if result[-1] % 2 == 0:
            result.append(int(result[-1] / 2))
        else:
            result.append(int(result[-1] * 3 + 1))
    return result


def collatz_dict(n):
    obj = {}
    for i in range(1,n):
        obj[i] = find_collatz(i)
    return obj

if __name__ == '__main__':
    # n = int(input("Enter number of iterations: "))
    n = 100
    data = collatz_dict(n)
    data_vals = data.values()
    data_union = set().union(*data_vals)
    print data_union