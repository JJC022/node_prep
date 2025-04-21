# update_data.py
import requests
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from pydantic_models import GovernmentRecord
from sqlalchemy_models import GovernmentData, Base

DATABASE_URL = "mysql+pymysql://user:password@localhost/dbname"
engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)
session = Session()

# Pull the data
response = requests.get("https://govapi.example.com/data")
records = response.json()

# Validate with Pydantic
for record in records:
    parsed = GovernmentRecord(**record)
    
    # Check if exists
    db_record = session.query(GovernmentData).filter_by(id=parsed.id).first()
    
    if db_record:
        # Update existing
        db_record.name = parsed.name
        db_record.status = parsed.status
        db_record.updated_at = parsed.updated_at
    else:
        # Insert new
        new_record = GovernmentData(
            id=parsed.id,
            name=parsed.name,
            status=parsed.status,
            updated_at=parsed.updated_at,
        )
        session.add(new_record)

session.commit()
