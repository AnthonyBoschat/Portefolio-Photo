# Generated by Django 5.1.6 on 2025-02-11 22:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('photos', '0005_photo_subpage_alter_photo_page_alter_photo_role'),
    ]

    operations = [
        migrations.RenameField(
            model_name='photo',
            old_name='type',
            new_name='orientation',
        ),
    ]
