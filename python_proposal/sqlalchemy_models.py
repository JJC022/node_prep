# sqlalchemy_models.py
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class GovernmentData(Base):
    __tablename__ = 'government_data'

    id = Column(Integer, primary_key=True)
    name = Column(String(255))
    status = Column(String(255))
    updated_at = Column(DateTime)

class MedicarePlan(Base): 
    __tablename__ = 'plan'

    id = Column(Integer, primary_key=True)
    name = Column(String(255))
    status = Column(String(255))
    updated_at = Column(DateTime)
    formulary = Column(String(255))  # Foreign key to table of formulary id's
    