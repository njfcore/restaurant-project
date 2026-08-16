from order.models import Order


def has_completed_order(user, food):
    return Order.objects.filter(
        user=user,
        status=Order.STATUS_COMPLETED,
        items__food=food,
    ).exists()