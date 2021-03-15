# quora.com/What-is-the-python-program-for-finding-duplicate-element-from-a-list


def find_duplicate(nums):
    """ Faça o código aqui. """

    nums.sort()

    for i in range(1, len(nums)):
        if type(nums[i]) != int or nums[i] < 0:
            return False
        if(nums[i] == nums[i-1]):
            return nums[i]

    return False

# nums = [1, 2, 2, 3, 4] then duplicate === 2

