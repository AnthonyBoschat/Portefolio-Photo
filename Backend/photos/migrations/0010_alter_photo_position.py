# Generated by Django 5.1.6 on 2025-02-12 14:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('photos', '0009_remove_photo_context_remove_photo_page_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='photo',
            name='position',
            field=models.IntegerField(),
        ),
    ]
