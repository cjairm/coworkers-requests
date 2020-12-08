from django.urls import path
from reservations import views

urlpatterns = [
    path('reservations/', views.ReservationList.as_view()),
    path('reservations/<int:pk>/', views.ReservationObject.as_view()),
]
