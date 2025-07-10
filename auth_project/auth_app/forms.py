from django import forms
from .models import Image, Upload

class ImageForm(forms.ModelForm):
    class Meta:
        model = Image
        fields = ['photo']

class UploadForm(forms.ModelForm):
    class Meta:
        model = Upload
        fields = ['photo']


        