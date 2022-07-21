import uuid
from django.db import models


def upload_to(instance, filename):
    return 'images/{filename}'.format(filename=filename)

# Create your models here.
class Movie(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    image_object = models.ImageField(upload_to=upload_to)
