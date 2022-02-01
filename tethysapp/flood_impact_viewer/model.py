import os
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.orm import sessionmaker
from sqlalchemy.sql.expression import null
from geoalchemy2 import Geometry
from sqlalchemy.dialects.postgresql import JSON

Base = declarative_base()


class Impact_Data(Base):
   """
   SQLAlchemy table definition for storing flood impacts
   """

   __tablename__ = 'flood_impact'

   #COLUMNS
   id = Column(Integer, primary_key=True)
   country = Column(String)
   province = Column(String)
   region = Column(String)
   return_period = Column(String, nullable=True)
   flood_depth_m = Column(String, nullable=True)
   flow_rate_cms = Column(String,nullable=True)
   flood_date = Column(String, nullable=True)
   event = Column(String, nullable=True)
   impact_method = Column(String, nullable=True)
   map_method = Column(String, nullable=True)
   flood_mask = Column(String, nullable=True)
   max_depth = Column(String,nullable=True)
   Agriculture_hectares = Column(String, nullable=True)
   Population = Column(String, nullable=True)
   Education_facil = Column(String, nullable=True)
   Entertainment_facil = Column(String, nullable=True)
   Financial_facil = Column(String, nullable=True)
   Food_facil = Column(String, nullable=True)
   Healthcare_facil = Column(String, nullable=True)
   Other_facil = Column(String, nullable=True)
   Public_service_amenity = Column(String, nullable=True)
   Transportation = Column(String, nullable=True)
   Waste_management_amenity = Column(String, nullable=True)

   def __init__(self,country,province,region,return_period,flood_depth_m,flow_rate_cms,flood_date,event,impact_method,map_method,flood_mask,max_depth,Agriculture_hectares,population,Education_facil,Entertainment_facil,Financial_facil,Food_facil,Healthcare_facil,Other_facil,Public_service_amenity,Transportation,Waste_management_amenity):
      self.country = country
      self.province = province
      self.region = region
      self.return_period = return_period
      self.flood_depth_m = flood_depth_m
      self.flow_rate_cms = flow_rate_cms
      self.flood_date = flood_date
      self.event = event
      self.impact_method = impact_method
      self.map_method = map_method
      self.flood_mask = flood_mask
      self.max_depth = max_depth
      self.Agriculture_hectares = Agriculture_hectares
      self.Population = population
      self.Education_facil = Education_facil
      self.Entertainment_facil = Entertainment_facil
      self.Financial_facil = Financial_facil
      self.Food_facil = Food_facil
      self.Healthcare_facil = Healthcare_facil
      self.Other_facil = Other_facil
      self.Public_service_amenity = Public_service_amenity
      self.Transportation = Transportation
      self.Waste_management_amenity = Waste_management_amenity

class Flood_Map(Base):
   __tablename__ = 'flood_map'

   id = Column(Integer, primary_key=True)
   geometry = Column(JSON)
   flood_map_name = Column(String, nullable=False)
   map_id = Column(Integer)

   def __init__(self, geometry, flood_map_name, map_id):
      self.geometry = geometry
      self.flood_map_name = flood_map_name
      self.map_id = map_id
