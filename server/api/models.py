from django.db import models

# Create your models here.
class Cell(models.Model):
    cell_id = models.AutoField(primary_key=True)
    discharge_capacity = models.FloatField()
    nominal_capacity = models.FloatField()

    class Meta:
        db_table = 'cells'

class CellData(models.Model):
    id = models.AutoField(primary_key=True)
    cell = models.ForeignKey(Cell, on_delete=models.CASCADE, db_column='cell_id')
    current_data = models.FloatField()
    voltage_data = models.FloatField()
    capacity_data = models.FloatField()
    temperature_data = models.FloatField()
    time_data = models.DateTimeField()

    class Meta:
        db_table = 'cell_data'