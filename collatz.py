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


def find_all_links(dataset, *nodes):
    result = []
    for node_set in nodes:
        for i in range(1, len(node_set)):
            result.append({'source': dataset.index(node_set[i]), 'target': dataset.index(node_set[i-1])})
    return result

if __name__ == '__main__':
    # n = int(input("Enter number of iterations: "))
    n = 100
    collatzes = collatz_dict(n+1)
    data_union = list(set().union(*collatzes.values()))
    links = find_all_links(data_union, *collatzes.values())
    to_json = {
        'nodes': data_union,
        'links': links
    }
    with open('data.json', 'w') as output:
        json.dump(to_json, output, indent=4, separators=(',',':'))
