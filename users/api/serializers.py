from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from ..models import CustomUser
from incomes.models import Invoice


class UserSerializer(serializers.ModelSerializer):
    invoices = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Invoice.objects.all())

    class Meta:
        model = CustomUser
        fields = ('email', 'username', 'invoices', 'id')


class UserSerializerWithToken(serializers.ModelSerializer):
    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ('username', 'password', 'token')

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER 
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER 

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class UserLoginSerializer(serializers.ModelSerializer):
    # token = serializers.CharField(allow_blank=True, read_only=True)
    username = serializers.CharField()
    

    class Meta:
        model = CustomUser
        fields = [
            'username',
            'password',
            
        ]
        extra_kwargs = {"password":
                        {"write_only": True}
                        }

    def validate(self, data):
        return data