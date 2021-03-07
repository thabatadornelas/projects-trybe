from src.track_orders import TrackOrders


csv_parsed = [
    ["maria", "pizza", "terça-feira"],
    ["maria", "hamburguer", "terça-feira"],
    ["joao", "hamburguer", "terça-feira"],
    ["maria", "coxinha", "segunda-feira"],
    ["arnaldo", "misto-quente", "terça-feira"],
    ["jose", "hamburguer", "sabado"],
    ["maria", "hamburguer", "terça-feira"],
    ["maria", "hamburguer", "terça-feira"],
    ["joao", "hamburguer", "terça-feira"],
]


def test_validar_classe_inicia_com_len_0():
    lenght_track_orders = TrackOrders()
    assert len(lenght_track_orders) == 0


def test_validar_adicionar_pedido():
    track_orders = TrackOrders()
    track_orders.add_new_order("jorge", "frango", "domingo")
    assert len(track_orders) == 1


def test_validar_prato_mais_pedido():
    track_orders = TrackOrders()
    for name, food, day in csv_parsed:
        track_orders.add_new_order(name, food, day)
    most_ordered = track_orders.get_most_ordered_dish_per_costumer("maria")
    assert "hamburguer" == most_ordered


def test_validar_pedido_nunca_feito_pelo_cliente():
    track_orders = TrackOrders()
    for name, food, day in csv_parsed:
        track_orders.add_new_order(name, food, day)
    never_ordered = track_orders.get_never_ordered_per_costumer("joao")
    assert "coxinha" in never_ordered == {"coxinha", "pizza", "misto-quente"}


def test_validar_dia_que_nunca_foi_feito_pedido():
    track_orders = TrackOrders()
    for name, food, day in csv_parsed:
        track_orders.add_new_order(name, food, day)
    never_visited = track_orders.get_days_never_visited_per_costumer("joao")
    assert {"segunda-feira", "sabado"} == never_visited


def test_validar_dia_mais_movimentado():
    track_orders = TrackOrders()
    track_orders.add_new_order("jorge", "frango", "domingo")
    track_orders.add_new_order("jorge", "frango", "domingo")
    track_orders.add_new_order("arnaldo", "peixe", "sábado")
    track_orders.add_new_order("maria", "carne", "terça-feira")
    track_orders.add_new_order("joao", "salada", "segunda-feira")
    busiest = track_orders.get_busiest_day()
    assert "domingo" == busiest


def test_validar_dia_menos_movimentado():
    track_orders = TrackOrders()
    track_orders.add_new_order("jorge", "frango", "domingo")
    track_orders.add_new_order("jorge", "frango", "domingo")
    track_orders.add_new_order("arnaldo", "peixe", "sábado")
    track_orders.add_new_order("maria", "carne", "sábado")
    track_orders.add_new_order("joao", "salada", "segunda-feira")
    less_busy = track_orders.get_least_busy_day()
    assert "segunda-feira" == less_busy
