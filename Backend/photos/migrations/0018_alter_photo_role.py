# Generated by Django 5.1.6 on 2025-02-15 21:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('photos', '0017_alter_photo_role'),
    ]

    operations = [
        migrations.AlterField(
            model_name='photo',
            name='role',
            field=models.CharField(blank=True, choices=[('banner', 'banner'), ('representant', 'representant'), ('galery', 'galery')], max_length=50, null=True),
        ),
    ]
