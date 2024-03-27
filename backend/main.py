from fastapi import FastAPI, Request, HTTPException, status
from pydantic import BaseModel, EmailStr, validator
from pymongo import MongoClient
from pymongo.errors import DuplicateKeyError

app = FastAPI()


# Pydantic model for registration data
class RegistrationData(BaseModel):
    username: str
    password: str
    email: EmailStr
    phoneNumber: str

    # Validator for username
    @validator("username")
    def validate_username(cls, value):
        if len(value) < 4:
            raise ValueError("Username must be at least 4 characters long")
        return value

    # Validator for password
    @validator("password")
    def validate_password(cls, value):
        if len(value) < 8:
            raise ValueError("Password must be at least 8 characters long")
        return value


# MongoDB Atlas connection and setup
MONGODB_URI = "mongodb_atlas_uri"
client = MongoClient(MONGODB_URI)
db = client["mydatabase"]
users_collection = db["users"]

# Index for uniqueness
users_collection.create_index(
    [("username", 1), ("email", 1), ("phoneNumber", 1)], unique=True
)


@app.post("/register", status_code=status.HTTP_201_CREATED)
async def register(registration_data: RegistrationData):
    try:
        user_data = registration_data.dict()
        users_collection.insert_one(user_data)
    except DuplicateKeyError:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Username, email, or phone number already exists",
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )

    return {"message": "Registration successful"}


@app.exception_handler(ValueError)
async def value_error_exception_handler(request: Request, exc: ValueError):
    return HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc))
