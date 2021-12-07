from tethys_sdk.base import TethysAppBase, url_map_maker
from tethys_sdk.app_settings import PersistentStoreDatabaseSetting

class FloodImpactViewer(TethysAppBase):
    """
    Tethys app class for Flood Impact Viewer.
    """

    name = 'Flood Impact Viewer'
    index = 'flood_impact_viewer:home'
    icon = 'flood_impact_viewer/images/icon.gif'
    package = 'flood_impact_viewer'
    root_url = 'flood-impact-viewer'
    color = '#16a085'
    description = ''
    tags = ''
    enable_feedback = False
    feedback_emails = []

    def url_maps(self):
        """
        Add controllers
        """
        UrlMap = url_map_maker(self.root_url)

        url_maps = (
            UrlMap(
                name='home',
                url='flood-impact-viewer',
                controller='flood_impact_viewer.controllers.home'
            ),
        )

        return url_maps

    def persistent_store_settings(self):
        ps_settings = (
            PersistentStoreDatabaseSetting(
                name='flood_impact',
                description='Flood Impact database',
                initializer='flood_impact_viewer.init_stores.init_flood_impact_db',
                spatial=True,
                required=True
            ),
        )

        return ps_settings