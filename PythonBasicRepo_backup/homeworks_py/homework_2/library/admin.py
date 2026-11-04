from django.contrib import admin
from .models import Instructor, Category, Course, Student, Enrollment


@admin.register(Instructor)
class InstructorAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'specialization',
                    'rating', 'is_active')
    list_filter = ('is_active', 'specialization')
    search_fields = ('first_name', 'last_name', 'email')


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'parent')
    search_fields = ('name',)
    prepopulated_fields = {'slug': ('name',)}


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('title', 'instructor', 'category', 'level',
                    'price', 'is_published', 'places')
    list_filter = ('level', 'is_published', 'category')
    search_fields = ('title', 'description')


class EnrollmentInline(admin.TabularInline):
    model = Enrollment
    extra = 1


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'registered_at')
    search_fields = ('first_name', 'last_name', 'email')
    inlines = [EnrollmentInline]


@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    list_display = ('student', 'course', 'status', 'progress',
                    'grade', 'enrolled_at')
    list_filter = ('status', 'course')
    search_fields = ('student__first_name', 'student__last_name',
                     'course__title')