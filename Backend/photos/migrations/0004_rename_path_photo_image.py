# Generated by Django 5.1.6 on 2025-02-11 22:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('photos', '0003_alter_photo_path'),
    ]

    operations = [
        migrations.RenameField(
            model_name='photo',
            old_name='path',
            new_name='image',
        ),
    ]
