from django import forms

from front.models import Trip, User


class AppInitForm(forms.ModelForm):
    def __init__(self, *args, user: User, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['category'].queryset = user.category_set.all()

    category = forms.ModelChoiceField(queryset=None)

    class Meta:
        model = Trip
        fields = '__all__'
        exclude = ['user', 'ended_at', 'weather', 'feeling', 'started_at']
