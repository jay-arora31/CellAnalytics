# serializers.py
from rest_framework import serializers
from .models import Cell, CellData


class CellSerializer(serializers.ModelSerializer):
    soh = serializers.SerializerMethodField()

    class Meta:
        model = Cell
        fields = ['cell_id', 'discharge_capacity', 'nominal_capacity', 'soh']

    def get_soh(self, obj):
        return (obj.discharge_capacity / obj.nominal_capacity) * 100

class CellDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = CellData
        fields = '__all__'
