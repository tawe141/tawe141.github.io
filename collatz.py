import time


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
        # print('Finish i=' + str(i))
    return obj

t0 = time.clock()
for x in range(10):
    collatz_dict(5000)
t1 = time.clock()
avg = (t1 - t0) / 10

print('Average time taken = ' + str(avg))