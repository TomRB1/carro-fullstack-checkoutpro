import os
import mercadopago
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Union

load_dotenv()

MERCADOPAGO_TOKEN = os.getenv("TOKEN_DESARROLLO")
sdk = mercadopago.SDK(MERCADOPAGO_TOKEN)

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://localhost:5174",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ItemCarrito(BaseModel):
    id: Union[int, str]
    title: str
    unit_price: float
    quantity: int

class Carrito(BaseModel):
    items: List[ItemCarrito]

@app.get("/")
def root():
    return {"status": "ok", "message": "API funcionando"}

@app.post("/carrito")
def post_carrito(carrito: Carrito):

    preference_data = {
        "items": [
            {
                "title": item.title,
                "quantity": item.quantity,
                "unit_price": item.unit_price,
                "currency_id": "ARS"
            }
            for item in carrito.items
        ]
    }

    preference_response = sdk.preference().create(preference_data)
    preference = preference_response["response"]

    return {
        "id": preference["id"],
        "init_point": preference["init_point"],
        "sandbox_init_point": preference["sandbox_init_point"]
    }