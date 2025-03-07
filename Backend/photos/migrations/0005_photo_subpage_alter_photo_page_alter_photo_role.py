# Generated by Django 5.1.6 on 2025-02-11 22:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('photos', '0004_rename_path_photo_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='photo',
            name='subPage',
            field=models.CharField(blank=True, choices=[('portrait', 'portrait'), ('artisan', 'artisan'), ('boudoir', 'boudoir'), ('collaborationArtistique', 'collaborationArtistique'), ('fantastique', 'fantastique'), ('lumiereNaturelle', 'lumiereNaturelle'), ('nu', 'nu'), ('studio', 'studio')], max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='photo',
            name='page',
            field=models.CharField(choices=[('home', 'home'), ('contact', 'contact'), ('apropos', 'apropos'), ('prestation', 'prestation'), ('portefolio', 'portefolio')], max_length=50),
        ),
        migrations.AlterField(
            model_name='photo',
            name='role',
            field=models.CharField(choices=[('banner', 'banner'), ('presentation', 'presentation')], max_length=50),
        ),
    ]
