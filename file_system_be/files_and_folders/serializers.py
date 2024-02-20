from rest_framework import serializers
from files_and_folders.models import Folder, File
from rest_framework.validators import UniqueValidator


class FolderSerializer(serializers.ModelSerializer):
    byteSize = serializers.SerializerMethodField("getByteSize")
    isFolder = serializers.BooleanField(default=True, read_only=True)

    def getByteSize(self, model):
        return model.byte_size

    class Meta:
        model = Folder
        fields = [
            "id",
            "name",
            "parentFolderId",
            "createdAt",
            "updatedAt",
            "byteSize",
            "isFolder",
        ]

    def validate(self, data):
        parent_folder_id = data.get("parentFolderId")
        name = data.get("name")

        if Folder.objects.filter(parentFolderId=parent_folder_id, name=name).exists():
            raise ValueError("Folder with this name already exists in the directory")

        return data


class FileSerializer(serializers.ModelSerializer):
    byteSize = serializers.SerializerMethodField("getByteSize")
    isFolder = serializers.BooleanField(default=False, read_only=True)

    def getByteSize(self, model):
        return model.byte_size

    class Meta:
        model = File
        fields = [
            "id",
            "name",
            "content",
            "parentFolderId",
            "createdAt",
            "updatedAt",
            "byteSize",
            "isFolder",
        ]

    def validate(self, data):
        parent_folder_id = data.get("parentFolderId")
        name = data.get("name")

        if File.objects.filter(parentFolderId=parent_folder_id, name=name).exists():
            instance = self.instance
            if instance and instance.name == name:
                return data
            raise serializers.ValidationError(
                "File with this name already exists in the directory"
            )

        return data
