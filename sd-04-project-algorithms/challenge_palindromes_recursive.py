def is_palindrome_recursive(word, low, high):
    """ Faça o código aqui. """

    if word == "":
        return False
    if high <= low:
        return True
    if word[low] == word[high]:
        return is_palindrome_recursive(word, low+1, high-1)
    return False
