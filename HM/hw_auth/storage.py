from models import Account

accounts: list[Account] = []


def find_account(username: str) -> Account | None:
    for acc in accounts:
        if acc.username == username:
            return acc
    return None