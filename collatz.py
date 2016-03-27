import json


def find_collatz(n):

    # Main Collatz Conjecture function. Takes in integer n, where n is the initial value
    # @param: int n
    # @returns: array result

    result = [n]
    while result[-1] > 1:
        if result[-1] % 2 == 0:
            result.append(int(result[-1] / 2))
        else:
            result.append(int(result[-1] * 3 + 1))
    return result


def collatz_dict(n):

    # Finds the collection of Collatz sequences from 1 to n
    # @param: int n
    # @returns: dict obj

    obj = {}
    for i in range(1,n):
        obj[i] = find_collatz(i)
    return obj


def find_all_links(dataset, *nodes):

    # Finds all links between nodes, given dataset of nodes with no repeats and any number of arrays of  Collatz sequence of numbers
    # @param: array dataset, array *nodes
    # @returns: array result

    result = []
    for node_set in nodes:
        for i in range(1, len(node_set)):
            result.append({'source': dataset.index(node_set[i]), 'target': dataset.index(node_set[i-1])})
    return result

if __name__ == '__main__':
    n = int(input("Enter number of iterations: "))

    # Find all nodes given n
    collatzes = collatz_dict(n+1)

    # Get list of nodes with no repeats
    data_union = list(set().union(*collatzes.values()))
    nodes = [{'name': str(x)} for x in data_union]

    # Find links between all nodes given the set of Collatz sequences
    links = find_all_links(data_union, *collatzes.values())

    # Remove duplicate links
    links = [dict(t) for t in set([tuple(d.items()) for d in links])]

    # Output to data.json file, which will be imported by app.js
    to_json = {
        'nodes': nodes,
        'edges': links
    }
    with open('data.json', 'w') as output:
        json.dump(to_json, output, indent=4, separators=(',',':'))
