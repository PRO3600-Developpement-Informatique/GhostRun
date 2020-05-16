import datetime

from crispy_forms.helper import FormHelper
from django import forms

from front.models import Trip, User
from crispy_forms_foundation.layout import Layout, Fieldset, ButtonHolder, Submit


class CategoryChoiceField(forms.ModelChoiceField):
    def label_from_instance(self, obj):
        return f"{obj.name}"


class AppInitForm(forms.ModelForm):
    def __init__(self, *args, user: User, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['category'].queryset = user.category_set.all()
        self.fields['transport_used'].label = "Votre mode de transport"

        self.helper = FormHelper()
        self.helper.form_action = '.'
        self.helper.layout = Layout(
            Fieldset("{{ user.username|title }}, ou voulez-vous aller ?",
                     'category',
                     'transport_used',
                     ),
            ButtonHolder(
                Submit('submit', "C'est parti!"),
            ),
        )

    category = CategoryChoiceField(queryset=None, empty_label=None,
                                   label="La catégorie de votre trajet",
                                   help_text="Choississez l'endroit ou vous allez. Attention, un trjet retour n'est pas dans la meme catégorie qu'un trajet aller.")

    class Meta:
        model = Trip
        fields = ['category', 'transport_used']
