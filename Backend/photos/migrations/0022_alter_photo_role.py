# Generated by Django 5.1.6 on 2025-02-15 21:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('photos', '0021_alter_photo_role'),
    ]

    operations = [
        migrations.AlterField(
            model_name='photo',
            name='role',
            field=models.CharField(blank=True, choices=[('representant', 'representant'), ('galery', 'galery'), ('banner', 'banner')], max_length=50, null=True),
        ),
    ]
