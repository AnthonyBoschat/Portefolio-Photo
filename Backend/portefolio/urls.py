"""
URL configuration for portefolio project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from posixpath import basename
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from rest_framework import routers
from photos.email import sendEmailView
from photos.views import AdminPortefolioViewSet, ArtisansViewSet, PhotoViewSet, PortefoliosViewSet, PrestationsViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

router = routers.DefaultRouter()
router.register(r'photos', PhotoViewSet)
router.register(r'portefolios', PortefoliosViewSet, basename="portefolios")
router.register(r'prestations', PrestationsViewSet, basename="prestations")
router.register(r'artisans', ArtisansViewSet, basename="artisans")
# router.register(r"upload", UploadPhotoViewSet, basename="upload")

router.register(r"admin/portefolios", AdminPortefolioViewSet, basename="admin-portefolios")

# router.register()
# router.register(r"sendmail", sendEmailView.as_view(), basename="sendmail")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/sendmail/', sendEmailView.as_view(), name='send-email'),
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path('api/token/verify/',  TokenVerifyView.as_view(),      name='token_verify'),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
