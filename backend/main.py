from fastapi import FastAPI, Request
from pydantic import BaseModel
from pymongo import MongoClient

app = FastAPI()


# Pydantic model for registration data
class RegistrationData(BaseModel):
    username: str
    password: str
    email: str
    phoneNumber: str


# MongoDB Atlas connection and setup
MONGODB_URI = "mongodb_atlas_uri"
client = MongoClient(MONGODB_URI)
db = client["mydatabase"]
users_collection = db["users"]


@app.post("/register")
async def register(request: Request):
    data = await request.json()
    registration_data = RegistrationData(**data)

    # Validate username, email, and phoneNumber uniqueness
    if users_collection.find_one({"username": registration_data.username}):
        return {"message": "Username already exists"}
    if users_collection.find_one({"email": registration_data.email}):
        return {"message": "Email already exists"}
    if users_collection.find_one({"phoneNumber": registration_data.phoneNumber}):
        return {"message": "Phone number already exists"}

    # Save the user data to MongoDB Atlas
    user_data = registration_data.dict()
    users_collection.insert_one(user_data)

    return {"message": "Registration successful"}
