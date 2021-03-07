from src.analyze_log import analyze_log
import pytest


def test_validar_conteudo_do_arquivo_gerado():
    analyze_log("data/orders_1.csv")
    FILE_TXT = "data/mkt_campaign.txt"
    with open(FILE_TXT) as f:
        file_txt_file = f.readlines()
        (
            maria_eats,
            arnaldo_ask_hamburguer,
            joao_never_ask,
            joao_never_went,
        ) = file_txt_file
    assert maria_eats == "hamburguer\n"
    assert arnaldo_ask_hamburguer == "1\n"
    assert eval(joao_never_ask) == {"pizza", "coxinha", "misto-quente"}
    assert eval(joao_never_went) == {"sabado", "segunda-feira"}


def test_validar_arquivo_inexistente():
    expect_text = "No such file or directory: " "'data/orders_3.csv'"
    with pytest.raises(FileNotFoundError, match=expect_text):
        assert analyze_log("data/orders_3.csv")


def test_validar_arquivo_com_extensao_invalida():
    expect_text = "No such file or directory: " "'data/orders_1.txt'"
    with pytest.raises(FileNotFoundError, match=expect_text):
        assert analyze_log("data/orders_1.txt")
