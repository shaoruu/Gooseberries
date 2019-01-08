import string


def validate_name(str):
    "Name Validation"
    if not str:
        return True
    invalid_chars = string.punctuation.replace("\'", "") + "1234567890"
    if (any(char in invalid_chars for char in str)):
        return False
    return True

def remove_none(input):
    return {k:v for k,v in input.items() if v}
