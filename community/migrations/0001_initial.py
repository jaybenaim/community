# Generated by Django 2.2.4 on 2019-09-08 05:58

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name_of_item', models.CharField(max_length=255)),
                ('price', models.CharField(max_length=255)),
                ('date_lent', models.DateTimeField(auto_now_add=True)),
                ('date_borrowed', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=255)),
                ('profile_name', models.CharField(max_length=255)),
                ('email', models.EmailField(max_length=255)),
                ('address', models.CharField(max_length=255)),
                ('initial_item', models.CharField(max_length=255)),
                ('shed_items', models.ManyToManyField(to='community.Item')),
            ],
        ),
    ]
