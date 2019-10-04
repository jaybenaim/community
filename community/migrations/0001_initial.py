# Generated by Django 2.2.4 on 2019-10-04 16:56

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Messages',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField()),
                ('time', models.TimeField()),
                ('recieving_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='recieving_user', to=settings.AUTH_USER_MODEL)),
                ('sending_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sending_user', to=settings.AUTH_USER_MODEL)),
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
                ('messages', models.ManyToManyField(to='community.Messages', verbose_name='list of messages')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name_of_item', models.CharField(max_length=255)),
                ('price', models.CharField(max_length=255)),
                ('available', models.BooleanField(default=True)),
                ('profile_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='community.Profile')),
                ('user_who_borrowed', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
