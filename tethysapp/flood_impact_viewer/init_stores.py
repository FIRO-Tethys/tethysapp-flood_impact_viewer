import os
from sqlalchemy.orm import sessionmaker
from .model import Base, Impact_Data, Flood_Map


def init_flood_impact_db(engine, first_time):
   """
   Initialize the flood_impact database
   """
   #STEP 1: Create database tables
   Base.metadata.create_all(engine)

   #STEP 2: Add data to the database
   if first_time:
      # Create a session object in preparation for interacting with the database
      Session = sessionmaker(bind=engine)
      session = Session()

      #Find the path of parent directory relative to this file
      impact_data_dir = os.path.dirname(__file__)

      flood_impact_path = os.path.join(
         impact_data_dir, 'data', 'flood_impact_table-test.csv'
      )

      impact_data_lines = []
      
      with open(flood_impact_path, 'r') as f:
         impact_data_lines = f.read().splitlines()


      #pop off the first line which is the column headers
      impact_data_lines.pop(0) 

      for line in impact_data_lines:
         row = line.split(',')

         impact_data = Impact_Data(
            country = row[0],
            province = row[1],
            region = row[2],
            return_period = row[3],
            flood_depth_m = row[4],
            flow_rate_cms = row[5],
            flood_date = row[6],
            event = row[7],
            impact_method = row[8],
            map_method = row[9],
            flood_mask = row[10],
            max_depth = row[11],
            Agriculture_hectares = row[12],
            population= row[13],
            Education_facil = row[14],
            Entertainment_facil = row[15],
            Financial_facil = row[16],
            Food_facil = row[17],
            Healthcare_facil = row[18],
            Other_facil = row[19],
            Public_service_amenity = row[20],
            Transportation = row[21],
            Waste_management_amenity = row[22]
         )
         #ADD THE DATA TO THE DATABASE
         session.add(impact_data)
      #-----------------FLOOD MAP------------------------------
      flood_maps_dir = os.path.dirname(__file__)

      flood_maps_path = os.path.join(
         flood_maps_dir, 'data','flood_maps-test'
      )

      flood_map_files = None
      flood_map_files = os.listdir(flood_maps_path)
      flood_map = None

      for i in range(1,len(flood_map_files)):
         flood_extent = os.path.join(flood_maps_path, flood_map_files[i])
         with open(flood_extent, 'r') as f:
            flood_map = f.read()

         chazuta_flood_map = Flood_Map(
            geometry=flood_map,
            flood_map_name=flood_map_files[i],
            map_id = i
         )
         i += 1
         session.add(chazuta_flood_map)
      #--------------End Flood Map----------------------------
      #COMMIT THE CHANGES TO THE DB
      session.commit()
      #CLOSE THE CONNECTION TO PREVENT ISSUES
      session.close()
      