# Generated by Django 5.1.6 on 2025-02-15 22:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('photos', '0028_alter_photo_role'),
    ]

    operations = [
        migrations.AlterField(
            model_name='photo',
            name='role',
            field=models.CharField(blank=True, choices=[('banner', 'banner'), ('galery', 'galery'), ('representant', 'representant')], max_length=50, null=True),
        ),
    ]
