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

    flood_impact = session.query(Impact_Data.Agriculture_hectares, Impact_Data.Population, Impact_Data.Education_facil, Impact_Data.Entertainment_facil, Impact_Data.Financial_facil, Impact_Data.Food_facil, Impact_Data.Healthcare_facil, Impact_Data.Other_facil, Impact_Data.Public_service_amenity, Impact_Data.Transportation, Impact_Data.Waste_management_amenity, Impact_Data.flood_mask).all()

    flood_extents = session.query(Flood_Map.geometry, Flood_Map.flood_map_name).all()
    layers = []
    for flood_extent in flood_extents:
        geojson_flood_extent = flood_extent[0]
        flood_extent_layer = MVLayer(
                source='GeoJSON',
                options=geojson_flood_extent,
                legend_title=flood_extent[1],
                legend_extent=[-111.74, 40.21, -111.61, 40.27],
            )

        layers.append(flood_extent_layer)

    # initial_view = MVView(
    #     projection='EPSG:4326',
    #     center=[0, 0],
    #     zoom=80
    # )

     # Define the map
    map_options = MapView(
        height='100%',
        width='100%',
        controls=[{'MousePosition': {'projection': 'EPSG:4326'}}],
        layers=layers,
        basemap='OpenStreetMap',
        # view=initial_view,
        legend=True
    )

    countries = session.query(Impact_Data.country).all()
    countryList = [('Select a Country','Select a Country')]
    for i in range (len(countries)):
        if (countries[i][0], countries[i][0].upper()) not in countryList:
            countryList.append((countries[i][0], countries[i][0].upper()))

    country_select = SelectInput (
        name='Country',
        display_text='Country',
        options=countryList,
        initial='Select a Country',
    )

    cntr_provs = session.query(Impact_Data.country, Impact_Data.province).all()
    provDict = {}
    provList = [('Select a Province','Select a Province')]
    i = 0
    for tup in cntr_provs:
        if tup not in provDict.values():
            provDict[i] = tup
            provList.append((tup[1], tup[1].upper()))
            i += 1

    province_select = SelectInput (
        name='Province',
        display_text='Province / State',
        options=provList,
        attributes=provDict,
        initial='Select a Province',
    )

    provs_regions = session.query(Impact_Data.province, Impact_Data.region).all()
    regsDict = {}
    regsList = [('Select a Region','Select a Region')]
    i = 0
    for tup in provs_regions:
        if tup not in regsDict.values():
            regsDict[i] = tup
            regsList.append((tup[1], tup[1].upper()))
            i += 1

    region_select = SelectInput (
        name='Region',
        display_text='Region / City',
        options=regsList,
        attributes=regsDict,
        initial='Select a Region',
    )

    flood_map_type = SelectInput (
        name='Flood_Map_Type',
        display_text='Flood Map Type',
        options=[('Select a Flood Map Type', 'Select a Flood Map Type'),('Return Period', 'Return Period'), ('Flood Date','Flood Date'), ('Flow Rate','Flow Rate')],
        initial='Select a Flood Map Type',
    )

    provs_regs_returnPeriods = session.query(Impact_Data.province, Impact_Data.flood_mask, Impact_Data.region, Impact_Data.return_period).all()
    returnPeriodsDict = {}
    returnPeriodList = [('Select a Return Period','Select a Return Period')]
    i = 0
    for tup in provs_regs_returnPeriods:
        if tup[3] != 'None' and tup not in returnPeriodsDict.values():
            returnPeriodsDict[i] = tup
            returnPeriodList.append((tup[3], tup[3].upper()))
            i += 1

    return_period_select = SelectInput (
        name='Return_Period',
        display_text='Return Period [yrs]',
        options=returnPeriodList,
        attributes=returnPeriodsDict,
        initial='Select a Return Period',
    )

    provs_regs_flowRate = session.query(Impact_Data.province, Impact_Data.flood_mask, Impact_Data.region, Impact_Data.flow_rate_cms).all()
    flowRateDict = {}
    flowRateList = [('Select a Flow Rate','Select a Flow Rate')]
    i = 0
    for tup in provs_regs_flowRate:
        if tup[3] != 'None' and  tup not in flowRateDict.values():
            flowRateDict[i] = tup
            flowRateList.append((tup[3], tup[3].upper()))
            i += 1

    flow_rate_select = SelectInput (
        name='Flow_Rate',
        display_text='Flow Rate [cms]',
        options=flowRateList,
        attributes=flowRateDict,
        initial='Select a Flow Rate',
    )

    provs_regs_floodDate = session.query(Impact_Data.province, Impact_Data.flood_mask, Impact_Data.region, Impact_Data.flood_date).all()
    floodDateDict = {}
    floodDateList = [('Select a Flood Date','Select a Flood Date')]
    i = 0
    for tup in provs_regs_floodDate:
        if tup[3] != 'None' and tup not in floodDateDict.values():
            floodDateDict[i] = tup
            floodDateList.append((tup[3], tup[3].upper()))
            i += 1

    flood_date_select = SelectInput (
        name='Flood_Date',
        display_text='Flood Date',
        options=floodDateList,
        attributes=floodDateDict,
        initial='Select a Flood Date',
    )
    context = {
        # 'base_map': base_map,
        'map_options': map_options,
        'country_select': country_select,
        'flood_impact': flood_impact,
        'province_select': province_select,
        'region_select': region_select,
        'flood_map_type': flood_map_type,
        'return_period_select': return_period_select,
        'flow_rate_select': flow_rate_select,
        'flood_date_select': flood_date_select,
    }

    session.close()

    return render(request, 'flood_impact_viewer/home.html', context)


# create a controller that just returns the data for the table
