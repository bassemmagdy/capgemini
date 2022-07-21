from .views import MovieViewSet
from rest_framework import routers

router = routers.DefaultRouter()
router.register('movies', MovieViewSet)