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


def find_links(dataset, nodes):
    links = []
    for i in range(1, len(nodes)):
        links.append({'source': dataset.index(nodes[i]), 'target': dataset.index(nodes[i-1])})
    return links

if __name__ == '__main__':
    # n = int(input("Enter number of iterations: "))
    n = 100
    collatzes = collatz_dict(n+1)
    data_union = list(set().union(*collatzes.values()))
    # print nodes
    # print(find_links(data_union, collatzes[3]))
    links = []
    for collatz in collatzes.values():
        links.append(find_links(data_union, collatz))
    # print links
    print set().union(*links)