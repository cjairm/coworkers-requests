from reservations.models import Reservation
from reservations.serializers import ReservationSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils.datastructures import MultiValueDictKeyError
from django.core.files.storage import FileSystemStorage
from django.core.files import File
import csv, datetime

class ReservationFile(APIView):
    def post(self, req, format=None):
        fileData = req.FILES['invitationsFile']
        if not fileData.name.endswith('.csv'):
            return Response({"detail": "Not format accepted"}, status=status.HTTP_400_BAD_REQUEST)
        file_data = fileData.read().decode("utf-8")
        lines = file_data.split("\n")
        lst = []
        for line in lines:
            row = line.split(",")
            if (len(row) == 5):
                sData = {
                    "firstName": row[0],
                    "lastName": row[1],
                    "startTime": datetime.datetime.strptime(row[2], '%m/%d/%y %I:%M %p'),
                    "endTime": datetime.datetime.strptime(row[3], '%m/%d/%y %I:%M %p'),
                    "seats": row[4]
                }
                s = ReservationSerializer(data=sData)
                if s.is_valid():
                    s.save()
                    lst.append(s.data)
        return Response(lst, status=status.HTTP_201_CREATED)

class ReservationList(APIView):
    def get(self, request, format=None):
        order = request.GET.get('order_by')
        if order:
            reservations = Reservation.objects.order_by(order).all()
        else:
            reservations = Reservation.objects.all()
        serializer = ReservationSerializer(reservations, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = ReservationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ReservationObject(APIView):
    def get_object(self, pk):
        try:
            return Reservation.objects.get(pk=pk)
        except Reservation.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        reservation = self.get_object(pk)
        serializer = ReservationSerializer(reservation)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        reservation = self.get_object(pk)
        serializer = ReservationSerializer(reservation, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        reservation = self.get_object(pk)
        reservation.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
