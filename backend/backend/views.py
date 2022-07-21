from base.models import Movie
from base.serializers import MovieSerializer
from rest_framework import viewsets, filters
import base64

class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    search_fields = ['name']
    filter_backends = (filters.SearchFilter,)

    def create(self, request, *args, **kwargs):
        if request.FILES and 'base64' not in request.FILES.get('image_object'):
            with request.FILES.get('image_object').open("rb") as img_file:
                my_string = base64.b64encode(img_file.read())
                request.data['image_object'] = my_string
        return super().create(request, *args, **kwargs)
       