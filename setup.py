from setuptools import setup, find_namespace_packages
from setup_helper import find_all_resource_files

# -- Apps Definition -- #
namespace = 'tethysapp'
app_package = "flood_impact_viewer"
release_package = "tethysapp-" + app_package

# -- Python Dependencies -- #
dependencies = []

# -- Get Resource File -- #
resource_files = find_all_resource_files(app_package, namespace)


setup(
    name=release_package,
    version="1.0.0",
    description="This app is a viewer app. It displays flood maps and their corresponding imapct statistics tables.",
    long_description="This app is a viewer app. It displays flood maps and their corresponding imapct statistics tables.",
    keywords="replace_keywords",
    author="Travis Tyler",
    author_email="Travis Tyler_email",
    url="",
    license="",
    packages=find_namespace_packages(),
    package_data={"": resource_files},
    include_package_data=True,
    zip_safe=False,
    install_requires=dependencies,
)
