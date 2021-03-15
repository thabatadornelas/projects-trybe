def is_anagram(first_string, second_string):
    if len(first_string) != second_string:
        return False

    for each_letter in first_string:
        if each_letter not in second_string:
            return False

    return True
