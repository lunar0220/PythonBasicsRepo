
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="smth")


class Item(BaseModel):
    name: str
    price: float


fake_db: list[dict] = []
c = 1


@app.get("/")
def read_root():
    return {"message": "Hello World"}


@app.post("/items")
def create_item(item: Item):
    global c

    v = {
        "id": c,
        "name": item.name,
        "price": item.price
    }

    fake_db.append(v)
    c += 1

    return v


@app.get("/items")
def list_items():
    return {"items": fake_db}