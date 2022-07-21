from rest_framework import serializers
from .models import Movie
from drf_extra_fields.fields import Base64ImageField

class MovieSerializer(serializers.ModelSerializer):
    image_object= Base64ImageField(
        max_length=None, use_url=True,
    )

    class Meta:
        model = Movie
        fields = '__all__'