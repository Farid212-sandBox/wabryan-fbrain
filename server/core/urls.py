from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProfessorViewSet, VoteViewSet

router = DefaultRouter()
router.register(r'professors', ProfessorViewSet)
router.register(r'votes', VoteViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
