# Generated by Django 2.1.5 on 2019-01-10 13:01

import backend.utils
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0004_post_unique_identifier'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='unique_identifier',
            field=models.CharField(default=backend.utils.id_generator, max_length=8, unique=True),
        ),
    ]
