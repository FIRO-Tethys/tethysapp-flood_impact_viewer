from django.shortcuts import render
from tethys_sdk.permissions import login_required
from tethys_sdk.gizmos import *
from .model import Impact_Data, Flood_Map
from tethysapp.flood_impact_viewer.app import FloodImpactViewer as app
import json

@login_required()
def home(request):
    """
    Controller for the app home page.
    """
    Session = app.get_persistent_store_database('flood_impact', as_sessionmaker = True)

    session = Session()

    flood_impact = session.query(Impact_Data.Agriculture_hectares, Impact_Data.Population, Impact_Data.Education_facil, Impact_Data.Entertainment_facil, Impact_Data.Financial_facil, Impact_Data.Food_facil, Impact_Data.Healthcare_facil, Impact_Data.Other_facil, Impact_Data.Public_service_amenity, Impact_Data.Transportation, Impact_Data.Waste_management_amenity).all()

    flood_extents = session.query(Flood_Map.geometry, Flood_Map.id).all()
    layers = []
    for flood_extent in flood_extents:
        geojson_flood_extent = flood_extent[0]
        flood_extent_layer = MVLayer(
                source='GeoJSON',
                options=geojson_flood_extent,
                legend_title='FloodExtent {0}'.format(flood_extent[1]),
                legend_extent=[-111.74, 40.21, -111.61, 40.27],
            )

        layers.append(flood_extent_layer)

    initial_view = MVView(
        projection='EPSG:4326',
        center=[-76.1357, -6.5724088],
        zoom=13
    )

     # Define the map
    map_options = MapView(
        height='100%',
        width='100%',
        controls=[{'MousePosition': {'projection': 'EPSG:4326'}}],
        layers=layers,
        basemap='OpenStreetMap',
        view=initial_view,
        legend=True
    )

    countries = session.query(Impact_Data.country).all()
    countryList = [('','')]
    for i in range (len(countries)):
        if (countries[i][0], countries[i][0].upper()) not in countryList:
            countryList.append((countries[i][0], countries[i][0].upper()))

    country_select = SelectInput (
        name='Country',
        display_text='Country',
        options=countryList,
        initial='',
    )

    # provinces = session.query(Impact_Data.province).all()
    # provinceDict = {}
    # provinceList = []
    # for i in range (len(provinces)):
    #     if countries[i][0] not in provinceDict:
    #         prov = provinces[i][0]
    #         provinceDict[countries[i][0]] = prov
    #     if (provinces[i][0].upper(), provinces[i][0]) not in provinceList:
    #         prov = provinces[i][0]
    #         provinceList.append((prov.upper(), prov))
    # print(provinceDict)

    cntr_provs = session.query(Impact_Data.country, Impact_Data.province).all()
    provDict = {}
    provList = []
    i = 0
    for tup in cntr_provs:
        if tup not in provDict.values():
            provDict[i] = tup
            print(i, tup)
            i += 1

    province_select = SelectInput (
        name='Province',
        display_text='Province',
        options=provList,
        attributes=provDict
    )

    region_select = SelectInput (
        name='Region',
        display_text='Region',
    )

    context = {
        # 'base_map': base_map,
        'map_options': map_options,
        'country_select': country_select,
        'flood_impact': flood_impact,
        'province_select': province_select,
        'region_select': region_select
    }

    session.close()

    return render(request, 'flood_impact_viewer/home.html', context)


# create a controller that just returns the data for the table
