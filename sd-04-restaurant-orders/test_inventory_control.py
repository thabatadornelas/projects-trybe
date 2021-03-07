from src.inventory_control import InventoryControl


def test_validar_atualizou_a_quantidade_em_estoque():
    inventory = InventoryControl()
    inventory.add_new_order("jorge", "hamburguer", "terça-feira")
    inventory.add_new_order("jorge", "hamburguer", "terça-feira")
    hamburguer = inventory.get_quantities_to_buy()
    total_ingredients = {
        "pao": 2,
        "carne": 2,
        "queijo": 2,
        "molho": 0,
        "presunto": 0,
        "massa": 0,
        "frango": 0,
    }
    assert hamburguer == total_ingredients


def test_validar_comprar_todo_estoque_de_hamburguer():
    ingredients = InventoryControl()
    count = 1
    while count <= 50:
        ingredients.add_new_order("jorge", "hamburguer", "terça-feira")
        count += 1
    hamburguer = ingredients.get_quantities_to_buy()
    total_ingredients = {
        "pao": 50,
        "carne": 50,
        "queijo": 50,
        "molho": 0,
        "presunto": 0,
        "massa": 0,
        "frango": 0,
    }
    assert hamburguer == total_ingredients


def test_validar_compra_uma_quantidade_maior_que_o_minimo():
    ingredients = InventoryControl()
    count = 1
    while count <= 50:
        ingredients.add_new_order("jorge", "hamburguer", "terça-feira")
        ingredients.add_new_order("maria", "pizza", "terça-feira")
        count += 1
    hamburguer_pizza = ingredients.add_new_order(
        "jorge", "hamburguer", "terça-feira"
    )
    assert hamburguer_pizza is False


def test_validar_ingrediente_compartilhados():
    ingredients = InventoryControl()
    count = 1
    while count <= 50:
        ingredients.add_new_order("jorge", "hamburguer", "terça-feira")
        ingredients.add_new_order("maria", "pizza", "terça-feira")
        count += 1
    hamburguer_pizza = ingredients.get_quantities_to_buy()
    total_ingredients = {
        "pao": 50,
        "carne": 50,
        "queijo": 100,
        "molho": 50,
        "presunto": 0,
        "massa": 50,
        "frango": 0,
    }
    assert hamburguer_pizza == total_ingredients


def test_listar_todo_os_pratos_com_ingredientes():
    ingredients = InventoryControl()
    ingredients.add_new_order("jorge", "coxinha", "terça-feira")
    dishes = ingredients.get_available_dishes()
    assert dishes == {"hamburguer", "pizza", "misto-quente", "coxinha"}


def test_nao_listar_pratos_sem_ingredientes():
    ingredients = InventoryControl()
    count = 1
    while count <= 50:
        ingredients.add_new_order("jorge", "coxinha", "terça-feira")
        count += 1
    dishes = ingredients.get_available_dishes()
    assert dishes == {"hamburguer", "misto-quente"}
