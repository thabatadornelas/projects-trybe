import csv


def organized_list(read_orders):
    order_list = {}
    products = set()
    days_of_week = set()

    for name, item, day in read_orders:
        products.add(item)
        days_of_week.add(day)
        if name not in order_list:
            order_list[name] = [
                {"product": item, "days_of_week": day}
            ]
        else:
            order_list[name].append(
                {"product": item, "days_of_week": day}
            )

    return order_list, products, days_of_week


def read_csv(path):
    with open(path, mode="r") as file:
        read_orders = csv.reader(file, delimiter=",", quotechar='"')
        order_list = organized_list(read_orders)
    return order_list


def most_asked(order_list, name):
    count = {}
    most_frequent = order_list[name][0]["product"]
    for order in order_list[name]:
        if order["product"] not in count:
            count[order["product"]] = 1
        else:
            count[order["product"]] += 1
        if count[order["product"]] > count[most_frequent]:
            most_frequent = order["product"]

    return most_frequent


def times_asked(orders, name, item):
    count = 0

    for order in orders[name]:
        if order["product"] == item:
            count += 1

    return count


def never_asked(orders, name, list_of, term):
    products = set()
    set_list = set(list_of)
    for order in orders[name]:
        products.add(order[term])

    return (set_list.difference(products))


def analyze_log(path_to_file):
    order_list, products, days = read_csv(path_to_file)

    with open("data/mkt_campaign.txt", mode="w") as file:
        file.write(f"{most_asked(order_list, 'maria')}\n")
        file.write(f"{times_asked(order_list, 'arnaldo', 'hamburguer')}\n")
        file.write(f"{never_asked(order_list, 'joao', products, 'product')}\n")
        file.write(f"{never_asked(order_list, 'joao', days, 'days_of_week')}")
