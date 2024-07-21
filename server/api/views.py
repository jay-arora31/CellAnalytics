from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from .models import Cell, CellData
from .serializers import CellSerializer

class CellSoHView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        cells = Cell.objects.all()
        serializer = CellSerializer(cells, many=True)
        return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def cell_data_detail(request, cell_id):
    # Fetch the cell object based on cell_id
    cell = get_object_or_404(Cell, pk=cell_id)
    
    # Fetch related cell data
    cell_data = CellData.objects.filter(cell=cell)
    
    # Prepare the data to be returned in the JSON response
    data = {
        'discharge_capacity': cell.discharge_capacity,
        'nominal_capacity': cell.nominal_capacity,
        'data': list(cell_data.values('current_data', 'voltage_data', 'capacity_data', 'temperature_data', 'time_data'))
    }
    
    # Return a JsonResponse with the data
    return JsonResponse(data)

class UniqueCellIdsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        cell_ids = Cell.objects.values_list('cell_id', flat=True).distinct()
        return Response(cell_ids)