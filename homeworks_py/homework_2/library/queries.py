from django.db.models import Count, Avg, Q
from .models import Instructor, Category, Course, Student, Enrollment



def get_published_courses():
    return Course.objects.filter(is_published=True)


def get_courses_by_level(level):
    return Course.objects.filter(level=level)


def get_instructor_courses(instructor_id):
    return Course.objects.filter(instructor_id=instructor_id)


def get_popular_courses(min_students):
    return Course.objects.annotate(
        students_count=Count(
            'enrollments__student',
            filter=~Q(enrollments__status='cancelled'),
            distinct=True
        )
    ).filter(students_count__gte=min_students)


def get_student_active_courses(student_id):
    return Course.objects.filter(
        enrollments__student_id=student_id,
        enrollments__status='in_progress'
    ).distinct()


def get_category_with_subcategories(category_id):
    return Category.objects.filter(
        Q(id=category_id) | Q(parent_id=category_id)
    )


def get_expensive_courses(min_price):
    return Course.objects.filter(price__gt=min_price)


def get_instructors_by_rating(min_rating):
    return Instructor.objects.filter(rating__gt=min_rating)


def get_courses_with_available_spots():
    return Course.objects.filter(
        Q(places__isnull=True) |
        Q(places__gt=Count('enrollments'))
    )
    

def update_enrollment_progress(enrollment_id, progress):
    enrollment = Enrollment.objects.get(id=enrollment_id)

    if progress < 0 or progress > 100:
        raise ValueError('Прогресс должен быть от 0 до 100')

    enrollment.progress = progress
    enrollment.save(update_fields=['progress'])
    return enrollment


def complete_enrollment(enrollment_id, grade):
    if grade < 0 or grade > 100:
        raise ValueError('Оценка должна быть от 0 до 100')

    enrollment = Enrollment.objects.get(id=enrollment_id)
    enrollment.status = 'completed'
    enrollment.progress = 100
    enrollment.grade = grade
    enrollment.save()
    return enrollment


def get_student_statistics(student_id):
    enrollments = Enrollment.objects.filter(student_id=student_id)

    return {
        'courses_count': enrollments.count(),
        'completed_count': enrollments.filter(
            status='completed'
        ).count(),
        'average_grade': enrollments.filter(
            grade__isnull=False
        ).aggregate(average=Avg('grade'))['average']
    }


def get_instructor_statistics(instructor_id):
    courses = Course.objects.filter(instructor_id=instructor_id)

    enrollments = Enrollment.objects.filter(
        course__instructor_id=instructor_id
    ).exclude(status='cancelled')

    return {
        'courses_count': courses.count(),
        'students_count': enrollments.values(
            'student_id'
        ).distinct().count(),
        'average_rating': courses.aggregate(
            average=Avg('instructor__rating')
        )['average']
    }