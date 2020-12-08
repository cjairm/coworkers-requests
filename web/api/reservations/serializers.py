from reservations.models import Reservation
from rest_framework import serializers

class ReservationSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    firstName = serializers.CharField(max_length=200, required=True)
    lastName = serializers.CharField(max_length=200, required=True)
    startTime = serializers.DateTimeField(required=True)
    endTime = serializers.DateTimeField(required=True)
    seats = serializers.IntegerField(min_value=1, max_value=2)
    accept = serializers.BooleanField(required=False)
    deny = serializers.BooleanField(required=False)
    createdAt = serializers.DateTimeField(required=False)

    def create(self, validated_data):
        return Reservation.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.accept = validated_data.get('accept', instance.accept)
        instance.deny = validated_data.get('deny', instance.deny)

        instance.save()
        return instance
