from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages

from .forms import ImageForm, UploadForm
from .models import Image, Upload


def register_view(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('login')
    else:
        form = UserCreationForm()
    return render(request, 'auth/register.html', {'form': form})


def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            login(request, form.get_user())
            return redirect('dashboard')
    else:
        form = AuthenticationForm()
    return render(request, 'auth/login.html', {'form': form})


def logout_view(request):
    logout(request)
    return redirect('login')


@login_required
def dashboard_view(request):
    return render(request, 'dashboard.html')





def categories(request):
    return render(request, 'auth/categories.html')


@login_required
def home(request):
    if request.method == 'POST':
        files = request.FILES.getlist('photo')
        for f in files:
            Upload.objects.create(user=request.user, photo=f)
        return redirect('home')

    form = UploadForm()
    images = Upload.objects.filter(user=request.user).order_by('-date')
    return render(request, 'auth/home.html', {'form': form, 'img': images})



@login_required
def select_image(request, img_id):
    image = get_object_or_404(Upload, id=img_id, user=request.user)
    Upload.objects.filter(user=request.user).update(is_selected=False)
    image.is_selected = True
    image.save()
    return redirect('home')


@login_required
def delete_image(request, img_id):
    image = get_object_or_404(Upload, id=img_id, user=request.user)
    image.photo.delete()  # Deletes file
    image.delete()        # Deletes DB entry
    messages.success(request, "Image deleted successfully.")
    return redirect('home')


def upload_view(request):
    # your logic here
    return render(request, 'upload.html')             