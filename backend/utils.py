import string
import random

def validate_name(str):
    "Name Validation"
    if not str:
        return True
    invalid_chars = string.punctuation.replace("\'", "") + "1234567890"
    if (any(char in invalid_chars for char in str)):
        return False
    return True

def removed_none(input):
    return {k:v for k,v in input.items() if v}

# removes none type and strips strings
def clean_input(input):
    cleaned_input = removed_none(input)
    for key in cleaned_input:
        if isinstance(cleaned_input[key], str):
            cleaned_input[key] = cleaned_input[key].strip()
    return cleaned_input

def id_generator(size=8, chars=string.ascii_uppercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))
