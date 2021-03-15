from challenges.challenge_study_schedule import study_schedule
import timeit


def test_validar_melhor_horario_com_sucesso():
    start_time = [2, 1, 2, 1, 4, 4]
    end_time = [2, 2, 3, 5, 5, 5]
    assert study_schedule(start_time, end_time, 5) == 3
    assert study_schedule(start_time, end_time, 4) == 3
    assert study_schedule(start_time, end_time, 3) == 2
    assert study_schedule(start_time, end_time, 2) == 4
    assert study_schedule(start_time, end_time, 1) == 2


def test_validar_melhor_horario_quando_target_empata_com_maior_saida():
    start_time = [4, 1, 3, 2]
    end_time = [4, 3, 4, 5]
    assert study_schedule(start_time, end_time, 5) == 1
    assert study_schedule(start_time, end_time, 4) == 3
    assert study_schedule(start_time, end_time, 3) == 3
    assert study_schedule(start_time, end_time, 2) == 2
    assert study_schedule(start_time, end_time, 1) == 1


def test_validar_start_time_com_valor_vazio():
    start_time = []
    end_time = [5, 4, 3, 4, 5]
    target_time = 4
    assert study_schedule(start_time, end_time, target_time) == 0


def test_validar_target_time_com_vazio():
    start_time = [1, 2, 3, 4, 5]
    end_time = [5, 4, 3, 4, 5]
    target_time = 0
    assert study_schedule(start_time, end_time, target_time) == 0


def test_validar_tempo_schedule():
    start_time = [2, 1, 2, 1, 4, 4]
    end_time = [2, 2, 3, 5, 5, 5]
    algorithms_correct = study_schedule(start_time, end_time, 5) == 3
    setup_import = (
        "from challenges.challenge_study_schedule " "import study_schedule"
    )
    time = timeit.timeit(
            f"study_schedule({start_time}, {end_time}, 5)",
            setup=f"{setup_import}",
            number=10000,
        )
    correct_time = time <= 0.02
    assert (
        algorithms_correct and correct_time
    ), f"Falhou, o tempo foi: {time}, algoritmo correto? {algorithms_correct}"
