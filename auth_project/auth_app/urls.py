from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register_view, name='register'),
    path('', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('dashboard/', views.dashboard_view, name='dashboard'),
    path('home/', views.home, name='home'),
    path('categories/', views.categories, name='categories'),
    path('select/<int:img_id>/', views.select_image, name='select_image'),
    path('delete/<int:img_id>/', views.delete_image, name='delete_image'),
    path('upload/', views.upload_view, name='upload')
]