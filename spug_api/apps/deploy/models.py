from django.db import models
from libs import ModelMixin, human_datetime
from apps.account.models import User
from apps.app.models import App


class DeployRequest(models.Model, ModelMixin):
    STATUS = (
        ('-3', '发布异常'),
        ('-1', '已驳回'),
        ('0', '待审核'),
        ('1', '待发布'),
        ('2', '发布中'),
        ('3', '发布成功'),
    )
    app = models.ForeignKey(App, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    extra = models.TextField()
    host_ids = models.TextField()
    desc = models.CharField(max_length=255, null=True)
    status = models.CharField(max_length=2, choices=STATUS)
    reason = models.CharField(max_length=255, null=True)
    version = models.CharField(max_length=50, null=True)

    created_at = models.CharField(max_length=20, default=human_datetime)
    created_by = models.ForeignKey(User, models.PROTECT, related_name='+')
    approve_at = models.CharField(max_length=20, null=True)
    approve_by = models.ForeignKey(User, models.PROTECT, related_name='+', null=True)

    def __repr__(self):
        return f'<DeployRequest app_id={self.app_id} name={self.name}>'

    class Meta:
        db_table = 'deploy_requests'
        ordering = ('-id',)
