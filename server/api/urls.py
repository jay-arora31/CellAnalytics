# urls.py
from django.urls import path
from .views import CellSoHView, UniqueCellIdsView,cell_data_detail

urlpatterns = [
    path('soh/', CellSoHView.as_view(), name='soh'),
    path('unique-cell-ids/', UniqueCellIdsView.as_view(), name='unique-cell-ids'),
    path('cell-data/<int:cell_id>/', cell_data_detail, name='cell-detail'),

]
