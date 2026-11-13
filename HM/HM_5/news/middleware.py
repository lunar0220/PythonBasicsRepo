import logging
import time

from django.conf import settings
from django.core.exceptions import MiddlewareNotUsed

logger = logging.getLogger("request_logger")


def get_client_ip(request):
    forwarded = request.META.get("HTTP_X_FORWARDED_FOR")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.META.get("REMOTE_ADDR", "unknown")


class RequestLoggingMiddleware:
    def __init__(self, get_response):
        if not getattr(settings, "REQUEST_LOGGING_ENABLED", True):
            raise MiddlewareNotUsed
        self.get_response = get_response

    def __call__(self, request):
        start = time.perf_counter()
        response = self.get_response(request)
        duration_ms = (time.perf_counter() - start) * 1000
        logger.info(
            "ip=%s url=%s method=%s status=%s time=%.2fms",
            get_client_ip(request),
            request.build_absolute_uri(),
            request.method,
            response.status_code,
            duration_ms,
        )
        return response